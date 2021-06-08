import React from 'react'
import CheckoutWizzard from '../../components/checkoutWizzard/CheckoutWizzard'
import './style.css'
import actions from '../../store/actions'
import { useSelector } from 'react-redux'

const ShippingScreen = (props) => {

    const userInfo = useSelector(()=>actions.get('userInfo', null))
    const shippingAddress = useSelector(()=>actions.get('shippingAddress', {fullName:'',address:'',city:'',postalCode:'',country:''}))
    if(!userInfo) {
        props.history.push('/signin')
    }

    const [fullName, setFullName] = React.useState(shippingAddress.fullName)
    const [address, setAddress] = React.useState(shippingAddress.address)
    const [city, setCity] = React.useState(shippingAddress.city)
    const [postalCode, setPostalCode] = React.useState(shippingAddress.postalCode)
    const [country, setCountry] = React.useState(shippingAddress.country)

    const submintHandler = (e) => {
        e.preventDefault()
        actions.set('shippingAddress', {fullName,address,city,postalCode,country})
        props.history.push('/payment')
    }

    return (
        <div>
            <CheckoutWizzard  step1 step2/>
            <form className='form' onSubmit={submintHandler}>
                <h2>Shipping Address</h2>
                <div>
                    <label htmlFor='fullName'>Full Name</label>
                    <input 
                     type='text'
                     id='fullName'
                     value={fullName}
                     onChange={e => setFullName(e.target.value)}
                     required
                    >
                    </input> 
                </div>
                <div>
                    <label htmlFor='address'>Address</label>
                    <input 
                     type='text'
                     id='address'
                     value={address}
                     onChange={e => setAddress(e.target.value)}
                     required
                    >
                    </input> 
                </div>
                <div>
                    <label htmlFor='city'>City</label>
                    <input 
                     type='text'
                     id='city'
                     value={city}
                     onChange={e => setCity(e.target.value)}
                     required
                    >
                    </input> 
                </div>
                <div>
                    <label htmlFor='postalCode'>Postal Code</label>
                    <input 
                     type='text'
                     id='postalCode'
                     value={postalCode}
                     onChange={e => setPostalCode(e.target.value)}
                     required
                    >
                    </input> 
                </div>
                <div>
                    <label htmlFor='country'>Country</label>
                    <input 
                     type='text'
                     id='country'
                     value={country}
                     onChange={e => setCountry(e.target.value)}
                     required
                    >
                    </input> 
                </div>
                    <label />
                    <button className='primary block' type='submit'>Continue</button>
            </form>
        </div>
        
    )
}

export default ShippingScreen
