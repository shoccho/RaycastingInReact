import { useEffect } from "react"

export const Hack = ({update}) => {
    useEffect(()=>{
        if(update){
            update();
        }
    });
    return <></>
}