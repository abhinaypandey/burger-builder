import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientList = Object.keys(props.ingredients)
        .map(igKey => {
            return <li key={igKey}><span style={{textTransform: 'capitalize'}}>{igKey} : </span>{props.ingredients[igKey]}</li>
        });

    return (
        <Aux>
            <p>You order is </p>
            <ul>
                {ingredientList}
            </ul>
            <p><strong>Total Price : </strong>{props.price}</p>
            <Button btnType="Danger" clicked={props.purchaseCancelled}>Cancel</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>Continue</Button>
        </Aux>
    );

};

export default orderSummary;