import { useReducer } from "react";
import { Data } from "./Data";

export function Homepage () {

    const [reducerValue, forceUpdate] = useReducer(x => x+1, 0)

    setTimeout(() => {
        forceUpdate()
        console.log(reducerValue)
    }, 30000)

    return (
    <>
    <div>
        homepage div
        <Data reducerValue={reducerValue}/>
    </div>
    </>
    )
}