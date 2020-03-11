import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import axiosInstance from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionCreators from '../../store/actions/index';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component{
    componentDidMount(){
        this.props.onLoadOrders(this.props.token, this.props.userId);
    }

    render(){
        let orders = null;
        if(this.props.loading){
            orders = <Spinner />;
        }else{
            orders = this.props.orders.map(order => {
                return <Order key={order.id} ingredients={order.ingredients} price={order.price}/>
            });
        }

        return(
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        onLoadOrders: (token, userId) => dispatch(actionCreators.loadOrders(token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axiosInstance));