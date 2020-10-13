import React,{ Component} from 'react';

import Aux from '../../../hoc/Auxillary/Auxillary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
  // This should be functional component doesn't have to be in class
  // For checking improving performance we have done this

  componentDidUpdate(){
    console.log('[OrderSummary--Component Did Update]')
  }

  render(){
    const ingredientSummary = Object.keys(this.props.ingredients)
    .map(igKey => {
      return (<li key = {igKey}>
        <span style = {{textTransform : 'capitalize'}}>
               {igKey}</span> : {this.props.ingredients[igKey]}
              
       </li>);
    });
  
    return(
      <Aux>
      <h3>Your Order</h3> 
      <p>A Delicious Burger with the following Ingredients: </p>
      <ul>
         {ingredientSummary}
      </ul>
      <p> <strong>Total Price : {this.props.price.toFixed(2)}$</strong></p>
      <p>Continue to Checkout?</p>
       <Button 
         clicked = {this.props.purchasedCancelled} 
         btnType = "Danger">CANCEL</Button>
      <Button 
         clicked = {this.props.purchasedContinued}
         btnType = "Success">CONTINUE
         </Button> 
   </Aux>
    )
  }
}
export default OrderSummary;