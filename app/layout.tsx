import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'Academic Bibliometric Dashboard',
  description: 'Console premium de inteligência bibliográfica, bibliométrica e fichamento automático.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
        
        {/* Plotly.js CDN */}
        <script src="https://cdn.plot.ly/plotly-2.32.0.min.js" defer crossOrigin="anonymous"></script>
        
        {/* D3.js and Word Cloud CDN */}
        <script src="https://d3js.org/d3.v7.min.js" defer crossOrigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/d3-cloud/1.2.5/d3.layout.cloud.min.js" defer crossOrigin="anonymous"></script>
        
        {/* jQuery & DataTables CDN */}
        <script src="https://code.jquery.com/jquery-3.7.0.min.js" defer crossOrigin="anonymous"></script>
        <script src="https://cdn.datatables.net/1.13.7/js/jquery.dataTables.min.js" defer crossOrigin="anonymous"></script>
        <link rel="stylesheet" href="https://cdn.datatables.net/1.13.7/css/jquery.dataTables.min.css" />
        
        {/* Lucide Icons */}
        <script src="https://unpkg.com/lucide@latest" defer crossOrigin="anonymous"></script>
        
        {/* SheetJS for Excel Exports */}
        <script src="https://cdn.sheetjs.com/xlsx-latest/package/dist/xlsx.full.min.js" defer crossOrigin="anonymous"></script>
        
        {/* html-to-docx for Word Exports */}
        <script src="https://unpkg.com/html-to-docx@1.8.0/dist/html-to-docx.umd.js" defer crossOrigin="anonymous"></script>
        
        {/* html2pdf for elegant client-side PDF generation */}
        <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js" defer crossOrigin="anonymous"></script>
      </head>
      <body suppressHydrationWarning className="antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
