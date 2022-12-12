import React from 'react'
import CurrencyFormat from 'react-currency-format'
import { getBasketTotal } from '../Context/AppReducer'
import {useAuth} from "../Context/GlobalState"
import { useNavigate } from 'react-router-dom'
import "./Subtotal.css"
const Subtotal = () => {
  const {basket} = useAuth()
  const navigate = useNavigate()
  return (
    <div className='subtotal'>
        <CurrencyFormat  renderText={(value)=>(
          <>
            <p>
              SubTotal ({basket.length} items): <strong>{value}</strong>
            </p>
            <small className='subtotal__gift'>
              <input type="checkbox" /> This Order Contains a Gift
            </small>
          </>
        )}
          decimalScale={2}
          value={getBasketTotal(basket)}
          displayType={"text"}
          thousandSeparator= {true}
          prefix={"$"}
        />
        <button onClick={()=> navigate("/payment")}>Proceed to Checkout</button>
    </div>
  )
}

export default Subtotal
 