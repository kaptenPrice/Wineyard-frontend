import React, { Context, createContext, PropsWithChildren, useContext, useState } from 'react';

export const WineData = createContext(null);

const WineProvider = ({ children }: PropsWithChildren<any>) => {
    const [wineList, setWineList] = useState([]);
    return <WineData.Provider value={{ wineList, setWineList }}>{children}</WineData.Provider>;
};

export default WineProvider;

 export const useWine =():WineProfileType=> useContext(WineData);


 type WineProfileType={
     wineList:any, 
     setWineList:any
 }