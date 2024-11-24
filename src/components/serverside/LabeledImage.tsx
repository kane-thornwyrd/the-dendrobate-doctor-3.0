import { FC, HTMLProps, PropsWithChildren } from "react"

export const LabeledImage: FC<HTMLProps<HTMLImageElement> & PropsWithChildren & { hrefReadable?: string }> = ({ hrefReadable, children, className, ...props}) => {
  return (
  <figure className='labeled-image aspect-square max-w-full bg-stone-900 m-0 p-0 relative border-8 border-stone-100 shadow-lg shadow-stone-800/20'>
    <img {...props} />
    {!props.alt?.length ? <div className="label absolute bottom-0 left-0 w-full bg-stone-100 h-14 px-5"></div> : <figcaption className="label absolute bottom-0 left-0 w-full bg-stone-100 h-14 py-5">{props.alt}</figcaption>}
  </figure>
  )
}