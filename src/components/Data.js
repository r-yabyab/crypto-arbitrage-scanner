import { useEffect, useState} from "react";

export function Data () {

    const [southList, setSouthList] = useState([]);

    useEffect(() => {
        const fetchList = async () => {
            const response = await fetch ("https://market.southxchange.com/api/markets", {
                method: "GET"
            });
            const json = await response.json();

            if (response.ok) {
                setSouthList(json)
            } else {
                console.log("ERROR");
            }
        }
    fetchList();
    }, [])

    return (
    <>
    <div className="">
        data div
        <div className="">
            
            {southList.map(x => {
                return (
                    <div className="">{x}</div>
                )
            })}
        </div>
    </div>
    </>
    )
}