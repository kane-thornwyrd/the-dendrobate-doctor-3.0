'use client'

import { ArrowBigUpDash } from "lucide-react";


export const ArrowScrollUp = () => (
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
</div>)