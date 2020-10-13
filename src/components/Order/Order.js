import React from 'react';

import classes from './Order.css';

const Order = (props) => {
    const ingredients=[];
    for(let ingredientName in props.ingredients){
       ingredients.push({
        name : ingredientName,
        amount : props.ingredients[ingredientName] 
       })
    }
    const ingredientOutput = ingredients.map(ig => {
        return  <span key = {ig.name}
              style = {{
                  textTransform : 'capitalize',
                  margin : '0px 8px',
                  border : '1px solid #ccc',
                  padding : '0px 5px',
                  display : 'inline-block'}}>
              {ig.name} ({ig.amount})</span>
  });

    return (
    <div className = {classes.Order}>
        <p>Ingredients : {ingredientOutput}</p>
        <p>Price : <strong>USD {props.price}</strong></p>
   </div>
    );
}
    
export default Order;