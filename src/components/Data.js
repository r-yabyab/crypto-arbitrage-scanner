import React, { useEffect, useState} from "react";

export function Data ({ reducerValue }) {

    const [southList, setSouthList] = useState([]);
    const [vtc, setVtc] = useState([]);
    const [vtcBook, setVtcBook] = useState([]);

    const [symbol, setSymbol] = useState("");
    const [symbolBook, setSymbolBook] = useState([]);
    
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
                console.log(json)
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

    useEffect(() => {
        if (symbol) {
        const fetchList3 = async () => {
                const response = await fetch(`${SOUTHXCHANG_URL}/api/book/${symbol[0]}/${symbol[1]}`, {
                    method: "GET"
                });
                const json = await response.json();
                if (response.ok) {
                    setSymbolBook(json)
                    console.log(json)
                }
            
        }
        fetchList3();
    }
    }, [symbol, reducerValue])

    useEffect(() => {
        const data = window.localStorage.getItem('_symbol')
        if (data != null) {
            setSymbol(JSON.parse(data))
        }
    }, [])

    useEffect(() => {
        window.localStorage.setItem('_symbol', JSON.stringify(symbol))
    }, [symbol])

    // const source = new EventSource("wss://market.southxchange.com/api/v2/connect")

    const selectHandler = (tickerPair) => {
        setSymbol(tickerPair)
        // console.log(symbol)
        // console.log(symbol[0])
    }
    
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
                        .slice(0, 5)
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

                <div className="bg-blue-400 absolute w-[250px] text-center">
                    <p className="font-bold">{symbol[0]} / {symbol[1]}</p>
                    <div className="bg-zinc-900 flex-col">
                        <div className="flex justify-evenly">
                        <p className="text-zinc-200 border-blue-600 rounded-md border-2">{symbolBook.BuyOrders && symbolBook.BuyOrders[0].Price}</p>
                        <p className="text-zinc-200">{((symbolBook.SellOrders && symbolBook.SellOrders[0].Price) - (symbolBook.BuyOrders && symbolBook.BuyOrders[0].Price)).toString().replace(/^0+/, '').replace('.', '').replace(/^0+/, '').substring(0,3)}</p>
                        <p className="text-zinc-200 border-red-600 rounded-md border-2">{symbolBook.SellOrders && symbolBook.SellOrders[0].Price}</p>
                        </div>
                        <div className="border-b-2">
                            {symbolBook.SellOrders && symbolBook.SellOrders
                                .slice(0, 5)
                                .reverse()
                                .map(x => {
                                    return (
                                        <div className="flex justify-between">
                                            <p className="text-red-500">{(x.Price)}</p> 
                                            <p className="text-zinc-200">{(x.Amount)}</p>
                                        </div>
                                    )
                                })}
                        </div>
                        <div className="">
                            {symbolBook.BuyOrders && symbolBook.BuyOrders
                                .slice(0, 5)
                                .map(x => {
                                    return (
                                        <div className="flex justify-between">
                                            <p className="text-green-500">{x.Price}</p>
                                            <p className="text-zinc-200">{x.Amount}</p>
                                        </div>
                                    )
                                })}
                        </div>
                    </div>

                </div>

        <div className="">
            
            {southList.map(x => {
                return (
                    <div onClick={() => selectHandler(x)} className="">{`${x[0]} / ${x[1]}`}</div>
                )
            })}
        </div>
    </div>
    </>
    )
}