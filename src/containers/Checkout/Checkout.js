import React, { Component } from 'react';
import {Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactCard from './ContactCard/ContactCard';

class Checkout extends Component {
    // state = {
    //     ingredients : null,
    //     price: 0
    // }

    // commenting as handled by redux now
    // componentWillMount () {
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     let price = 0;
    //     for(let param of query.entries()){
    //         if(param[0]==='price'){
    //             price = param[1];
    //         }else{
    //             ingredients[param[0]] = +param[1];
    //         }
           
    //     }
    //     this.setState({ingredients: ingredients, totalPrice: price});
    // }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-card');
    }

    render() {
        let summary = <Redirect to="/"/>
        if ( this.props.ingr ) {
            summary = (
            <div>
                <CheckoutSummary 
                    ingredients={this.props.ingr}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}/>;
                <Route 
                    path={this.props.match.path + '/contact-card'}
                    component={ContactCard}/>
            </div>
            );
            
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ingr: state.ingredients
    }
}

export default connect(mapStateToProps)(Checkout);