import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'
import ErrorBox from '../../components/errorBox/ErrorBox'
import './style.css'
import actions from '../../store/actions'
import { useSelector } from 'react-redux'


const SigninScreen = (props) => {

    const [password, setPassword] = React.useState('')
    const [email, setEmail ] = React.useState('')
    const [error, setError ] = React.useState(false)
    const userInfo = useSelector(()=>actions.get('userInfo')) 
    const redirect = props.location.search
        ? props.location.search.split('=')[1]
        : '/'

    const handleSignin = async(e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post('https://glacial-ravine-24086.herokuapp.com/api/users/signin', {email,password})
            actions.set('userInfo', data)
            setError(false)
            props.history.push(redirect)
        } catch (err){
            setError('Invalid email or password')
        }
    }

    React.useEffect(()=>{
        if(userInfo)
            props.history.push('/shipping')
    })

    return (
        <div>
            <form className='form' action="submit">
            { error && <ErrorBox error = {error}/>} 
                <h2>Sign In</h2>
                <div>
                    <label htmlFor="email">Email address</label>
                    <input 
                     type="email" 
                     name="email" 
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
                     name="password" 
                     id="password"
                     value={password}
                     onChange={(e)=>setPassword(e.target.value)}
                     required
                    />
                </div>
                <button 
                 onClick={handleSignin} 
                 className='primary block'
                 >
                    Sign In
                </button>
                <p>New customer? <Link to={`/register?redirect=${redirect}`}>Create account</Link></p>
            </form>
        </div>
    )
}

export default SigninScreen
