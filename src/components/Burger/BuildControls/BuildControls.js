import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad'},
    { label: 'Bacon', type: 'bacon'},
    { label: 'Chesse', type: 'cheese'},
    { label: 'Meat', type: 'meat'}
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>
            Current Price: <strong> {props.price.toFixed(2)} </strong>
        </p>
        {
            controls.map(ctrl => (
                <BuildControl 
                    added={() => props.ingredientAdded(ctrl.type)}
                    removed={() => props.ingredientRemoved(ctrl.type)}
                    disabled={props.disabledInfo[ctrl.type]} 
                    key={ctrl.label} 
                    label={ctrl.label}/>
            ))
        }
        <button 
            className={classes.OrderButton} 
            onClick={props.ordered}
            disabled={ !props.purchasable}>{ props.isAuth ? 'ORDER NOW' : 'Sign Up to Order'}</button>
    </div>
);

export default buildControls;