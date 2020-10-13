import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  orders : [],
  spinner : false,
  purchased: false
}

const purchaseInit = (state, action) => {
  return updateObject(state, { purchased : false})
};

const purchaseBurgerStart = (action,state) => {
  return updateObject(state, { spinner : true})
};

const purchaseBurgerSuccess = (state, action ) => {
  const newOrder =   updateObject(action.orderData, { id : action.orderId })
  return updateObject(state, {spinner : false,
                               purchased: true,
                               orders : state.orders.concat(newOrder)})
};

const purchaseBurgerFail = (state, action ) => {
  return  updateObject(state, { spinner : false} )
};

const fetchOrdersStart = (state,action) => {
  return updateObject(state, { spinner : true} )
};


const fetchOrdersSuccess = (state,action) => {
  return updateObject(state, { orders : action.orders, spinner : false  } )
};


const fetchOrdersFail = (state,action) => {
  return  updateObject(state, { spinner : false} )
}



const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.PURCHASE_INIT: return purchaseInit(state,action);
      // return {
      //   ...state,
      //   purchased : false
      // }
    case actionTypes.PURCHASE_BURGER_START: return purchaseBurgerStart(state, action)    
  //     return {
  //      ...state,
  //      spinner : true
  //  }

    case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action )  
      // const newOrder = {
      //   ...action.orderData,
      //   id : action.orderId
      // }
      // return {
      //   ...state,
      //   spinner : false,
      //   purchased: true,
      //   orders : state.orders.concat(newOrder)
      // };
    case actionTypes.PURCHASE_BURGER_FAIL:return purchaseBurgerFail(state, action);
     
      // return {
      //   ...state,
      //   spinner : false
      // };

    case actionTypes.FETCH_ORDERS_START: return fetchOrdersStart(state, action)
       // return {
      //   ...state,
      //   spinner:true
      // }  

     case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action);
     
      //  return {
      //    ...state,
      //    orders : action.orders,
      //      spinner : false  
    
      //  } ;

      case actionTypes.FETCH_ORDERS_FAIL : return fetchOrdersFail(state, action)
            // return {
        //   ...state,
        //   spinner : false,
        //   
        // }; 
      default : 
        return state  ;
  }
}

export default reducer;
