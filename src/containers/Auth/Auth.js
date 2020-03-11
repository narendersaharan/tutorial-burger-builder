import React, {Component} from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import {Redirect} from 'react-router-dom';
import {updateObject, checkValidity} from '../../shared/utility';

class Auth extends Component{

    state = {
        controls: {
            email:{
                elemetnType: 'input',
                elementConfig:{
                    type: 'email',
                    placeholder: 'Your Name'
                },
                value: '',
                validation:{
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password:{
                elemetnType: 'input',
                elementConfig:{
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation:{
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignUp: true
    }

    componentDidMount(){
        if(!this.props.buildingBurger && this.props.redirectPath !== '/'){
            this.props.onSetAuthRedirect();
        }
    }

    inputChanagedHandler = (event, controlName) =>{
        const updatedControls = updateObject(this.state.controls, {
            [controlName]: updateObject(this.state.controls[controlName], {
                value: event.target.value,
                valid: checkValidity(this.state.controls[controlName].validation, event.target.value),
                touched: true
            })
        })
        this.setState({controls: updatedControls});
    }

    onSubmitHandler = (event) =>{
        event.preventDefault();
        this.props.onAuthStart(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
    }

    onSwitchHandler = () =>{
        this.setState((prevState) => {
            return {isSignUp: !prevState.isSignUp}
        });
    }

    render(){
        const formElementsArray = [];
        for(let key in this.state.controls){
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let form = formElementsArray.map(formElement => {
            return <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChanagedHandler(event, formElement.id)}/>
        })

        if(this.props.loading){
            form = <Spinner />
        }

        let errorMessage = null;

        if(this.props.error){
            errorMessage = <p>{this.props.error}</p>
        }

        let authRedirect = null;
        if(this.props.isAuthenticated){
            authRedirect = <Redirect to={this.props.redirectPath}/>
        }

        return(
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.onSubmitHandler}>
                    {form}
                    <Button btnType='Success'>SUBMIT</Button>
                </form>
                <Button btnType="Danger" clicked={this.onSwitchHandler}>
                    SWITCH TO {this.state.isSignUp ? 'SIGNIN' : 'SIGNUP'}
                </Button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token != null,
        buildingBurger: state.burgerBuilder.building,
        redirectPath: state.auth.authRedirect
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onAuthStart: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        onSetAuthRedirect: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);