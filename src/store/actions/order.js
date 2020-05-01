import * as actionTypes from '../actions/actionTypes';

import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
};

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
};

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
};

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/order.json?auth='+token,orderData)
            .then(response => {
                dispatch(purchaseBurgerSuccess(response.data.name, orderData));
            })
            .catch(error => {
                dispatch(purchaseBurgerFail(error));
            })
    }
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
};

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
};

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
};

export const fetchOrdersFail = () => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL
    }
};

export const fetchOrders = (token) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        axios.get('/order.json?auth='+token)
            .then(res => {
                const fetchedOrders = [];
                for(let key in res.data){
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(fetchOrdersSuccess(fetchedOrders));
            })
            .catch(error => {
                dispatch(fetchOrdersFail(error));
            });
    }
};

export const deleteOrderStart = () => {
    return {
        type: actionTypes.ORDER_DELETE_START
    }
};

export const deleteOrderSuccess = () => {
    return {
        type: actionTypes.ORDER_DELETE_SUCCESS
    }
};

export const deleteOrderFail = (error) => {
    return {
        type: actionTypes.ORDER_DELETE_FAIL,
        error: error
    }
};

export const deleteOrder = (orderId) => {
    return dispatch => {
        dispatch(deleteOrderStart());
        axios.delete('/order/'+orderId+'.json')
            .then(res => {
                console.log("deleted: "+res);
                dispatch(deleteOrderSuccess());
            })
            .catch(err => {
                dispatch(deleteOrderFail(err));
            })
    }

}