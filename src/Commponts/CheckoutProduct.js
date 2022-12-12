import React from 'react'
import { useAuth } from '../Context/GlobalState';
import starIcon from "../images/icon/star.png";
import "./CheckoutProduct.css"
const CheckoutProduct = ({id, title, price, rating, image}) => {
    const {dispatch} = useAuth()
    const removeFormBasket = ()=>{
            dispatch({
                type: "REMOVE_FROM_BASKET",
                id:id,
            })
    }
  return (
    <div className='checkoutProduct'>
        <img className='checkoutProduct-image' src={image} alt="" />
        <div className='checkoutProduct-info'>
            <p className='checkoutProduct-title'>{title}</p>
            <p className='checkoutProduct-price'>
                <small>$</small>
                <strong>{price}</strong>
            </p>
                <div className='checkoutProduct-rating'>
                    {Array(rating)
                    .fill()
                    .map((_, i) => (
                        <p>
                            <img src={starIcon} alt="" />
                        </p>
                    ))}
                </div>
                <button onClick={removeFormBasket}>Remove from Basket</button>
        </div>
    </div>
  )
}

export default CheckoutProduct