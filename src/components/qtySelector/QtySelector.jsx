import React from 'react'
import actions from '../../store/actions'

const QtySelector = (props) => {

    const {qty, product} = props

    const handleChange = (e) => {
        actions.update('cart', value => {
            const newValue = value.map((item) => {
                if(item._id === product._id)
                 return {...item, qty: e.target.value}
                else 
                 return item
            })
            return newValue
        })
    }

    return (
        <div>
         <select value={qty} onChange={e => handleChange(e)}>
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
    )
}

export default QtySelector
