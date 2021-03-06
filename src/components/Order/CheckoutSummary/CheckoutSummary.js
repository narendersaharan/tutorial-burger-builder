import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

const checkoutSummary = (props) => (
    <div className={classes.CheckoutSummary}>
        <h1>We hope it test well!!</h1>
        <div style={{width: '300px', margin: 'auto'}}>
            <Burger ingredients={props.ingredients}/>
        </div>
        <Button btnType="Danger" clicked={props.canceled}>CANCEL</Button>
        <Button btnType="Success" clicked={props.continued}>CONTINUE</Button>
    </div>
);

export default checkoutSummary;