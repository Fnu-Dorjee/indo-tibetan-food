import { createContext, useReducer, useState } from "react";

export const  CartContext = createContext();

function CartReducer(state, action){
    if(action.type === 'ADD-ITEM'){
        const existingCartItemIndex = state.items.findIndex((item)=>
            item.id === action.item.id);
        const updatedItems = [...state.items];
        if(existingCartItemIndex > -1){
            const existinItem = state.items[existingCartItemIndex]
            const updatedItem = {
                ...existinItem,
                quantity: existinItem.quantity+1
            }
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        else{
            updatedItems.push({...action.item, quantity: 1});
        }
        return {...state, items: updatedItems}
    }

    if(action.type === 'REMOVE-ITEM'){
        const existingCartItemIndex = state.items.findIndex((item)=>
            item.id === action.id);

        const existingCartItem = state.items[existingCartItemIndex];
        const updatedItems = [...state.items];

        if(existingCartItem.quantity === 1){
            updatedItems.splice(existingCartItemIndex, 1);

        }else{
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity-1,
            };
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        return {...state, items: updatedItems}
    }

    if(action.type === 'CLEAR-CART'){
        return {...state, items:[]}
    }
    
    return state;
}


export default function CartContextProvider({children}){
    const [cart, dispatchCartAction] = useReducer(CartReducer, {items:[]});

    function addItem(item){
        dispatchCartAction({type:'ADD-ITEM', item:item})
    };

    function removeItem(id){
        dispatchCartAction({type: 'REMOVE-ITEM', id: id})
    };

    function clearCart(){
        dispatchCartAction({type: 'CLEAR-CART'});
    }

    const cartContext = {
        items: cart.items,
        addItem: addItem,
        removeItem,
        clearCart
    }
   
    return <CartContext.Provider value={cartContext}>
        {children}
    </CartContext.Provider>
}