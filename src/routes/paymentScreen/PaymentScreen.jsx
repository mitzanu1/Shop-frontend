import React from 'react'
import { useSelector } from 'react-redux'
import CheckoutWizzard from '../../components/checkoutWizzard/CheckoutWizzard'
import actions from '../../store/actions'
import './style.css'

const PaymentScreen = (props) => {

    const shippingAddress = useSelector(()=>actions.get('shippingAddress', null))

    const [paymentMethod, setPaymentMethod] = React.useState('PayPal')

    const submitHandler = (e) => {
    e.preventDefault()
        actions.set('paymentMethod', paymentMethod)
        props.history.push('/placeorder')
    }

    React.useEffect(()=>{
        if(!shippingAddress) {
            props.history.push('/shipping')
        }
    })

    return (
        <div>
            <CheckoutWizzard step1 step2 step3/>
            <form className='form' onSubmit={submitHandler}>
             <h2>Payment Method</h2>
             <div className='flex'>
              <input 
               type="radio"
               id='paypal'
               value='PayPal'
               name='paymentMethod'
               required
               checked
               onChange={e => setPaymentMethod(e.target.value)}
              />
              <label htmlFor="paypal">PayPal</label>
             </div > 
             <div className='flex'>
              <input 
               type="radio"
               id='stripe'
               value='Stripe'
               name='paymentMethod'
               required
               onChange={e => setPaymentMethod(e.target.value)}
              />
              <label htmlFor="stripe">Stripe</label>
             </div>
             <button className='primary' type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default PaymentScreen
