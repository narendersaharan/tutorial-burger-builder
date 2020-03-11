import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
    it('should return initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirect: '/'
        });
    });

    it('should set the token when auth is succeded', () => {
        expect(reducer({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirect: '/'
        }, {type: actionTypes.AUTH_SUCCESS, idToken: 'some-id', userId: 'some-uder-id'})).toEqual({
            authRedirect: '/',
            token: 'some-id',
            userId: 'some-uder-id',
            error: null,
            loading: false
        })
    })
});