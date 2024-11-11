'use client'

import { useCallback, useSyncExternalStore } from "react";
import { compareTechDate, EMPTY_TECHDATE, parseTechDateString, TechDateType } from "./utils";

import articleListingData from '../app/listing.json'

export type ArticleListing = {
  first: TechDateType
  list: TechDateType[]
  last: TechDateType
}

export type ArticleDataState = 'loading' | 'done' | 'error' | 'empty'

export const useArticles = () : [ArticleListing, ArticleDataState] => {

  const sortedData = articleListingData.map(parseTechDateString).sort((a,b) =>compareTechDate(a)(b))

  return [ {
    first: sortedData[0],
    list: sortedData,
    last: sortedData.findLast(() => true) ?? EMPTY_TECHDATE()
  }, 'done' ]
}

export const useMediaQuery = (query: string) => {
  const subscribe = useCallback(
    (callback: (this: MediaQueryList, ev: MediaQueryListEvent) => unknown) => {
      const matchMedia = window.matchMedia(query)

      matchMedia.addEventListener("change", callback)

      return () => matchMedia.removeEventListener("change", callback)
    },
    [query]
  );

  const getSnapshot = () => window.matchMedia(query).matches

  const getServerSnapshot = () => false

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
