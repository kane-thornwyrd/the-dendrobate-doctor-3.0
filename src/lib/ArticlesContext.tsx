'use client'

import { createContext, Dispatch, FC, PropsWithChildren, SetStateAction, useContext, useState } from "react"
import { ArticleListing, useArticles } from "./client.utils"
import { compareTechDate, EMPTY_TECHDATE, TechDateType } from "./utils"


export type ArticlesDataContextType = ArticleListing & {
  currentArticle: TechDateType
  setCurrentArticle: Dispatch<SetStateAction<TechDateType>>
}

export const emptyArticlesContext = {
  first: EMPTY_TECHDATE(),
  last: EMPTY_TECHDATE(),
  list: [],
  currentArticle: EMPTY_TECHDATE(),
  setCurrentArticle: ((d: TechDateType) => { console.warn(`"setCurrentArticle" not set and called with "${JSON.stringify(d)}"`)}) as Dispatch<SetStateAction<TechDateType>>
}

const ArticleContext = createContext<ArticlesDataContextType>(emptyArticlesContext)

export const ArticlesProvider: FC<PropsWithChildren> = ({children}) => {
  const [currentArticle, setCurrentArticle] = useState<TechDateType>(EMPTY_TECHDATE());

  const [ data, state ] = useArticles()
  if(state !== 'done') return (children)

  const initArticlesContext: ArticlesDataContextType = {
    ...emptyArticlesContext,
    ...data,
    ...{
      currentArticle: compareTechDate(currentArticle)(EMPTY_TECHDATE())  !== 0 ? currentArticle : data.last, 
      setCurrentArticle
    }
  }

  return (
    <ArticleContext.Provider value={initArticlesContext}>
        {children}
    </ArticleContext.Provider>
  )
}

export const useArticlesData = () => useContext(ArticleContext)