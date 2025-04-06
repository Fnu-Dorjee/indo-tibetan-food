

import { useContext } from "react";
import useHttp from "../hooks/useHttp.js";
import { CartContext } from "../store/CartContext.jsx";
import { UserProgressContext } from "../store/UserProgressContext.jsx";

import Modal from "../UI/Modal.jsx";
import { currencyFormatter } from "../util/formatting.js";
import Input from "../UI/Input.jsx";
import Button from "../UI/Button.jsx";
import Error from "./Error.jsx";

const requestConfig = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'}
    };

export default function Checkout(){
   
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);
    const {progress,hideCheckOut} = userProgressCtx;

    const {data,isLoading: isSending, error, sendRequest}= useHttp("http://localhost:3000/orders",requestConfig);

    const totalAmount = cartCtx.items.reduce((total,item)=>{
        return (total+ item.quantity * item.price);
    },0);

    function hideCheckoutHandler(){
        hideCheckOut()
    };

    function handleFinish(){
        hideCheckOut();
        cartCtx.clearCart();
    }

    function handleFormSubmit(e){
        e.preventDefault();
        const fb = new FormData(e.target);
        const customerData = Object.fromEntries(fb.entries());

        sendRequest( JSON.stringify({
            order: {
                items: cartCtx.items,
                customer: customerData
             }
            })
        );
    }

    let actions = (
    <>
    <Button type='button' textOnly onClick={hideCheckoutHandler}>Close</Button>
    <Button>Submit Order</Button>
    </>
    );

    if(isSending){
        actions = <span>Sending order datas....</span>
    }
    if(data && !error){
        return (
        <Modal open={progress === 'checkout'} onClose={hideCheckoutHandler} >
            <h2>Success!</h2>
            <p>Your order was submitted!</p>
            <p>We'll get back you in a minute.</p>
            <p><Button onClick={handleFinish}>Okay</Button></p>
        </Modal>
        )
    }


    return (
        <Modal open={progress === 'checkout'} onClose={hideCheckoutHandler}>
            <form onSubmit={handleFormSubmit}>
                <h2>Check Out</h2>
                <p>Total Amount: {currencyFormatter.format(totalAmount)} </p>
                <Input 
                    label="full name" 
                    type="text"
                    id='name'/>
                <Input
                    label='E-Mail Address'
                    id='email'
                    type='email'
                    />
                <Input 
                    label='street'
                    type='text'
                    id='text'
                    />
                <div className="control-row">
                    <Input 
                        label='postal code'
                        type='text'
                        id='postal-code'
                        />
                    <Input 
                        label='city'
                        type='text'
                        id='city'
                        />
                </div>
                {error && <Error title='failed to submit order.' message={error}/>}
                <p className='modal-actions'>{actions}</p>
            </form>
        </Modal>
    );
}