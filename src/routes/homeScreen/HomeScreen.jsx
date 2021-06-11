import React from 'react'
import './style.css'
import Card from '../../components/card/Card'
import actions from '../../store/actions'
import axios from 'axios'
import LoadingBox from '../../components/loadingBox/LoadingBox'
import ErrorBox from '../../components/errorBox/ErrorBox'

const HomeScreen = () => {

  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(false)
  
  React.useEffect(()=>{
    const fetchData = async() => {
      try { 
        const { data } = await axios.get('https://glacial-ravine-24086.herokuapp.com/api/products')
        actions.set('data', data)
        setLoading(false)
      } catch (err) {
        setLoading(false)
        setError(err.message)
      }
    }
    fetchData()
  },[])
  
    return (<>
      { loading 
        ? <LoadingBox/> 
        : error 
         ? <ErrorBox error={error}/>
         : <div className="content">
            <ul className="products">
             <Card/>
            </ul>
           </div>
      }
      </>
    )
}

export default HomeScreen
