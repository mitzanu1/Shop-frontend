import React from 'react'
import { useSelector } from 'react-redux'
import CheckoutWizzard from '../../components/checkoutWizzard/CheckoutWizzard'
import actions from '../../store/actions'
import './style.css'
import axios from 'axios'

const PlaceOrderScreen = (props) => {

    const paymentMethod = useSelector(()=>actions.get('paymentMethod', null))
    if(!paymentMethod) {
      props.history.push('/payment')
    }
    const itemsPrice = useSelector(()=>actions.get('cartTotal', null))
    const orderItems = useSelector(()=>actions.get('cart', []))
    const userInfo = useSelector(()=>actions.get('userInfo', {}))
    const shippingAddress = useSelector(()=>actions.get('shippingAddress', {}))
    const { fullName, address, city, postalCode, country } = shippingAddress

    const [taxPrice, setTaxPrice] = React.useState('')
    const [totalPrice, setTotalPrice] = React.useState('')
    const [shippingPrice, setShippingPrice] = React.useState(0)

    React.useEffect(()=>{
      const _tax = parseFloat(itemsPrice) * 0.20
      setTaxPrice(_tax)
      const _total = parseFloat(itemsPrice) + _tax
      setTotalPrice(_total)
    },[itemsPrice])

    const placeOrderHandler = async() => {
      try{
        const {data} = await axios.post('/api/orders',
        { 
           orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, taxPrice, totalPrice
        },
        { 
          headers: { Authorization: `Bearer ${userInfo.token}` }
        })
        props.history.push('/orederinfo')
        actions.delete('cart')
      }catch(err){

      }
    }

    return (
        <div>
         <CheckoutWizzard step1 step2 step3 step4 />
          <div className='row'>
           <div className='col-2'>
             <ul className='block'>
               <li>
                 <div className='card-order'>
                   <h2>Shipping</h2> 
                   <p>
                      <strong>Name:</strong> {fullName} <br/>
                      <strong>Address:</strong> {address}, {city}, {country} <br/>
                      <strong>PostalCode:</strong> {postalCode} <br/>
                   </p>
                 </div>
               </li>   
               <li>
                 <div className='card-order'>
                   <h2>Payment</h2> 
                   <p>
                      <strong>Method:</strong> {paymentMethod} 
                   </p>
                 </div>
               </li>   
               <li>
                 <div className='card-order'>
                   <h2>Order Items</h2> 
                   {
                    orderItems.map((product)=>{
                        const {_id, qty, name, image,price } = product

                        return (
                        <div key={_id} className='cart-prod'>
                            <img src={image} alt={name}
                                className='cart-image'/>
                            <div>{name}</div>
                            <div>{qty} x ${price} = ${qty * price}</div>
                        </div>
                      )
                    })
                   }
                 </div>
               </li>   
             </ul>
           </div>   
           <div className='col-1 top'>
            <div className='card-order'>
              <ul>
                <li>
                  <h2>Order Summary</h2>
                </li>
                <li>
                  <div className='row'>
                   <div>Items</div>
                   <div>${itemsPrice}</div>
                  </div>
                </li>
                <li>
                  <div className='row'>
                   <div>Shipping Cost</div>
                   <div>${shippingPrice}</div>
                  </div>
                </li>
                <li>
                  <div className='row'>
                   <div>Tax</div>
                   <div>${taxPrice}</div>
                  </div>
                </li>
                <li>
                  <div className='row'>
                   <div><b>Total</b></div>
                   <div>${totalPrice}</div>
                  </div>
                </li>
              </ul>
              <button 
               className='primary block'
               onClick={placeOrderHandler}
               disabled={orderItems.length === 0}
               >
                Place Order
              </button>
            </div>
           </div>
          </div>
        </div>
    )
}

export default PlaceOrderScreen
