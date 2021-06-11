import _ from 'lodash'
import React from 'react'
import { useSelector } from 'react-redux'
import QtySelector from '../../components/qtySelector/QtySelector'
import actions from '../../store/actions'
import './style.css'
import BackToProdBtn from '../../components/backToProdBtn/BackToProdBtn'


const emptyList = []

const CartScreen = (props) => {

    const products = useSelector(()=>actions.get('cart', emptyList))
    
    const [cartTotal, setCartTotal] = React.useState(0)

    const handleRemove = (_id) => {
        actions.update('cart', (value)=>{
            _.remove(value, (i)=> i._id === _id)
            return [...value]
        })
    }

    React.useEffect(() => {
       const _cartTotal = products.reduce((acc, product) => {
            const productTotal  = parseInt(product.price) * parseInt(product.qty)
            return acc + productTotal
        },0)
        setCartTotal(_cartTotal)
        actions.set('cartTotal', _cartTotal)
    },[products])

    const handleCheckout = () => {
        props.history.push('/signin?redirect=shipping')
    }

    return (
        <div>
            <BackToProdBtn/>
            <h1 style={{textAlign:'center'}}>Cart Screen</h1>
            <div className='row row-top'>
            <div className='cart-list col-2'>
            {
                products.map((product)=>{
                    const {_id,qty, name, image,price } = product

                    return (
                    <div key={_id} className='cart-prod'>
                        <img src={image} alt={name}
                            className='cart-image'/>
                        <div>Name {name}</div>
                        <div>Price: {price}</div>
                        <div>Quantity
                            <QtySelector qty={qty} product={product}/>
                        </div>
                        <button 
                            onClick={()=>handleRemove(_id)}
                            className='remove-btn secondary'
                        >
                            remove
                        </button>
                    </div>
                    
                    )
                })
            }
            </div>
            <div className='card cart-card col-1'>
                <p>Total price is: ${cartTotal}</p>
                <button 
                    className='primary block'
                    onClick={handleCheckout}
                >
                    Procead to checkout
                    </button>
            </div>
            </div>
        </div>
    )
}

export default CartScreen
