'use client'

import axios, { AxiosResponse } from "axios";
import { Dispatch, MutableRefObject, SetStateAction, useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { compareTechDateString, EMPTY_TECHDATE, parseTechDateString, TechDateType } from "./utils";

export type ArticleListing = {
  first: TechDateType
  list: TechDateType[]
  last: TechDateType
}

export type ArticleDataState = 'loading' | 'done' | 'error' | 'empty'

export const useArticles = () : [ArticleListing, ArticleDataState] => {
  const [ state, setState ] = useState<'loading' | 'done' | 'error' | 'empty'>('empty')
  const [ data, setData ] = useState<ArticleListing>({
    first: EMPTY_TECHDATE(),
    list: [],
    last: EMPTY_TECHDATE(),
  })

  useEffect(() => {

    const fetchArticles = async () => {
      return await axios.get<string[]>(
        '/articles/listing.json'
      )
    }

    fetchArticles()
      .then((data: AxiosResponse<string[], string>) => {
        const sortedData = data.data.sort((a,b) =>compareTechDateString(a)(b)).map(parseTechDateString)

        console.log(sortedData);
        

        setData({
          first: sortedData[0],
          list: sortedData,
          last: sortedData.findLast(() => true) ?? EMPTY_TECHDATE()
        })
        setState('done')
      })
      .catch(() => {
        setData({
          first: EMPTY_TECHDATE(),
          list: [],
          last: EMPTY_TECHDATE(),
        })
        setState('error')
      })

  }, []);

  return [ data, state ]
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
