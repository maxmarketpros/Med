declare module 'react-pdf' {
  import { ReactElement } from 'react';

  export interface DocumentProps {
    file: string | File | { url: string } | null;
    onLoadSuccess?: (pdf: { numPages: number }) => void;
    onLoadError?: (error: Error) => void;
    loading?: ReactElement | string;
    className?: string;
    children?: ReactElement | ReactElement[];
    options?: {
      cMapUrl?: string;
      cMapPacked?: boolean;
      standardFontDataUrl?: string;
    };
  }

  export interface PageProps {
    pageNumber: number;
    scale?: number;
    renderTextLayer?: boolean;
    renderAnnotationLayer?: boolean;
    className?: string;
    onLoadSuccess?: (page: any) => void;
    onLoadError?: (error: Error) => void;
  }

  export const Document: React.ComponentType<DocumentProps>;
  export const Page: React.ComponentType<PageProps>;
  export const pdfjs: {
    version: string;
    GlobalWorkerOptions: {
      workerSrc: string;
    };
  };
}

declare module 'react-pdf/dist/Page/AnnotationLayer.css';
declare module 'react-pdf/dist/Page/TextLayer.css'; 