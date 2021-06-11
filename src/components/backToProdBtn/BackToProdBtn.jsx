import React from 'react'
import { Link } from 'react-router-dom'

const BackToProdBtn = () => {
    return (
        <Link to='/'>
                <button className='primary'>
                  Return to products
                </button>
            </Link>
    )
}

export default BackToProdBtn
