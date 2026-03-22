"use client";

import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { EstimatePDFProps, EstimatePDF } from "./EstimatePDF";
import { useEffect, useState } from "react";

// PDFDownloadLink doesn't work well with SSR, so we dynamically import it
const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  {
    ssr: false,
    loading: () => <Button className="w-full mt-4" size="lg" disabled>Cargando PDF...</Button>,
  }
);

interface PDFDownloadButtonProps {
  data: EstimatePDFProps;
  disabled?: boolean;
}

export function PDFDownloadButton({ data, disabled }: PDFDownloadButtonProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return <Button className="w-full mt-4" size="lg" disabled>Generando...</Button>;

  if (disabled) {
    return (
      <Button className="w-full mt-4" size="lg" disabled>
        Measure a roof first
      </Button>
    );
  }

  return (
    <div className="w-full mt-4">
      <PDFDownloadLink
        document={<EstimatePDF {...data} />}
        fileName="roof_estimate.pdf"
        className="block w-full"
      >
        {({ loading }: any) => (
          <Button className="w-full" size="lg" disabled={loading}>
            {loading ? 'Preparing document...' : 'Download PDF Report'}
          </Button>
        )}
      </PDFDownloadLink>
    </div>
  );
}
