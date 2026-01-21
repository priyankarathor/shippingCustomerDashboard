import "./globals.css";
import Sidebar from "./c";
import TopBar from "./components/TopBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex-1">
            <TopBar />
            <main className="p-6">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
