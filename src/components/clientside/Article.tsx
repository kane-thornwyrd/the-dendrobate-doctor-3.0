'use client'

import { useArticlesData } from "@/lib/ArticlesContext"
import { techDateToHuman } from "@/lib/utils"
import { FC } from "react"

export const Article : FC = () => {
  const { currentArticle } = useArticlesData()


  return (<>
    <h2>{techDateToHuman(currentArticle)}</h2>
  </>)
}