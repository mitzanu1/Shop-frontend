import React from 'react'
import './style.css'
import Rating from '../rating/Rating'
import actions from '../../store/actions'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Card = () => {

    const products = useSelector(()=>actions.get('data', []))


    return (
        
            products.map((product)=>{
                const {_id,name,brand,category,price,rating,numReviews,image} = product
                return (
                <li key={_id}>       
                <div className="product">
                    <div className="product-image">
                     <img  src={image} alt="product" />
                    </div>
                    <div className='product-details'>
                    <div className="product-name">
                        <Link to={`/product/${_id}`}>{name}</Link>
                    </div>
                    <div className="product-brand">{brand}</div>
                    <div className="product-rating"> <Rating rating={rating} numReviews={numReviews}/></div>
                    <div className="product-price">$ {price}</div>
                    </div>
                 </div>
                 </li>
                    )
                })
    )
}

export default Card
