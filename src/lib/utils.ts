import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type TechDateType = { 
  year : number
  month : number
  day : number
}

export const dateParseRegex = /(?<year>\d{4})(?<month>\d{2})(?<day>\d{2})/

export const techDateToHuman = ({ year, month, day }: TechDateType): string => {
  const MONTHS = [
    '',
    'janvier',
    'février',
    'mars',
    'avril',
    'mai',
    'juin',
    'juillet',
    'août',
    'septembre',
    'octobre',
    'novembre',
    'décembre',
  ]

  return `${day} ${MONTHS[month]} ${year}`
}

export const techDateToString  = ({ year, month, day } : TechDateType) => `${year.toString().padStart(4, '0')}${month.toString().padStart(2, '0')}${day.toString().padStart(2, '0')}`

type compOutput = -1 | 0 | 1

export const compareTechDateString = (a: string) => ( b: string): compOutput | never => {
  
  const aTd = parseTechDateString(a)
  const bTd = parseTechDateString(b)

  return compareTechDate(aTd)(bTd)

}

export const compareTechDate = (a: TechDateType) => (b: TechDateType): compOutput | never => {

  const sign = Math.sign

  switch (true) {
    case a.year !== b.year: 
      return sign(a.year - b.year) as compOutput
    case a.month !== b.month: 
      return sign(a.month - b.month) as compOutput
    case a.day !== b.day: 
    default:
      return sign(a.day - b.day) as compOutput
  }

}

export const EMPTY_TECHDATE = (): TechDateType => ({
  year: 0,
  month: 0,
  day: 0,
})

export const parseTechDateString= (s: string) : TechDateType => {
  const found : {[key : string] : string | number } | undefined = s.match(dateParseRegex)?.groups
  if(!dateParseRegex.test(s) || !found) throw new Error(`"${JSON.stringify(s)}" is not a date.`)

  const output: TechDateType = EMPTY_TECHDATE()

  for (const [k, v] of Object.entries(found)) {
    output[k as keyof TechDateType] = parseInt(v as string)
  }

  return output
}

export const randInt = (max : number = 1, seed: number) =>{ 
  const output = Math.trunc(seed.toString().split('').map(v=>v as unknown as number).reduce((p,c)=> p+c) % 17 / 16 * max)
  return output
}
