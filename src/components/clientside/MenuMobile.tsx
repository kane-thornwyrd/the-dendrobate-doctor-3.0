'use client'

import { useArticlesData } from "@/lib/ArticlesContext";
import { useMenuState } from "@/lib/MenuContext";
import { techDateToHuman, techDateToValue, TechDateType } from "@/lib/utils";
import { FC, MouseEventHandler } from "react";

export const MenuMobile: FC = () => {
  const articlesData = useArticlesData()
  const { setCurrentArticle } = useArticlesData()
  const { isMenuOpen, toggleMenuOpen }= useMenuState()
  
  return (<>{isMenuOpen && (
  <nav className="relative md:hidden backdrop-blur-md place-content-center text-center border-b-2 border-t-2 border-stone-50 -z-50 bg-gradient-to-b from-stone-200/60 to-stone-100/60  cursor-pointer">
    <ul>
      {articlesData.list.map((entry: TechDateType, id: number) => (
        <li
          key={id}
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
          onClick={() => {
            setCurrentArticle(entry)
            toggleMenuOpen()
          }} // Fermer le menu après un clic
        >
          {techDateToHuman(entry)}
        </li>
      ))}
    </ul>
  </nav>
)}</>)}