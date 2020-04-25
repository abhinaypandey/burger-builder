import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.module.css';

const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>Your burger is here </h1>
            <div style={{width: 'auto', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
                
            </div>
            <Button 
                btnType="Danger"
                clicked={props.checkoutCancelled}>Cancel</Button>
            <Button 
                btnType="Success"
                clicked={props.checkoutContinued}>Continue</Button>
            
        </div>
    )
}

export default checkoutSummary;