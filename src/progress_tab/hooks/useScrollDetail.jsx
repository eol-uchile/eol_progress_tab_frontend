import { useEffect, useRef } from "react"

export const useScrollDetail = ( category ) => {
    const ref = useRef(null)
    useEffect(() => {
        ref.current.scrollIntoView();
    }, [ category ])
    return ref;
}
