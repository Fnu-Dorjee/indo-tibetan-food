
import { useContext } from "react";
import Modal from "../UI/Modal.jsx";
import Button from "../UI/Button.jsx";
import CartItem from "./CartItem.jsx";

import { currencyFormatter } from "../util/formatting.js";
import { CartContext } from "../store/CartContext.jsx";
import { UserProgressContext } from "../store/UserProgressContext.jsx";


export default function Cart(){
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);
    const {progress,hideCart,showCheckOut} = userProgressCtx;

    const cartTotal = cartCtx.items.reduce((totalPrice,item)=>{
        return totalPrice+item.quantity * item.price;
    },0);

    const cartBoxTotal = cartCtx.items.reduce((total, item)=>{
        return total + item.quantity;
    },0);

    function handleCloseCart(){
        hideCart();
    }
    function handleShowCheckout(){
        showCheckOut();
    }


    return (
        <Modal className="cart" open={progress === 'cart'} onClose={progress === 'cart' ? handleCloseCart : null} >
            <h2>Your cart</h2>
            {cartBoxTotal <= 0 && <h2>Your cart is Empty</h2>}
            <ul>
                {cartCtx.items.map((item)=>{
                    const {id,name, quantity,price} = item;
                    return (
                    <CartItem 
                        key={id} 
                        name={name} 
                        price={price} 
                        quantity={quantity}
                        onAddItem={()=>cartCtx.addItem(item)}
                        onRemoveItem={()=>cartCtx.removeItem(id)}
                        />
                )
                })}
            </ul>
            <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
            <p className="modal-actions">
                <Button textOnly onClick={handleCloseCart}>Close</Button>
                {cartCtx.items.length > 0 && 
                    (<Button onClick={handleShowCheckout}>Go to Checkout</Button>)
                }
            </p>
        </Modal>
    )
}