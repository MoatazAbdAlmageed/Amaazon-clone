import React from 'react'
import { useAuth } from '../Context/GlobalState'
import checkoutImg from "../images/checkoutAd.jpg"
import CheckoutProduct from './CheckoutProduct'
import "./Checkout.css"
import Subtotal from './Subtotal'
const Checkout = () => {
    const {user, basket} = useAuth()
  return (
    <div className='checkout'>
            <div className='checkout-left'> 
                <img className='checkout-ad' src={checkoutImg} alt="checkout-add" />

                <div>
                <h3>Hello,{user ? `${user.email}` : 'Guest'}</h3>
            <h2 className='checkout-title'>Your shopping Basket</h2>
           {
            basket.length >
            0 ?(
              basket.map((item)=> (
                <CheckoutProduct id={item.id} 
                title={item.title}
                 image={item.image} 
                 price={item.price}
                rating={item.rating}
                 />
            ))
            ): (
              <p>
                You Have No Items In Your Basket. To Buy 
                One Or More Items, Click "Add To Basket".
              </p>
            )
            
           }
                </div>
            </div>
            <div className='checkout-right'>
                <Subtotal />
            </div>
    </div>
  )
}

export default Checkout