import "./globals.css";

export const metadata = {
  title: "Isometric MTO Generator",
  description: "AI-powered Material Take-Off from isometric drawings",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gray-100 min-h-screen" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}