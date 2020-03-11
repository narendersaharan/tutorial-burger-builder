import React from 'react';
import classes from './Order.css';

const order = (props) => {
    let ingredients = [];
    for(let igName in props.ingredients){
        ingredients.push({name: igName, amount: props.ingredients[igName]});
    }
    
    let spannedIngredients = ingredients.map(ingredient => {
        return <span key={ingredient.name} style={{display: 'inline-block', textTransform: 'capitalize', margin: '0 8px', border: '1px solid #ccc'}}>
            {ingredient.name} ({ingredient.amount})
        </span>
    });

    return(
        <div className={classes.Order}>
            <p>Ingredients : {spannedIngredients}</p>
            <p>Price : <strong>{parseFloat(props.price.toFixed(2))}</strong></p>
        </div>
    );
};

export default order;