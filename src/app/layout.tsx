import type { Metadata } from "next";
import localFont from "next/font/local";
import { Noto_Sans_Display as GFont, Josefin_Slab as MonoFont } from 'next/font/google'
import "./globals.css";
import { Header } from "@/components/serverside/Header";
import { NextFont, NextFontWithVariable } from "next/dist/compiled/@next/font";
import { Footer } from "@/components/serverside/Footer";
import { ArticlesProvider } from "@/lib/ArticlesContext";
import { MenuProvider } from "@/lib/MenuContext";
import { ArrowScrollUp } from "@/components/clientside/ArrowScrollUp";

const getShowFont : NextFontWithVariable = localFont({
  src: "./fonts/Get Show.woff",
  variable: "--font-get-show-sans",
  weight: "100 900",
});

const mainFont: NextFont = GFont({
  subsets: ['latin']
})

const monoFont = MonoFont({
  subsets: ['latin']
})


export const metadata: Metadata = {
  title: "The Dendrobate Doctor — L'Écho des labos",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <body
        className={`${mainFont.className} rainforest-background antialiased`}
      >
        <MenuProvider>
        <ArticlesProvider>
          <Header />
          <div className={`relative md:pt-28 md:bg-transparent print:bg-white ${Fonts.main.className}`}>
            <main className="max-w-6xl px-4 mx-auto backdrop-blur-sm bg-stone-200/90  print:pt-0">
              {children}

              <ArrowScrollUp />
            </main>
          </div>
          <Footer />
        </ArticlesProvider>
        </MenuProvider>
      </body>
    </html>
  );
}

const Fonts = {
  title: getShowFont,
  main: mainFont,
  mono: monoFont
}

export { Fonts }