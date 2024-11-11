'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { ArticleListing, useArticles } from "@/lib/client.utils"
import { Loading } from "../serverside/Loading"
import { techDateToHuman, techDateToString } from "@/lib/utils"

export const ArticleList = () => {
  const [ data, state ] = useArticles()

  switch (true) {
    case state === 'error':
      throw data

    case state === 'done' && !!data && data.hasOwnProperty('list'):
      const content = (data as ArticleListing)
      return (
        <Select >
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder={techDateToHuman(content.last)} />
          </SelectTrigger>
          <SelectContent popover="">
            {(content.list.map((entry, id) => (
              <SelectItem key={id} value={techDateToString(entry)}>{techDateToHuman(entry)}</SelectItem>
            )))}
          </SelectContent>
        </Select>
      )

    case state === 'empty':
    case state === 'loading':
    default:
      return (<Loading />)
  }
}