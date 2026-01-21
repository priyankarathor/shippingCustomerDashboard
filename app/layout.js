import "./globals.css";
import Sidebar from "./components/Sidebar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-100">
        <div className="flex">
          <Sidebar />
          <main className="ml-64 w-full p-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
