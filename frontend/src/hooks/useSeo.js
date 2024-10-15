import { useEffect } from "react"

export const useSeo = ({ title }) => {
    const titleSeo = title ? `${title} - Seo` : "Seo"
    
    useEffect(() => {
      document.title = titleSeo
    }, [titleSeo])
}
