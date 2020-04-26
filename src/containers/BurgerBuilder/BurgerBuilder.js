import React, {Component} from 'react';
import {connect} from 'react-redux';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index'; // index can be omitted

import axiosInstance from '../../axios-orders';

class BurgerBuilder extends Component {
    state = {
        loading: false,
        error: false 
    }

    componentDidMount () {
        this.props.onInitIngredients();
    }

    updatePurchaseState = (ingredient) => {
        const tSum = Object.keys(ingredient)
            .map(igKey => {
                return ingredient[igKey];
            })
            .reduce((sum,el) => {
                return sum + el;
            }, 0);

            return tSum > 0 ;
    }

    purchaseHandler = () => {
        this.setState({purchasing:true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing:false});
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
        // const queryParams = [];
        // for(let i in this.state.ingredients){
        //     queryParams.push(encodeURIComponent(i)+ '='+ encodeURIComponent(this.state.ingredients[i]));
        // }
        // queryParams.push('price='+this.state.totalPrice);
        // const queryString = queryParams.join('&');
        // this.props.history.push({
        //     path: '/checkout',
        //     search: '?'+queryString
        // });

    }

    // addIngredientHandler = (type) => {
    //     //calculate the increase in ingredient
    //     const oldCount = this.state.ingredients[type];
    //     const newCount = oldCount + 1;
    //     const newIngredients = {
    //         ...this.state.ingredients
    //     }
    //     newIngredients[type] = newCount;
        
    //     //calculate price increase
    //     const unitPrice = INGREDIENT_RATES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + unitPrice;
    //     this.setState({totalPrice: newPrice, ingredients: newIngredients});
    //     this.updatePurchaseState(newIngredients);

    // }

    // removeIngredientHandler = (type) => {
    //     //calculate the decrease in ingredient
    //     const oldCount = this.state.ingredients[type];
    //     if(oldCount <= 0){
    //         return ;
    //     }
    //     const newCount = oldCount - 1;
    //     const newIngredients = {
    //         ...this.state.ingredients
    //     }
    //     newIngredients[type] = newCount;
        
    //     //calculate price decrease
    //     const unitPrice = INGREDIENT_RATES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - unitPrice;
    //     this.setState({totalPrice: newPrice, ingredients: newIngredients});
    //     this.updatePurchaseState(newIngredients);
    // }

    render(){
        const disabledInfo = {
            ...this.props.ingr
        }

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

        if ( this.props.ingr ) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingr} />
                    <BuildControls
                        ingredientAdded={this.props.onIngrAdded}
                        ingredientRemoved={this.props.onIngrRemoved}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseState(this.props.ingr)}
                        ordered={this.purchaseHandler}
                        price={this.props.price} />
                </Aux>
            );
            orderSummary = <OrderSummary
                ingredients={this.props.ingr}
                price={this.props.price}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler} />;
        }
        // {salad: true, meat: false, ...}
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingr: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }  
}

const mapDispatchToProps = dispatch => {
    return {
        onIngrAdded: (ingrName) => dispatch(actions.addIngredient(ingrName)),
        onIngrRemoved: (ingrName) => dispatch(actions.removeIngredient(ingrName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit())
    };
}

 export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axiosInstance));