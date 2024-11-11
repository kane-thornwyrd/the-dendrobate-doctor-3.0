
import Image from 'next/image'
import { Fonts } from '../../app/layout'

import DendrobateLogo from '../../../public/images/dendrobate.svg'
import { MenuButton } from '@/lib/MenuContext'
import { MenuMobile } from '../clientside/MenuMobile'
import { Menu } from '../clientside/Menu'

export const Header = () => {
  return (
    <header id="top" className="relative md:fixed w-full z-10 bg-transparent print:container print:mx-auto print:shadow-none print:relative print:mb-6">
      <div className="container backdrop-blur-sm max-w-6xl mx-auto px-6 flex justify-between items-center print:p-0 print:justify-normal bg-gradient-to-b from-stone-50/70 to-stone-100/20 shadow-xl shadow-black/40 print:bg-none print:shadow-none">
        <h1 className={`relative overflow-hidden px-24 pr-24 -left-6 leading-relaxed font-extralight text-stone-50 text-6xl print:me-4 pt-3 ${Fonts.title.className}`} style={{textShadow : `0 0 7px #dc2626,
    0 0 10px #450a0a,
    0 0 21px #450a0a,
    0 0 42px #450a0a,
    0 0 82px #450a0a,
    0 0 92px #450a0a,
    0 0 102px #450a0a,
    0 0 151px #450a0a`}}>The Dendrobate Doctor<Image alt='logo' src={DendrobateLogo} className='absolute -bottom-8 -left-12 max-w-32 -z-10' style={{filter: 'drop-shadow(1rem 2rem 0.25rem rgb(0 0 0 / 0.4))'}}/></h1>
      
      <Menu />
      <MenuButton />
      </div>
      <MenuMobile />
    </header>)
}