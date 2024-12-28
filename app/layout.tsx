// app/layout.tsx

import "primereact/resources/themes/lara-light-cyan/theme.css";
import "../styles/globalis.css";
import "/node_modules/primeflex/primeflex.css";
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body className="flex h-screen flex-column m-0 bg-gray-200">
        <header className="flex w-full bg-cyan-700 justify-content-center ">
          <h1 className="uppercase text-white">WFast-docs</h1>
        </header>
        <main className="flex h-full overflow-auto">{children}</main>
        <footer className="flex relative justify-content-center bg-cyan-700 text-white bottom-0">
          <p>© 2024 WFastDocs</p>
        </footer>
      </body>
    </html>
  );
}