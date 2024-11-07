import { withWindowMaker } from "@/lib/utils"
import { MutableRefObject, useRef, useState } from "react"

export const Menu = () => {

  const windowRef = useRef<Window | null>(null)

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const withWindow = withWindowMaker(windowRef)

  const navigableElementsRefs = {
    top: useRef(null),
    experience: useRef(null),
    skills: useRef(null),
    futur: useRef(null),
    contact: useRef(null),
  }


  const scrollTo = (el: MutableRefObject<null | HTMLElement>) => {
    const signalClass = 'current-section'
    
    return (e : { stopPropagation : Function}) => {
      if(el.current !== null){
        e.stopPropagation()
        withWindow((w) => {
          if(el.current !== null)
            w.scrollTo({
              top: Math.round(el.current.getBoundingClientRect().top + document.documentElement.scrollTop),
              behavior: 'smooth',
            })
        })
        
        const children = el.current.children
        for (const key in children) {
          if (children[key].tagName === 'H2') {
            currentlySelected.current?.classList.remove(signalClass)
            children[key].classList.add(signalClass)
            currentlySelected.current = children[key] as HTMLElement
            setIsMenuOpen(false)
            break
          }
        }
      }
    }
  }

  const MenuButton = () => (
    <button onClick={toggleMenu} className="print:hidden md:hidden">
      {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
    </button>
  )

  const MenuInline = () => {
    return (
      <nav className="relative hidden md:flex print:hidden">
        <a className="cursor-pointer p-3 hover:bg-gradient-to-b hover:from-stone-50/50 hover:to-stone-500/20">Experience</a>
        <a className="cursor-pointer p-3 hover:bg-gradient-to-b hover:from-stone-50/50 hover:to-stone-500/20">Skills</a>
        <a className="cursor-pointer p-3 hover:bg-gradient-to-b hover:from-stone-50/50 hover:to-stone-500/20">What I&apos;d like to try</a>
        <a className="cursor-pointer p-3 hover:bg-gradient-to-b hover:from-stone-50/50 hover:to-stone-500/20">Get in Touch</a>
      </nav>
    )
  }

  const MenuDrawer = () => {

    return (isMenuOpen && (
      <nav className="relative md:hidmden backdrop-blur-md place-content-center text-center border-b-2 border-t-2 border-stone-50 -z-50 bg-gradient-to-b from-stone-200/60 to-stone-100/60  cursor-pointer">
        <a onClick={scrollTo(navigableElementsRefs.experience)} className="block px-4 py-5 hover:bg-stone-100">Experience</a>
        <a onClick={scrollTo(navigableElementsRefs.skills)} className="block px-4 py-5 hover:bg-stone-100">Skills</a>
        {/* <a href="#projects" className="block px-4 py-5 hover:bg-stone-100">Projects</a> */}
        <a onClick={scrollTo(navigableElementsRefs.futur)} className="block px-4 py-5 hover:bg-stone-100">What I&apos;d like to try</a>
        <a onClick={scrollTo(navigableElementsRefs.contact)} className="block px-4 py-5 hover:bg-stone-100">Get in Touch</a>
      </nav>
    ))
  }

  return [ MenuButton, MenuInline, MenuDrawer ]
} 