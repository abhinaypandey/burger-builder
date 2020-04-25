import React from 'react';

import * as actionTypes from '../actions/actionTypes';
import { arrowFunctionExpression } from '@babel/types';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
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
        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat
                },
                error: false
            }
        case actionTypes.SET_INGREDIENTS_FAILED:
            return {
                error: true
            }
        default:
            return state;

    }
    return state;
}

export default reducer;