'use client';
import React, {createContext, useContext, useState} from 'react';

export const ItemsCartContext = createContext<any>(null);

export default function ItemsCartContextProvider({ children }: any){

    const [numberOfItemsInCart, setNumberOfItemsInCart] = useState(-1);

    return(
        <ItemsCartContext.Provider
            value={{
                numberOfItemsInCart,
                setNumberOfItemsInCart
            }}
        >
            {children}
        </ItemsCartContext.Provider>
    );
}

export function useItemsCartContext(){
    const context = useContext(ItemsCartContext);
    if(!context){
        throw new Error(
            'context fuera!!!'
        )
    }
    return context;
}