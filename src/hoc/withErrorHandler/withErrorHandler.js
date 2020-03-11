import React, {Component} from 'react';

import Auxiliary from '../Auxiliary/Auxiliary';
import Modal from '../../components/UI/Modal/Modal';
import axiosInstance from '../../axios-order';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component{
        state = {
            error: null
        }

        componentWillMount(){
            this.reqInterceptor =  axios.interceptors.request.use(request => {
                this.setState({error: null});
                return request;
            });
            
            this.resInterceptor =  axios.interceptors.response.use(response => {
                this.setState({error: null});
                return Promise.resolve(response);
            }, error => {
                this.setState({error: error});
                return Promise.reject(error);
            });
        }

        componentWillUnmount(){
            axiosInstance.interceptors.request.eject(this.reqInterceptor);
            axiosInstance.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({error: null});
        }

         render(){
             return(
                 <Auxiliary>
                     <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
                        { this.state.error ? this.state.error.message : null }
                     </Modal>
                     <WrappedComponent {...this.props}/>
                 </Auxiliary>
             );
         }
    }
};

export default withErrorHandler;