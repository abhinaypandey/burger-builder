import React, {Component} from 'react';
import {connect} from 'react-redux';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as burgerBuilderActions from '../../store/actions/index'; // index can be omitted

import axiosInstance from '../../axios-orders';

class BurgerBuilder extends Component {
    state = {
        ingredients :{
            salad :0,
            bacon :0,
            cheese :0,
            meat :0
        },
        totalPrice: 10,
        purchasable: false,
        purchasing: false,
        loading:false
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

    purchageContinueHandler = () => {
        this.props.history.push('/checkout');
        const queryParams = [];
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i)+ '='+ encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price='+this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            path: '/checkout',
            search: '?'+queryString
        });

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

        let orderSummary = <OrderSummary 
            ingredients={this.props.ingr}
            price={this.props.price}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchageContinueHandler}>
        </OrderSummary>;

        if(this.state.loading){
            orderSummary = <Spinner/>
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                <Burger ingredients={this.props.ingr}/>
                <BuildControls 
                    ingredientAdded={this.props.onIngrAdded} 
                    ingredientRemoved={this.props.onIngrRemoved}
                    disabled={disabledInfo}
                    price={this.props.price}
                    purchasable={this.updatePurchaseState(this.props.ingr)}
                    ordered={this.purchaseHandler}/>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingr: state.ingredients,
        price: state.totalPrice
    }  
}

const mapDispatchToProps = dispatch => {
    return {
        onIngrAdded: (ingrName) => dispatch(burgerBuilderActions.addIngredient(ingrName)),
        onIngrRemoved: (ingrName) => dispatch(burgerBuilderActions.removeIngredient(ingrName))
    };
}

 export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axiosInstance));