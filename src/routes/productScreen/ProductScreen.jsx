import React from 'react'
import Rating from '../../components/rating/Rating'
import './style.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import ErrorBox from '../../components/errorBox/ErrorBox'
import actions from '../../store/actions'
import _ from 'lodash'


const ProductScreen = (props) => {

    const productId = props.match.params.id
    const [product, setProduct] = React.useState({})
    const [error, setError] = React.useState(false)
    const [qty, setQty] = React.useState(1)
    
    React.useEffect(()=>{
        const fetchData = async() => {
            try{
                const {data} = await axios.get(`https://glacial-ravine-24086.herokuapp.com/api/products/${productId}`)
                setProduct(data)
            } catch(err) {
                setError(err.message)
            }
        }
        fetchData()
    },[productId])
 
    const addToCartHandler = () => {
        props.history.push(`/cart`)
        addToCart()
    }

    const addToCart = () => {
        actions.update('cart', (value = []) => {
            const _product = {...product, qty:qty}
           _.remove(value, (i)=> i._id === _product._id)
           return [...value, _product]
        })
    }

    if(error) return <ErrorBox error={error}/>

    return (
    
        <div>
        <Link to='/'>Back to results</Link>
        <div className='row row-top'>
            <div className='col-2'>
                <img className='large' src={product.image} alt={product.name}/>
            </div>
            <div className='col-1'>
            <ul>
                <li>
                    <h1>{product.name}</h1>
                </li>
                <li>
                    <Rating
                        rating={product.rating}
                        numReviews={product.numReviews}
                    ></Rating>
                </li>
                <li>
                    Price: $ {product.price}
                </li>
                <li>
                    Description:
                    <p>{product.description}</p>
                </li>
            </ul>
            </div>
            <div className='col-1'>
                <div className='card card-body'>
                    <ul>
                        <li>
                            <div className='row'>
                                <div>Price</div>
                                <div className='price'>$ {product.price}</div>
                            </div>
                        </li>
                        <li>
                            <div className='row'>
                                <div>Status</div>
                                <div >
                                    {product.inStock > 0 
                                    ? <span className='success'>In Stock</span> 
                                    : <span className='error'>Unavailable</span>}
                                </div>
                            </div>
                        </li>
                        {
                            product.inStock > 0 && 
                        <>
                        <li>
                            <div className='row'>
                                <div>Qty</div>
                                <div>
                                    <select value={qty} onChange={e => setQty(e.target.value)}>
                                    {
                                        [...Array(product.inStock).keys()].map((i)=>
                                            <option
                                                key={i + 1} 
                                                value={i + 1}
                                            >
                                                {i + 1}
                                            </option>
                                        )  
                                    }
                                    </select>
                                </div>
                            </div>
                        </li>
                        <li>
                            <button 
                             onClick={addToCartHandler}
                             className='primary block'>
                                Add to Cart
                            </button>
                        </li>
                        </>
                        }
                    </ul>
                </div>
            </div>
        </div>
        </div>
    
                      
    )
}

export default ProductScreen
