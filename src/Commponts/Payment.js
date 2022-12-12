import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import {React, useEffect, useState} from 'react'
import CurrencyFormat from 'react-currency-format'
import { Link,  useNavigate } from 'react-router-dom'
import { getBasketTotal } from '../Context/AppReducer'
import { useAuth } from '../Context/GlobalState'
import CheckoutProduct from './CheckoutProduct'
import axios from './axios'
import "./Payment.css";
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../firebase'
const Payment = () => {
    const {basket , user , dispatch} = useAuth()
    const [clientSecret, setClintSecret] = useState()
    const [error , setError] = useState(null)
    const [disabled, setDisabled] = useState(true)
    const [succeeded, setSucceded] = useState(false)
    const [processing, setProcessing] = useState("")
    const stripe = useStripe()
    const elements = useElements()
    const navigate = useNavigate()
    useEffect(()=>{
        const getClientSecret = async ()=>{
            const response = await axios({
                method: "post",
                url: `/payments/create?total=${getBasketTotal(basket) * 100}` ,
            });
                setClintSecret(response.data.clientSecret);
                return response;
        }           
        getClientSecret()
    },[basket])
    const handleSubmit = async(e) =>{
        e.prventDefault()
        setProcessing(true)
        const payload = await stripe
        .confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        })
        .then(({ paymentIntent }) => {
            const ref = doc(db, "users", user?.uid, "orders", paymentIntent.id);
            setDoc(ref, {
              basket: basket,
              amount: paymentIntent.amount,
              created: paymentIntent.created,
            });

            setSucceded(true);
            setError(null);
            setProcessing(false);
            dispatch({
              type: "EMPTY_BASKET",
            });
            navigate("/orders", { replace: true });
          });
      };
      const handleChange = (e) => {
        setDisabled(e.empty);
        setError(error ? error.message : "");
      };
  return (
    <div className='payment'>
        <div className='payment-container'>
            <h1>
                Checkout (<Link to='/checkout'>
                    {basket.length} Items
                </Link>)
            </h1>
                 {/* Delivery Address */}
            <div className='payment-section'>
                <div className='payment-title'>
                    <h3>Delivery Address</h3>
                </div>
                <div className='payment-address'>
                    <p>{user?.email}</p>
                    <p>Cairo, Egypt </p>
                </div>
            </div>
            {/* Review Items */}
            <div className='payment-section'>
                <div className='payment-title'>
                    <h3>Review Items and Delivery</h3>
                </div>
                <div className='payment-items'>
                   {basket.map((item)=> (
                    <CheckoutProduct 
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        image={item.image}
                        price={item.price}
                        rating={item.rating}
                    />
                   ))}
                </div>
            </div>
                    {/* Payment method */}
                <div className='payment-section'>
                    <h3>Payment Method</h3>
                        <div className='payment-details'>
                        <form onSubmit={handleSubmit}>
                            {/* Strpe Card */}
                            <CardElement onChange={handleChange}/>
                    <div className='payment-priceContainer'>
                    <CurrencyFormat  renderText={(value)=>(
                        <h3>Order Total : {value}</h3>
        )}
          decimalScale={2}
          value={getBasketTotal(basket)}
          displayType={"text"}
          thousandSeparator= {true}
          prefix={"$"}
        />
             <button
                  type="submit"
                  disabled={processing || disabled || succeeded}
                >
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>
              {error && <div>{error}</div>}
                        </form>
                        </div>
                </div>
        </div>
    </div>
  )
}

export default Payment