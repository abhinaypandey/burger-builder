import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENTS,
        ingredientName: name
    }
};

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENTS,
        ingredientName: name
    }
};

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients,
        error: false
    }
};

export const setIngredientsFailed = () => {
    return {
        type: actionTypes.SET_INGREDIENTS_FAILED,
        error: true
    }

};


export const initIngredients = () => {
    return dispatch => {
        axios.get('https://burger-builder-d38a6.firebaseio.com/ingredients.json')
            .then( response => {
                console.log(response);
                dispatch(setIngredients(response.data));
            })
            .catch(error => {
                dispatch(setIngredientsFailed());
            })
    }
};