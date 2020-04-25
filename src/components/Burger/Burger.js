import React from 'react';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

import classes from './Burger.module.css';

const burger = (props) => {
    let incomingIngredients = Object.keys(props.ingredients)
            .map(igKey => {
                return [...Array(props.ingredients[igKey])].map((_, i)=> {
                    return <BurgerIngredient key={igKey + i} type={igKey}/>;
                });
            })
            .reduce((arr, el) => {
                return arr.concat(el)
            },[]);

            if(incomingIngredients.length === 0){
                incomingIngredients  = <p>Please start adding ingredients to the Burger</p>
            }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {incomingIngredients}
            <BurgerIngredient type="bread-bottom"/>
         
        </div>
    );
};

export default burger;