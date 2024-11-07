'use client'

import { FC, useEffect, useState, PropsWithChildren, useRef, useLayoutEffect, MutableRefObject, useCallback, useSyncExternalStore, LinkHTMLAttributes, HTMLProps } from 'react'
import { Menu, X, Mail, ArrowBigUpDash, Facebook } from 'lucide-react'
import { KissKissBankBankLogo } from '@/components/KissKissBankBankLogo'



export default function Portfolio() {

  const isBiggerthanSmartphone = useMediaQuery('@media (min-width: 640px)')

  const sectionTitleClassNames = 'text-3xl font-bold mb-8 text-center border-spacing-2 border-l-[2.25rem] border-l-lime-500 text-lime-500 max-w-fit pl-3 print:text-black print:border-l-stone-700 print:text-xl print:border-l print:mb-3'

  const sectionClassNames = 'container mx-auto md:px-4 py-20 print:p-0 print:mt-10'

  return (
    <div className={`relative bg-stone-900 md:bg-transparent min-h-screen font-sans print:bg-white`}>

      {/* Main Content */}
      <main className="pt-20 max-w-6xl mx-auto backdrop-blur-sm bg-gradient-to-br from-stone-200/40 to-stone-200/70 md:bg-gradient-to-b md:from-stone-100/50 md:to-stone-100/50 print:pt-0">

        {/* Contact Section */}
        <section id="contact" className={`${sectionClassNames} print:mb-40`}>
          <h2 className={`${sectionTitleClassNames}`}>Get in Touch</h2>
          <div className="flex justify-center space-x-6 text-stone-200 print:text-black print:grid print:grid-cols-3">
            <PrintableLink href="https://github.com/kane-thornwyrd" target="_blank" rel="noopener noreferrer" 
            hrefReadable='kane-thornwyrd' className="hover:text-lime-400 px-4">
              <Facebook size={24} className='drop-shadow-intense' />
            </PrintableLink>
            <PrintableLink href="https://github.com/kane-thornwyrd" target="_blank" rel="noopener noreferrer" 
            hrefReadable='kane-thornwyrd' className="hover:text-lime-400 px-4">
              
            </PrintableLink>
            
            <PrintableLink href="mailto:jean.cedric.t+cv-link@gmail.com?subject=Prise%20de%20contact%20depuis%20le%20CV" 
            hrefReadable='jean.cedric.t+via-cv@gmail.com' className="hover:text-lime-400 px-4">
              <Mail size={24} className='drop-shadow-intense' />
            </PrintableLink>
          </div>
        </section>

        
        <div className="back-to-top-wrapper absolute right-4 bottom-6 w-16 pointer-events-none print:hidden">
          <a aria-label="Scroll to Top" className="back-to-top-link backdrop-blur-md" onClick={(e) => {
            e.stopPropagation();
            const el = document.getElementById('top')
            if(el && window) {
              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              })
            }
          }}><ArrowBigUpDash style={{'filter' : 'drop-shadow(0 0.1rem 2px rgb(0 0 0 / 0.7))'}}/></a>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-stone-400 max-w-6xl mx-auto py-4 text-center print:hidden" >
        <p>&copy; 2024 Jean-cédric T. All rights reserved. <KissKissBankBankLogo /> </p>
      </footer>
      
    </div>
  )
}

const Header = ({
  navigableElementsRefs
} : {navigableElementsRefs : Record<string, MutableRefObject<null | HTMLElement>>}) => {
  const [scrollY, setScrollY] = useState<number>(0)
  const currentlySelected = useRef<HTMLElement | null>(null)

  const windowRef = useRef<Window | null>(null)

  useEffect(() => {
    if(typeof window !== 'undefined' && windowRef.current === null) {
      windowRef.current = window
    }
  }, [] )

  const withWindow = withWindowMaker(windowRef)

  useLayoutEffect(() => {
    const handleScroll = () => {
      withWindow((w) => {
        if(Math.abs(scrollY - w.scrollY) > 50)
          setScrollY(w.scrollY)
      })
    }

    handleScroll();
    withWindow((w) => {
      w.addEventListener("scroll", handleScroll)
    })

    return () => {
      withWindow((w) => {
        w.removeEventListener("scroll", handleScroll)
      })
    };
  }, []);

  return (
    <header id="top" className="fixed w-full z-10 bg-transparent print:container print:mx-auto print:shadow-none print:relative print:mb-6">
      <div className="container backdrop-blur-sm max-w-6xl mx-auto px-6 md:px-40 flex justify-between items-center print:p-0 print:justify-normal bg-gradient-to-b from-stone-50/10 to-stone-400/10 shadow-xl shadow-black/30 print:bg-none print:shadow-none">
        <h1 className="text-2xl font-bold print:me-4">Jean-Cédric T.</h1>
        <p className='hidden print:inline'>Senior software engineer</p>
        <nav className="relative hidden md:flex print:hidden">
          <a onClick={navigateTo(navigableElementsRefs.experience)} className="cursor-pointer p-3 hover:bg-gradient-to-b hover:from-stone-50/50 hover:to-stone-500/20">Experience</a>
          <a onClick={navigateTo(navigableElementsRefs.skills)} className="cursor-pointer p-3 hover:bg-gradient-to-b hover:from-stone-50/50 hover:to-stone-500/20">Skills</a>
          <a onClick={navigateTo(navigableElementsRefs.futur)} className="cursor-pointer p-3 hover:bg-gradient-to-b hover:from-stone-50/50 hover:to-stone-500/20">What I&apos;d like to try</a>
          <a onClick={navigateTo(navigableElementsRefs.contact)} className="cursor-pointer p-3 hover:bg-gradient-to-b hover:from-stone-50/50 hover:to-stone-500/20">Get in Touch</a>
        </nav>
        <button onClick={toggleMenu} className="print:hidden md:hidden">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {isMenuOpen && (
        <nav className="relative md:hidmden backdrop-blur-md place-content-center text-center border-b-2 border-t-2 border-stone-50 -z-50 bg-gradient-to-b from-stone-200/60 to-stone-100/60  cursor-pointer">
          <a onClick={navigateTo(navigableElementsRefs.experience)} className="block px-4 py-5 hover:bg-stone-100">Experience</a>
          <a onClick={navigateTo(navigableElementsRefs.skills)} className="block px-4 py-5 hover:bg-stone-100">Skills</a>
          {/* <a href="#projects" className="block px-4 py-5 hover:bg-stone-100">Projects</a> */}
          <a onClick={navigateTo(navigableElementsRefs.futur)} className="block px-4 py-5 hover:bg-stone-100">What I&apos;d like to try</a>
          <a onClick={navigateTo(navigableElementsRefs.contact)} className="block px-4 py-5 hover:bg-stone-100">Get in Touch</a>
        </nav>
      )}
    </header>)
}



const randInt = (max : number = 1, seed: number) =>{ 
  const output = Math.trunc(seed.toString().split('').map(v=>v as unknown as number).reduce((p,c)=> p+c) % 17 / 16 * max)
  return output
}

