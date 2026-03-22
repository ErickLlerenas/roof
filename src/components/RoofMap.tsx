"use client";

import { useEffect, useRef, useState } from "react";
import Map, { MapRef, NavigationControl } from "react-map-gl/mapbox";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import * as turf from "@turf/turf";

interface RoofMapProps {
  onAreaCalculated: (areaSqFt: number) => void;
}

export function RoofMap({ onAreaCalculated }: RoofMapProps) {
  const mapRef = useRef<MapRef>(null);
  const drawRef = useRef<MapboxDraw | null>(null);
  const [userLocationLoaded, setUserLocationLoaded] = useState(false);

  useEffect(() => {
    if ("geolocation" in navigator && !userLocationLoaded) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (mapRef.current) {
            mapRef.current.flyTo({
              center: [position.coords.longitude, position.coords.latitude],
              zoom: 18, // Close enough to see roofs
              duration: 2000
            });
            setUserLocationLoaded(true);
          }
        },
        (error) => {
          console.warn("Geolocation error:", error);
          // Fallback to initial location, nothing to do
        }
      );
    }
  }, [userLocationLoaded]);

  const onMapLoad = () => {
    if (!mapRef.current) return;
    const map = mapRef.current.getMap();
    
    if (!drawRef.current) {
      drawRef.current = new MapboxDraw({
        displayControlsDefault: false,
        controls: {
          polygon: true,
          trash: true
        },
        defaultMode: "draw_polygon"
      });
      map.addControl(drawRef.current as any, "top-left");

      map.on("draw.create", updateArea);
      map.on("draw.delete", updateArea);
      map.on("draw.update", updateArea);
    }
  };

  const updateArea = () => {
    if (!drawRef.current) return;
    const data = drawRef.current.getAll();
    if (data.features.length > 0) {
      const area = turf.area(data as turf.AllGeoJSON);
      // turf.area returns square meters. Convert to square feet.
      // 1 sq meter = 10.7639 sq ft
      const areaSqFt = area * 10.7639;
      onAreaCalculated(areaSqFt);
    } else {
      onAreaCalculated(0);
    }
  };

  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  if (!mapboxToken || mapboxToken === "pk.your_mapbox_token_here") {
    return (
      <div className="flex h-[500px] items-center justify-center bg-muted text-muted-foreground p-8 text-center rounded-lg border border-dashed">
        <p>
          Configure your Mapbox token in the <code>.env</code> file to see the map.<br/>
          <em>(NEXT_PUBLIC_MAPBOX_TOKEN=pk...)</em>
        </p>
      </div>
    );
  }

  return (
    <div className="h-[500px] w-full rounded-lg overflow-hidden border">
      <Map
        ref={mapRef}
        initialViewState={{
          longitude: -95.7129,
          latitude: 37.0902,
          zoom: 4
        }}
        mapStyle="mapbox://styles/mapbox/satellite-v9"
        mapboxAccessToken={mapboxToken}
        onLoad={onMapLoad}
      >
        <NavigationControl position="top-right" />
      </Map>
    </div>
  );
}
