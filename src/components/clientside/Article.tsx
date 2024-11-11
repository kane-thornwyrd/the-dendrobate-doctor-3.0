'use client'

import { useArticlesData } from "@/lib/ArticlesContext"
import dynamic from 'next/dynamic'
import { techDateToHuman, techDateToString } from "@/lib/utils"
import { FC } from "react"
import { Loading } from '../serverside/Loading';

export const Article : FC = () => {
  const { currentArticle } = useArticlesData()

  const ArticleBody = dynamic(() => import(`../../articles/output/${techDateToString( currentArticle)}`), {
    loading: () => (<>
      <Loading />
      <div className="hidden text-right"></div>
    </>),
  })

  return (<div className="article-body">
    <h2 className="text-right">{techDateToHuman(currentArticle)}</h2>
    <ArticleBody />
  </div>)
}