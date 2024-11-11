'use client'

import { useArticlesData } from "@/lib/ArticlesContext";
import { useMenuState } from "@/lib/MenuContext";
import { techDateToHuman, TechDateType } from "@/lib/utils";
import { FC } from "react";

export const MenuMobile: FC = () => {
  const articlesData = useArticlesData()
  const { setCurrentArticle } = useArticlesData()
  const { isMenuOpen, toggleMenuOpen }= useMenuState()
  
  return (<>{isMenuOpen && (
  <nav className="relative md:hidden backdrop-blur-md place-content-center text-center border-b-2 border-t-2 border-stone-50 -z-50 cursor-pointer max-h-96 overflow-y-auto">
    <ul className="bg-[repeating-linear-gradient(45deg,var(--tw-gradient-stops))] from-stone-600/50 from-[length:0_20px] to-stone-700/50 to-[length:20px_40px] py-2">
      {articlesData.list.map((entry: TechDateType, id: number) => (
        <li
          key={id}
          className="p-10 bg-stone-300 hover:bg-gray-100 cursor-pointer mx-20 my-10 shadow-black shadow-lg"
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