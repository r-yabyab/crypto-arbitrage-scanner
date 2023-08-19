import React, { useEffect, useState} from "react";

export function Data () {

    const [southList, setSouthList] = useState([]);
    const [vtc, setVtc] = useState([]);

    useEffect(() => {
        const fetchList = async () => {
            try {
            const response = await fetch ("https://market.southxchange.com/api/markets", {
                method: "GET"
            });
            const json = await response.json();

            if (response.ok) {
                setSouthList(json)
            } else {
                console.log("ERROR");
            }
        } catch (error) {
            console.error(error);
        }
        }
    fetchList();
    }, [])

    useEffect(() => {
        const fetchList1 = async () => {
                const response = await fetch("https://market.southxchange.com/api/price/vtc/btc", {
                    method: "GET"
                });
                const json = await response.json();
                if (response.ok) {
                    setVtc(json)
                    console.log(json)
                }
            
        }
        fetchList1();
    }, [])

    return (
    <>
    <div className="">
        data div
        <div className="bg-green-400 p-4">
      {vtc && (
        <div>
          <p>Bid: {vtc.Bid}</p>
          <p>Ask: {vtc.Ask}</p>
          <p>Spread: {parseInt((vtc.Ask - vtc.Bid) * 1e9,10)}</p>
          <p>Last: {vtc.Last}</p>
          <p>Variation 24Hr: {vtc.Variation24Hr}</p>
          <p>Volume 24Hr: {vtc.Volume24Hr}</p>
        </div>
      )}
    </div>

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