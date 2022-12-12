import { loadStripe } from '@stripe/stripe-js'
import {React , useEffect} from 'react'
import {Routes , Route} from "react-router-dom"
import Checkout from './Commponts/Checkout'
import Header from './Commponts/Header'
import Home from './Commponts/Home'
import Login from './Commponts/Login'
import Orders from './Commponts/Orders'
import Payment from './Commponts/Payment'
import { useAuth } from './Context/GlobalState'
import { auth } from './firebase'
import { Elements } from '@stripe/react-stripe-js'

const App =() => {
  const {dispatch} = useAuth()
  const stripePromise = loadStripe("pk_test_51MCdjpEYi4sZW2DmayXFMM0KNBCKsWwdRwXoNQxcDB6BmCjMFb5jxAGcEy5pZKsiSdub9SWSeWxDSHpRsO4pnldw00dLwMM9gG")
  useEffect(()=>{
auth.onAuthStateChanged((authUser)=>{
  if(authUser){
    dispatch({
      type:"SET_USER",
      user: authUser,
    })
  }else{
    dispatch({
      type:"SET_USER",
      user: null,
    })  
  }
})
  }, []);
  return (
    <div className='app'>
    <Routes >
        <Route path='/' element={<>
          <Header/>
          <Home/>
        </>} />
        <Route path='/checkout' 
          element={<>
            <Header />
            <Checkout />
          </>}
        />
          <Route
          path="/payment"
          element={
            <>
              <Header />
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </>
          }
        />
        <Route
          path="/orders"
          element={
            <>
              <Header />
              <Orders />
            </>
          }
        />
        <Route path='/login' element={<Login />} />
        <Route path='*' element= {<h1>Error <br/> Page Not Found</h1>} />
          </Routes>
    </div>
  )
}

export default App