import React, { Component } from 'react'

import CheckoutSummary from '../../components/Order/CheckoutSummary.js';
import {Route, Redirect} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux';

class Checkout extends Component {
  // state = {
  //   ingredients : null,
  //   price : 0 
  // }

  // componentWillMount () {
  //   const query = new URLSearchParams(this.props.location.search);
  //   const ingredients = {};
  //   let price = 0;
  //   for (let param of query.entries()){
  //     if(param[0] === 'price'){
  //       price = param[1];
  //     }
  //     else{
  //        // [salad , 1]
  //       ingredients[param[0]] = +param[1];
  //     }
     
    
  //   }
  //   this.setState({ingredients : ingredients , totalPrice : price});
    
  // }
  cancelCheckoutHandler = () => {
   this.props.history.goBack();
  }
  continueCheckoutHandler = () => {
   this.props.history.replace('/Checkout/contact-data');
  }
  render() {
    let summary = <Redirect to = '/'/>
    if(this.props.ingredientsStore){
      const purchasedRedirect = this.props.purchased ? <Redirect to ='/'/> : null
      summary = (
        <div>
          {purchasedRedirect}
        <CheckoutSummary 
           ingredients={this.props.ingredientsStore}
           cancelCheckout = {this.cancelCheckoutHandler}
           continueCheckout = {this.continueCheckoutHandler}/>
        <Route 
               path = {this.props.match.path + '/contact-data'}
               component = {ContactData} 
              //  render ={(props)=>( <ContactData 
              //                           ingredients = {this.state.ingredients}  price = {this.state.totalPrice} 
              //                           {...props}
          />
        )} />
      </div>
      );
    }
    return summary;
  }

}
const mapStatetoProps = state => {
   return {
     ingredientsStore : state.burgerBuilder.ingredients,
     purchased : state.order.purchased
   }
}
export default connect(mapStatetoProps)(Checkout);