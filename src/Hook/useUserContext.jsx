import { useContext } from "react";
import { UserContext } from "../Context/UserContext";

export  const UserUseContext =()=>{
const context = useContext(UserContext)

if(!context) {
    throw Error('useWorkoutsContext must be used inside a WorkoutsContextProvider')
  }
return context
}