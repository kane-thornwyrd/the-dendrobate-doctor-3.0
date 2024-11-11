import { FC, HTMLProps, PropsWithChildren } from "react"

export const PrintableLink: FC<HTMLProps<HTMLAnchorElement> & PropsWithChildren & { hrefReadable?: string }> = ({ hrefReadable, children, className, ...props}) => {
  const newClassName = className + ' printable-link'
  return (<a className={newClassName} href-readable={!!hrefReadable ? hrefReadable : decodeURI(props.href as string)} {...props}>{children}</a> )
}