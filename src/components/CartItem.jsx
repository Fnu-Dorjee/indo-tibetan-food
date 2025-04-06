

import { currencyFormatter } from "../util/formatting.js";

export default function CartItem({name,quantity,price,onAddItem,onRemoveItem}){
 
    const total = price * quantity;

    return (
        <li className="cart-item" >
            <p>{name} - {`Qt: ${quantity}`} x {currencyFormatter.format(price)} = {currencyFormatter.format(total)}</p>
            <p className="cart-item-actions">
                <button onClick={onRemoveItem}>-</button>
                <span>{quantity}</span>
                <button onClick={onAddItem}>+</button>
            </p>
        </li>
        );
}