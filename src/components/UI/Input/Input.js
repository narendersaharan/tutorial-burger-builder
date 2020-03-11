import React from 'react';
import classes from './Input.css';

const input = (props) => {
    let inputEl = null;
    let inputClasses = [classes.InputElement];
    let validationError = null;

    if(props.invalid && props.shouldValidate && props.touched){
        inputClasses.push(classes.Invalid);
        validationError = <p className={classes.ValidationError}>Please enter a valid value!!!</p>
    }

    switch(props.elementType){
        case 'input':
            inputEl = <input 
                className={inputClasses.join(' ')}
                value={props.value}
                {...props.elementConfig} onChange={props.changed}/>;
            break;
        case 'textarea':
            inputEl = <textarea
                className={inputClasses.join(' ')}
                value={props.value}
                {...props.elementConfig} onChange={props.changed}/>;
            break;
        case 'select':
            inputEl = (
                <select className={inputClasses.join(' ')} value={props.value} onChange={props.changed}>
                  {
                      props.elementConfig.options.map(option => {
                          return <option key={option.value} value={option.value}>{option.displayValue}</option>
                      })
                  }
                </select>
            );
            break;
        default:
            inputEl = <input 
                className={inputClasses.join(' ')}
                value={props.value}
                {...props.elementConfig} onChange={props.changed}/>;
            break;
        
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputEl}
            {validationError}
        </div>
    );
};

export default input;