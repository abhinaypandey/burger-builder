import React, {Component} from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactCard.module.css';
import axiosInstance from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';

import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

class ContactCard extends Component {
    state = {
        orderForm: {
                name: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your name',
                    },
                    value: '',
                },
                street: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Street',
                    },
                    value: '',
                },
                zip: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Zipcode',
                    },
                    value: '',
                },
                country: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Country',
                    },
                    value: '',
                },
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Email',
                    },
                    value: '',
                },
                deliveryMethod: {
                    elementType: 'select',
                    elementConfig: {
                        options: [
                            {value: 'fastest', displayValue: 'Fastest'},
                            {value: 'cheapest', displayValue: 'Cheapest'}
                        ]
                    },
                    value: 'cheapest',
                },

        }
    }

    orderHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let formElementId in this.state.orderForm) {
            formData[formElementId] = this.state.orderForm[formElementId].value;
        }
        const order = {
            ingredients: this.props.ingr,
            totalPrice: this.props.price,
            orderData: formData
        }

        this.props.onOrderBurger(order);
    }

    inputChangeHandler = (event, elementIdentifier) => {
        const updatedForm = {...this.state.orderForm};

        const updatedElement = {...updatedForm[elementIdentifier]};
        updatedElement.value = event.target.value;

        updatedForm[elementIdentifier] = updatedElement;
        this.setState({orderForm:updatedForm});

    }
    render () {
        const formElements = [];
        for (let key in this.state.orderForm) {
            formElements.push({
                id: key,
                config: this.state.orderForm[key],

            });
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                
                {formElements.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType} 
                        elementConfig={formElement.config.elementConfig}  
                        value={formElement.config.value} 
                        changed={(event) => this.inputChangeHandler(event,formElement.id)}/>
                ))}
                <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
            </form>
        );

        if(this.props.loading){
            form = <Spinner/>
        }
        return (
            <div className={classes.ContactCard}>
                <h4>Enter your contact details</h4>
                {form}
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        ingr: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading 
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData))
    }
    
};

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactCard,axiosInstance));