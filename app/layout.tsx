// app/layout.tsx

import "primereact/resources/themes/lara-light-cyan/theme.css";
import "/node_modules/primeflex/primeflex.css";
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body>
        <header>
          <h1>Aplicação de Geração de Documentos de Projeto</h1>
        </header>
        <main>{children}</main>
        <footer>
          <p>© 2024 FastDocs by Samus Weee</p>
        </footer>
      </body>
    </html>
  );
}