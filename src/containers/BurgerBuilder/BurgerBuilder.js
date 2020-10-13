import React, { Component } from 'react';

import Aux from '../../hoc/Auxillary/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Model/Model';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import PropTypes from 'prop-types';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import ErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import { connect } from 'react-redux';
import * as burgerBuilderAction from '../../store/actions/index.js';
import * as orderAction from '../../store/actions/index';
import * as authAction from '../../store/actions/index';

// const INGREDIENT_PRICE = {
//   salad : 0.5,
//   bacon : 0.7,
//   cheese : 0.5,
//   meat : 8.5,
// }
class BurgerBuilder extends Component {
  state = {
    showOrderSummary : false
  }
    componentDidMount () {
  //   console.log(this.props);
  this.props.onInitIngredients();
  //   axios.get('https://my-react-burger-app-c71e1.firebaseio.com/ingredients.json')
  //   .then(response => {
  //     console.log(response);
  //  this.setState({ingredients : response.data});
  //  }).catch(error => {
  //   this.setState({error : true})
  //  });
};
    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
           .map(igKey => {
            return ingredients[igKey];         
        }).reduce((sum , el) => {
           return sum + el;   
        }, 0);
        // this.setState({purchasable : sum > 0});
        return sum > 0;
    };
  showOrderSummaryHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({showOrderSummary : true});
    }
    else {
      this.props.onSetAuthRedirectPath('/checkout');
      this.props.history.push('/auth');
    }
    };
   // addIngredientHandler = (type) => {
  //      const oldIngredients = this.state.ingredients[type];
  //      const addedIngredients = oldIngredients + 1;
  //      const updatedIngredients = {
  //        ...this.state.ingredients
  //      }
  //      updatedIngredients[type] = addedIngredients;
  //      const priceAdditon = INGREDIENT_PRICE[type];
  //      const oldPrice = this.state.totalPrice;
  //      const newPrice = oldPrice + priceAdditon; 
  //      this.setState({ totalPrice:newPrice , ingredients: updatedIngredients})
  //      this.updatePurchaseState(updatedIngredients);
  // }

  //  removeIngredientHandler = (type) => {
  //   const oldIngredients = this.state.ingredients[type];
  //   if(oldIngredients <=0){
  //     return;
  //   }
  //      const removeIngredients = oldIngredients - 1;
  //      const updatedIngredients = {
  //        ...this.state.ingredients
  //      }
  //      updatedIngredients[type] = removeIngredients;
  //      const priceDeduction = INGREDIENT_PRICE[type];
  //      const oldPrice = this.state.totalPrice;
  //      const newPrice = oldPrice - priceDeduction; 
  //      this.setState({totalPrice:newPrice , ingredients : updatedIngredients})
  //      this.updatePurchaseState(updatedIngredients);
  //  }

   removeBackdropHandler = () => {
     this.setState({showOrderSummary : false});
     this.props.history.push('/');
   }
   continueOrderSummaryHandler = () => {
     //alert('Continue to Order');
     this.props.onPurchaseInit();
     this.props.history.push('/checkout');
   // console.log(this.props)
  //   const queryParams = [];
  //   for (let i in this.state.ingredients){
  //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent                                    (this.state.ingredients[i]));
  //   }
  //    queryParams.push('price=' + this.state.totalPrice)
  //   // queryParams.push('price=' + this.props.price)
  //   const queryString = queryParams.join('&')
  //    this.props.history.push({
  //      pathname : '/checkout',
  //      search : '?' + queryString
  //  })
}
   render(){
     const disabledInfo = {
       ...this.props.ingredientsStore
     }
     for(let key in disabledInfo){
       disabledInfo[key] = disabledInfo[key] <= 0
     }
     let orderSummary = null;

     let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />
     if(this.props.ingredientsStore){
      burger = 
      (
      <Aux>
        {/* <Burger ingredients = {this.state.ingredients}/> */}
            <Burger ingredients = {this.props.ingredientsStore}/>
 
        <BuildControls 
                // ingredientAdded  = {this.addIngredientHandler}
                ingredientAdded = {this.props.onIngredientsAdded}
                // ingredientRemove = {this.removeIngredientHandler}
                ingredientRemove = {this.props.onIngredientsRemove}
                disabled         = {disabledInfo}
                price            = {this.props.price}
                // purchasable      = {this.state.purchasable}
                 purchasable      = {this.updatePurchaseState(this.props.ingredientsStore)}
                showOrderSummary = {this.showOrderSummaryHandler}
                isAuth = {this.props.isAuthenticated}
               />
      </Aux>
      );
             orderSummary = <OrderSummary 
                  //  ingredients = {this.state.ingredients} 
                  ingredients = {this.props.ingredientsStore} 
                   purchasedCancelled = {this.removeBackdropHandler}
                   purchasedContinued = {this.continueOrderSummaryHandler}
                   price = {this.props.price}/>;
    }
    //  if(this.state.spinner){
    //   orderSummary = <Spinner />;
    // }
   return(
       <Aux>
         <Modal showOrderSummary = {this.state.showOrderSummary} removeBackdrop = {this.removeBackdropHandler}>
           {orderSummary}
         </Modal>
        {burger}
       </Aux>
     );
   }
}
    BurgerBuilder.propTypes = {
      type : PropTypes.string.isRequired
    };
const mapStateToProps = state => {
   return {
    ingredientsStore : state.burgerBuilder.ingredients,
    price : state.burgerBuilder.totalPrice,
    error : state.burgerBuilder.error,
    purchased : state.order.purchased,
    isAuthenticated : state.auth.token !== null 
   };
};
const mapDispatchToProps = dispatch => {
   return {
     onIngredientsAdded:(ingName)=>dispatch(
       burgerBuilderAction.ingredientAdded(ingName)),
 
     onIngredientsRemove : (ingName) => dispatch(
      burgerBuilderAction.ingredientRemove(ingName)),

    onInitIngredients : (ingredients) => dispatch(
      burgerBuilderAction.initIngredients(ingredients)),

    onPurchaseInit : () => dispatch (orderAction.purchaseInit()),
    
    onSetAuthRedirectPath : (path) => dispatch(authAction.setAuthRedirectPath(path))
   }
}
export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(BurgerBuilder ,axios));