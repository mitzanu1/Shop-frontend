import React from 'react'
import {useSelector} from 'react-redux'
import actions from '../../store/actions'
import './style.css'


const OrderInfoScreen = (props) => {

    const orderInfo = useSelector(()=>actions.get('orderInfo'))
    const { order } = orderInfo || {}
    const { message } = orderInfo || {}
    const {
        _id,
        isDelivered, 
        isPayed, 
        itemsPrice, 
        shippingPrice, 
        taxPrice, 
        totalPrice, 
        createdAt, 
        orderItems = [],
        shippingAddress
    } = order || {}
    
    const {
        fullName,
        address,
        city, 
        postalCode, 
        country
    } = shippingAddress || {}
    
    
    React.useEffect(()=>{
        if(!orderInfo) {
            props.history.push('/placeorder')
        }
    })

    return (
        <div className='orderInfo'>
            <h1>{message}</h1>
            <ul>
                <li>Order ID: {_id}</li>
                <li>Payed: {isPayed ? 'Yes' : 'No'}</li>
                <li>Delivered: {isDelivered ? 'Yes' : 'No'}</li>
                <li>Ordered by: {fullName}</li>
                <li>Shipping Address: {address}, {city}, {postalCode}, {country} </li>
                <li>Products Ordered: 
                    <ol>
                        {orderItems.map((item, index)=>{
                        const {name, price, qty} = item
                        return (
                            <li key={index}>{`Item: ${name}, Price: ${price}, Quantity: ${qty}`}</li>
                        )
                        })}
                    </ol>
                </li>
                <li>Total Price {totalPrice}
                    <ol>
                        <li>Products Price: {itemsPrice}</li>
                        <li>Shipping Price: {shippingPrice}</li>
                        <li>Tax Price: {taxPrice}</li>
                    </ol>
                </li>
                <li>Order was placed on: {createdAt}</li>
            </ul>
        </div>
    )
}

export default OrderInfoScreen
