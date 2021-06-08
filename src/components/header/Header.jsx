import React from 'react'
import './style.css'
import { Link } from 'react-router-dom'
import actions from '../../store/actions'
import {useSelector} from 'react-redux'
import _ from 'lodash'

const Header = () => {

    const cartProducts = useSelector(()=>actions.get('cart', []))
    const user = useSelector(()=>actions.get('userInfo', {}))
    const brandName = 'E shop'
    
    const handleLogOut = () => {
        actions.delete('userInfo')
        actions.delete('cart')
        actions.delete('shippingAddress')
    }

   
    
    return (
        <header className="header">
            <div className="brand">
                <Link to="/">{brandName}</Link>
            </div>
            <div className="header-links">
                <Link to="/cart">
                    Cart
                    {
                    cartProducts.length > 0 
                    && <span className='badge'>
                        {cartProducts.length}
                    </span>
                    }
                </Link>
                {
                    _.isEmpty(user)  
                    ? <Link to="/signin">Sign In</Link>
                    : <button className='dropdown'>{user.name}
                        <ul className='dropdown-content'>
                            <li onClick={handleLogOut}>Log out</li>
                        </ul>
                    </button> 
                }
            </div>
        </header>
    )
}

export default Header
