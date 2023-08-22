import React, { useEffect, useState} from "react";

export function Data () {

    const [southList, setSouthList] = useState([]);
    const [vtc, setVtc] = useState([]);
    const [vtcBook, setVtcBook] = useState([]);

    const [symbol, setSymbol] = useState("");
    
    let SOUTHXCHANG_URL = "https://market.southxchange.com";

    useEffect(() => {
        const fetchList = async () => {
            try {
            const response = await fetch (`${SOUTHXCHANG_URL}/api/markets`, {
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
                const response = await fetch(`${SOUTHXCHANG_URL}/api/price/vtc/btc`, {
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

    useEffect(() => {
        const fetchList2 = async () => {
            const response = await fetch(`${SOUTHXCHANG_URL}/api/book/vtc/btc`, {
                method: "GET"
            });
            const json = await response.json();
            if (response.ok) {
                setVtcBook(json)
                console.log(json)
            }
        
    }
    fetchList2();
    }, [])

    // const source = new EventSource("wss://market.southxchange.com/api/v2/connect")

    
    return (
    <>
            <div className="">
                data div
                <div className="bg-green-400 p-4">
                    {vtc && (
                        <div>
                            <p>Bid: {vtc.Bid}</p>
                            <p>Ask: {vtc.Ask}</p>
                            <p>Spread: {parseInt((vtc.Ask - vtc.Bid) * 1e9, 10)}</p>
                            <p>Last: {vtc.Last}</p>
                            <p>Variation 24Hr: {vtc.Variation24Hr}</p>
                            <p>Volume 24Hr: {vtc.Volume24Hr}</p>
                        </div>
                    )}
                </div>
                <div className="bg-slate-400">
                    <div>book</div>
                    <div>{vtcBook.BuyOrders && vtcBook.BuyOrders
                        .slice(0,5)
                        .map(x => {
                        return (
                            <div className="border-t-2 text-sm flex gap-x-4">
                                <p>{x.Index}</p> 
                                <p>{x.Amount} </p>
                                <p>Price: {x.Price}</p>
                            </div>
                        )
                    })}</div>
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