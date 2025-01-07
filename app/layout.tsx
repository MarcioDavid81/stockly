import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "./_components/sidebar";
import { Inter } from 'next/font/google'
import { ThemeProvider } from "./_components/theme-provider";
 
const inter = Inter({
  subsets: ['latin'],
  display: 'auto',
})

export const metadata: Metadata = {
  title: {
    absolute: "",
    default: "Stockly",
    template: "Stockly - %s",
  },
  description: "O Finance AI é o seu assistente financeiro pessoal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex h-full">
            <Sidebar />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
