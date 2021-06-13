import React from 'react'
import Footer from './components/footer/Footer'
import Header from './components/header/Header';
import ProductScreen from './routes/productScreen/ProductScreen'
import HomeScreen from './routes/homeScreen/HomeScreen'
import { Route, Switch } from 'react-router-dom'
import CartScreen from './routes/cartScreen/CartScreen';
import SigninScreen from './routes/signinScreen/SigninScreen';
import RegisterScreen from './routes/registerScreen/RegisterScreen';
import ShippingScreen from './routes/shippingScreen/ShippingScreen';
import PaymentScreen from './routes/paymentScreen/PaymentScreen';
import PlaceOrderScreen from './routes/placeOrderScreen/PlaceOrderScreen';
import OrderInfoScreen from './routes/orderInfoScreen/OrderInfoScreen';
import AdminScreen from './routes/adminScreen/AdminScreen';
import { useSelector } from 'react-redux';
import actions from './store/actions';

function App() {

  const userInfo = useSelector(()=>actions.get('userInfo'))
  const { isAdmin } = userInfo || false
 
  return (

      
    <div className="grid-container">
      <Header/>
      <main className="main">
        <Switch>
        <Route path='/' component={HomeScreen} exact/>
        <Route path='/product/:id' component={ProductScreen}/>
        <Route path='/cart' component={CartScreen}/>
        <Route path='/signin' component={SigninScreen}/>
        <Route path='/register' component={RegisterScreen}/>
        <Route path='/shipping' component={ShippingScreen}/>
        <Route path='/payment' component={PaymentScreen}/>
        <Route path='/placeorder' component={PlaceOrderScreen}/>
        <Route path='/orderinfo' component={OrderInfoScreen}/>
        {isAdmin && <Route path='/admin' component={AdminScreen}/>}
        </Switch>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
