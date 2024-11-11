'use client'

import { useArticlesData } from "@/lib/ArticlesContext";
import { parseTechDateString, techDateToHuman, techDateToString } from "@/lib/utils";
import { FC } from "react";

export const Menu: FC = () => {
  const { list, currentArticle, setCurrentArticle } = useArticlesData()


  return (<div className="hidden md:block">
    <select className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500" value={techDateToString(currentArticle)} onChange={({ target: { value }}) => setCurrentArticle(parseTechDateString(value))}>
      {list.map((entry, id) => (
        <option key={id} value={techDateToString(entry)}>{techDateToHuman(entry)}</option>
      ))}
    </select>
  </div>)
}