import { clsx, type ClassValue } from "clsx"
import { MutableRefObject, useCallback, useSyncExternalStore } from "react"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const withWindowMaker : (ref: MutableRefObject<Window | null>) => <T extends (w: Window) => any>(cb: T) => ReturnType<T> | undefined = (ref) => (cb) => {
  return ref.current !== null ? cb(ref.current) : undefined
}

export const useMediaQuery = (query: string) => {
  const subscribe = useCallback(
    (callback: (this: MediaQueryList, ev: MediaQueryListEvent) => any) => {
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