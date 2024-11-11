import { Ellipsis } from "lucide-react";
import { MouseEventHandler } from "react";

export const MenuToggle = ({ toggleMenuOpen }:{ toggleMenuOpen : MouseEventHandler<HTMLButtonElement> }) => {
  
  return (
    <button
    onClick={ toggleMenuOpen}
    className="md:hidden p-2 rounded focus:outline-none hover:ring-4 ring-green-500 bg-stone-200/70"
  >
    <Ellipsis className="w-6 h-6  drop-shadow-intense" />
    </button>
  )
}