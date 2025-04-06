

import { useContext } from 'react';
import { CartContext } from '../store/CartContext.jsx';
import { UserProgressContext } from '../store/UserProgressContext.jsx';
import logoImg from '../assets/himalayan.jpg';
import Button from '../UI/Button.jsx';

export default function Header(){
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const totalCartItems = cartCtx.items.reduce((total,item)=>{
        return total + item.quantity;
    },0);

    function handleShowCart(){
        userProgressCtx.showCart();
    }

    return (
        <header id='main-header'>
            <div id='title'>
                <img src={logoImg} alt='logo'/>
                <h1>Indo-Tibetan Food</h1>
            </div>
            <nav><Button textOnly onClick={handleShowCart}>Cart ({totalCartItems})</Button></nav>
        </header>
    )
}