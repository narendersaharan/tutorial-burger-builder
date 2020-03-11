import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
}

const INGREDIENTS_PRICES = {
    salad: 0.2,
    cheese: 0.3,
    meat: 0.7,
    bacon: 0.5
}

const addIngredient = (state, action) =>{
    const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1}
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient)
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredientName],
        building: true
    }
    return updateObject(state.ingredients, updatedState);
}

const removeIngredient = (state, action) =>{
    const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1}
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient)
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredientName],
        building: true
    }
    return updateObject(state.ingredients, updatedState);
}

const setIngredients = (state, action) => {
    const updateProperties = {
        ingredients: action.ingredients,
        totalPrice: 4,
        error: false,
        building: false
    }
    return updateObject(state, updateProperties);
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_INGREDIENT:
            return addIngredient(state, action)
        case actionTypes.REMOVE_INGREDIENT:
            return removeIngredient(state, action)
        case actionTypes.SET_INGREDIENTS:
            return setIngredients(state, action)
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return updateObject(state, { error: false })
        default:
            return state;
    }
}

export default reducer;