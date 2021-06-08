import React from 'react'
import './style.css'

const ErrorBox = (props) => {

    return (
        <div>
            <h1 className='alert'>{props.error}</h1>
        </div>
    )
}

export default ErrorBox
