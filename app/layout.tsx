import type { Metadata } from "next";
import "./globals.css";
import { Nunito } from 'next/font/google'
import { ThemeProvider } from "./_components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { neobrutalism } from "@clerk/themes";
import { Toaster } from "./_components/ui/sonner";
 
const nunito = Nunito({
  weight: ["400", "700"],
  style: "normal",
  display: "swap",
  subsets: ["latin-ext"],
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
      <body className={`${nunito.className} antialiased`}>
        <ClerkProvider
        appearance={{
          baseTheme: neobrutalism,
        }}
        >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex h-full">

            {children}
          </div>
        </ThemeProvider>
        </ClerkProvider>
        <Toaster />
      </body>
    </html>
  );
}
