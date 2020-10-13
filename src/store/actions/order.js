import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
     return {
       type : actionTypes.PURCHASE_BURGER_SUCCESS,
       orderId : id,
       orderData : orderData
     };
};

export const purchaseBurgerFail = () => {
  return {
    type : actionTypes.PURCHASE_BURGER_FAIL
  };
};

export const purchaseBurger = (token, orderData) => {
  return dispatch => {
    axios.post( '/orders.json?auth=' +token , orderData )
    .then( response => {
      console.log(response.data.name)
       dispatch(purchaseBurgerSuccess(response.data.name, orderData))
    } )
    .catch( error => {
        dispatch(purchaseBurgerFail(error))
    } );
  };
};

export const purchaseInit = () => {
  return {
    type : actionTypes.PURCHASE_INIT
  };
};

export const fetchOrdersStart = () => {
  return {
    type : actionTypes.FETCH_ORDERS_START
  };
};

export const fetchOrdersFail = (error) => {
  return {
    type : actionTypes.FETCH_ORDERS_FAIL,
    error : error
  }
}
export const fetchOrdersSuccess = (orders) => {
  return {
  type : actionTypes.FETCH_ORDERS_SUCCESS,
  orders : orders
  }
}

export const fetchOrders = (token, userId) => {
  return dispatch => {
    dispatch(fetchOrdersStart());
    const queryParams = '?auth=' + token + '&orderBy="userId"equalTo="'+ userId + '"';
    // axios.get('/orders.json?auth=' + token)
    axios.get('/orders.json' + queryParams)
    .then(res => {
      let fetchedOrders = [];
       for(let key in res.data){
       fetchedOrders.push({
         ...res.data[key],
         id : key
       });
      }
      dispatch(fetchOrdersSuccess(fetchedOrders));
       //this.setState({spinner : false , orders : fetchedOrders})
       })
      .catch(err => {
        dispatch(fetchOrdersFail(err));
      //this.setState({spinner : false}) 
    });
  }
}