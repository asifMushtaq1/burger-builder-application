import * as actionTypes from '../actions/actionTypes'; 

import {updateObject} from '../../shared/utility'; 

const initialState = {
  ingredients : null,
  totalPrice : 4,
  error : false,
  building : false
}

const INGREDIENT_PRICE = {
  salad : 0.5,
  bacon : 0.7,
  cheese : 0.5,
  meat : 8.5,
}
const ingredientsAdded = (state, action) => {
  const updatedIngredient = {[action.ingredientName] : state.ingredients[action.ingredientName] + 1}
  const updatedIngredients = updateObject(state.ingredients,updatedIngredient )
  
  const updatedState = {
    ingredients : updatedIngredients,
    totalPrice : state.totalPrice + INGREDIENT_PRICE[action.ingredientName],
    building : true
  }
  return updateObject(state, updatedState);
};

const removeIngredients = (state, action) => {
  const updatedIng = {[action.ingredientName] : state.ingredients[action.ingredientName] - 1}
  const updatedIngs = updateObject(state.ingredients,updatedIng )
  
  const updatedSt = {
    ingredients : updatedIngs,
    totalPrice : state.totalPrice - INGREDIENT_PRICE[action.ingredientName],
    building : true
  }
  return updateObject(state, updatedSt);
};

const setIngredients = (state, action) => {
  return updateObject(state, { 
    ingredients : {            
       salad : action.ingredients.salad, 
        bacon : action.ingredients.bacon,
       cheese : action.ingredients.cheese,
       meat : action.ingredients.meat
     },
       totalPrice : 4, 
       error : false,
       building : false
     });
}

const fetchIngredientsFailed = (state, action) => {
  return updateObject(state, { error : true});
}

const reducer = (state = initialState , action) =>  {
  switch (action.type) {
    case actionTypes.INGREDIENT_ADDED:return  ingredientsAdded(state,action);
    
      // return {
      //   ...state,
      //   ingredients : {
      //     ...state.ingredients,
      //   [action.ingredientName] : state.ingredients[action.ingredientName] + 1
      //   },
      //   totalPrice : state.totalPrice + INGREDIENT_PRICE[action.ingredientName]
      // };
      case actionTypes.INGREDIENT_REMOVE:return removeIngredients(state,action);
         
      // return updateObject(state, updatedState)
      //     return {
      //       ...state,
      //       ingredients : {
      //         ...state.ingredients,
      //       [action.ingredientName] : state.ingredients[action.ingredientName] - 1
      //       },
      //       totalPrice : state.totalPrice - INGREDIENT_PRICE[action.ingredientName]
      //  };

       case actionTypes.SET_INGREDIENTS :return setIngredients(state,action);
      //  return {
      //    ...state,
      //   //  ingredients:action.ingredients,
      //   ingredients : {             // only for maintaining the position in UI
      //     salad : action.ingredients.salad, 
      //     bacon : action.ingredients.bacon,
      //     cheese : action.ingredients.cheese,
      //     meat : action.ingredients.meat
      //   },
      //   totalPrice : 4,
      // error : false
      //  };

       case actionTypes.FETCH_INGREDIENTS_FAILED:return fetchIngredientsFailed(state,action);
      
      //  
     
       default:
         return state;
      }        
};
export default reducer;