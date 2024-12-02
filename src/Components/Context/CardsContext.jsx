
import { createContext, useState } from "react";
export const CardsContext = createContext();

export const CardsContextProvider = (props) => { 
    console.log('props :>> ', props);
    const [number, setNumber] = useState(1)
    const [info, setInfo] = useState('');

    return (
        <CardsContext.Provider value={number}>
            {props.children}
        </CardsContext.Provider>
    )
}
