import React from 'react';
import classes from './Order.module.css';

const order = (props) => {
    const ingredients = [];
    for(let ingred in props.ingredients){
        ingredients.push({
            name: ingred,
            amount:props.ingredients[ingred]
        });
    }

    const ingredientOutput = ingredients.map(ig =>{
        return <span
                style={{textTransform:'capitalize',
                display: 'ínline-block',
                margine: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
                }}
                key={ig.name}>{ig.name} ({ig.amount})</span>
    })
    return (
        <div className={classes.Order}>
            <p>Ingredients : {ingredientOutput}</p>
            <p><strong>Price :</strong>{props.price}</p>
        </div>
    );
}

export default order;