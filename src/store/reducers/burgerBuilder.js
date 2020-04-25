import React from 'react';

import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        meat: 0,
        cheese: 0
    },
    totalPrice: 4
}

const INGREDIENT_RATES = {
    salad: 5,
    meat: 4,
    cheese: 8,
    bacon: 10
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_RATES[action.ingredientName]
            };
        case actionTypes.REMOVE_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_RATES[action.ingredientName]
            };
        default:
            return state;

    }
    return state;
}

export default reducer;