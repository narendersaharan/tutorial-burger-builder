import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    let transformeIngredients = Object.keys(props.ingredients).map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_, i) => {
            return <BurgerIngredient key={igKey + i} type={igKey}/>
        });
    }).reduce((prevValue, currentValue) => {
        return prevValue.concat(currentValue)
    }, []);

    if(transformeIngredients.length ===0){
        transformeIngredients = <p>Please start adding Ingredients</p>
    }

    return (
        <div className={ classes.Burger}>
            <BurgerIngredient type='bread-top'/>
            {transformeIngredients}
            <BurgerIngredient type='bread-bottom'/>
        </div>
    );
}

export default burger;