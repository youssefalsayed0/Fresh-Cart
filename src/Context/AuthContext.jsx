import { createContext, useEffect, useState } from "react";

export const authContext = createContext();


export default function AuthContext({ children }) {

const [token, setToken] = useState(null)
const [userName, setUserName] = useState(null)
const usertoken = localStorage.getItem('tkn');
const userNameData = localStorage.getItem('usr');
useEffect(() => {
if (usertoken != null) {
    setToken(usertoken);
}
    
}, []);

useEffect(() => {

if (userNameData != null) {
    setUserName(userNameData);
}
    
}, [])


  return <authContext.Provider value={{token , setToken , setUserName , userName}}>
    
    {children}
    

    </authContext.Provider>;
}
