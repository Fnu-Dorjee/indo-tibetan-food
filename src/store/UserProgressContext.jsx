
import { createContext, useState} from "react";

export const UserProgressContext = createContext({
    progress: '',
    showCart: ()=>{},
    hideCart:()=>{},
    showCheckOut:()=>{},
    hideCheckOut:()=>{},
});



export default function UserProgConxtProvider({children}){
   const [userProgress, setUserProgress] = useState('');

   function showCart(){
    setUserProgress('cart');
   };

   function hideCart(){
    setUserProgress('');
   };

   function showCheckOut(){
    setUserProgress('checkout');
   };

   function hideCheckOut(){
    setUserProgress('');
   };

    const userProgressCtx = {
        progress: userProgress,
        showCart,
        hideCart,
        showCheckOut,
        hideCheckOut,
    }

    return (
    <UserProgressContext.Provider value={userProgressCtx}>
        {children}
    </UserProgressContext.Provider>
    )

}
