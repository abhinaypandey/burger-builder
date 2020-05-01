import React, { Component } from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import Order from '../../components/Order/Order';
import classes from './Orders.module.css';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
    componentDidMount () {
        this.props.onFetchOrders(this.props.token);
    }

    orderDeleteHandler = (orderId) => {
        console.log(orderId);
        this.props.onDeleteOrder(orderId);
    }

    render () {
        let orders = <Spinner />;
        if (!this.props.loading ) {
            const deleteRedirect = this.props.deleted ? <Redirect  to="/orders"/> : null; 
            orders = 
                <div>
                    {deleteRedirect}
                    {this.props.orders.map(order => (
                    <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.totalPrice}
                        delete={() => {this.orderDeleteHandler(order.id)}}
                    />
                ))};

                </div>
                
        }
        return (
            <div className={classes.Orders}>
                {orders};
            </div>
        )
        

    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        deleted: state.order.deleted,
        token: state.auth.token
    }
};

const mapDispatchToProps = dispatch  => {
    return {
        onFetchOrders: (token) => dispatch(actions.fetchOrders(token)),
        onDeleteOrder: (orderId) => dispatch(actions.deleteOrder(orderId))
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios));