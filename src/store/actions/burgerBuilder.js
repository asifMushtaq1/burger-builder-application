import * as actionTypes from '../actions/actionTypes';
import axios from '../../axios-orders';

export const ingredientAdded = (name) => {
  return {
    type : actionTypes.INGREDIENT_ADDED,
    ingredientName : name
  };
};

export const ingredientRemove = (name) => {
  return {
    type : actionTypes.INGREDIENT_REMOVE,
    ingredientName : name
  };
};

export const fetchIngredientsFailed = () => {
  return {
    type : actionTypes.FETCH_INGREDIENTS_FAILED
  }
};

export const setIngredients = (ingredients) => {
  return {
    type : actionTypes.SET_INGREDIENTS,
    ingredients : ingredients
  }
};

export const initIngredients = () => {
  return dispatch => {
    axios.get('https://my-react-burger-app-c71e1.firebaseio.com/ingredients.json')
    .then(response => {
       dispatch(setIngredients(response.data))
   }).catch(error => {
       dispatch(fetchIngredientsFailed())
   });
  }
} 

