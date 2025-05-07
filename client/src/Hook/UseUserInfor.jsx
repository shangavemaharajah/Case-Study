import { useContext } from "react";
import { UserInformation } from "../Context/UserInforContext";

export const useUserInformation =()=>{
    const context = useContext(UserInformation);

    if(!context){
        throw Error ("useUserInformation must be used inside an userUserInformation provider")
    }

    return context;
}