import axios from 'axios'
import React from 'react'
import ErrorBox from '../../components/errorBox/ErrorBox'
import './style.css'
import actions from '../../store/actions'
import { Link } from 'react-router-dom'


const RegisterScreen = (props) => {

    const [password, setPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('')
    const [email, setEmail ] = React.useState('')
    const [error, setError ] = React.useState(false)
    const [name, setName] = React.useState('')
    const redirect = props.location.search
        ? props.location.search.split('=')[1]
        : '/'

    const handleRegister = async(e) => {
        e.preventDefault()
        if(password === confirmPassword){
            try {
                const { data } = await axios.post('/api/users/register', {name,email,password})
                actions.set('userInfo', data)
                setError(false)
                props.history.push(redirect)
            } catch (err){
                setError('Email already in use')
            }
        }else{
            setError('Passwords do not match')
        }
    }

    

    return (
        <div>
            <form className='form' action="submit">
            { error && <ErrorBox error = {error}/>} 
                <h2>Create account</h2>
                <div>
                    <label htmlFor="name">Name</label>
                    <input 
                     type="text" 
                     id="name"
                     value={name}
                     onChange={(e)=>setName(e.target.value)}
                     required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email address</label>
                    <input 
                     type="email" 
                     id="email"
                     value={email}
                     onChange={(e)=>setEmail(e.target.value)}
                     required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input 
                     type="password" 
                     id="password"
                     value={password}
                     onChange={(e)=>setPassword(e.target.value)}
                     required
                    />
                </div>
                <div>
                    <label htmlFor="confirm password">Confirm Password</label>
                    <input 
                     type="password" 
                     id="confirm password"
                     value={confirmPassword}
                     onChange={(e)=>setConfirmPassword(e.target.value)}
                     required
                    />
                </div>
                <button 
                 onClick={handleRegister} 
                 className='primary block'
                 >
                    Register
                </button>
                <p>Already have an account <Link to={`/signin?redirect=${redirect}`}>Sign In</Link></p>
            </form>
        </div>
    )
}

export default RegisterScreen
