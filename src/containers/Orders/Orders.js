import React, { Component } from 'react';
import Order from '../Orders/Order/Order';
import axios from '../../axios-orders';
import { connect } from 'react-redux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {

    componentDidMount(){
        this.props.onFetchOrders(this.props.stateToken)
    }


    render(){
        let orders = <Spinner />
        if(!this.props.stateLoading){
            orders = (
                <div>
                {this.props.stateOrders.map(order => {
                   return <Order key={order.id} price={+order.price} ingredients={order.ingredients}/>
                })}
            </div>
            )
        }
        return orders;
    }
}

const mapStateToProps = state => {
    return {
        stateOrders: state.orderRed.orders,
        stateLoading: state.orderRed.loading,
        stateToken: state.authRed.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token) => dispatch(actions.fetchOrders(token))
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( withErrorHandler( Orders, axios ) );