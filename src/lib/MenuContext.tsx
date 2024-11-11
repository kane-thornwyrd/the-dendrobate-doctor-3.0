'use client'

import {createContext, Dispatch, FC, PropsWithChildren, SetStateAction, useContext, useState} from "react"
import { MenuToggle } from "@/components/clientside/MenuToggle"

type MenuContextType = {
  isMenuOpen: boolean,
  toggleMenuOpen: () => void
}

const MenuContext = createContext({
  isMenuOpen: false,
  toggleMenuOpen: () => undefined
} as MenuContextType)

export const MenuProvider: FC<PropsWithChildren> = ({children}) => {
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false)
  const newMenuContext: MenuContextType = {isMenuOpen, toggleMenuOpen: () =>  setMenuOpen(!isMenuOpen) }
  return (
    <MenuContext.Provider value={newMenuContext}>
        {children}
    </MenuContext.Provider>
  )
}

export const MenuButton: FC<Record<string, never>> = () => {
  const {isMenuOpen, toggleMenuOpen} = useContext(MenuContext)
  return (<MenuToggle toggleOpen={() => toggleMenuOpen()} />)
}


export const useMenuState = () => useContext(MenuContext)