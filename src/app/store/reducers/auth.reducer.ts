import { createReducer, on } from '@ngrx/store';
import {
  clearError,
  loginFail,
  loginRequest,
  loginSuccess,
  logout,
  signUpFail,
  signUpRequest,
  signUpSuccess,
} from '../actions/auth.action';

const initialState = {
  userData: null,
  loading: false,
  error: null,
};

const tempAuth = createReducer(
  initialState,
  on(loginRequest, (state) => {
    return {
      ...state,
      userData: null,
      loading: true,
      error: null,
    };
  }),
  on(loginSuccess, (state, { data }) => {
    return {
      ...state,
      userData: {
        ...data,
      },
      loading: false,
    };
  }),
  on(loginFail, (state, { data }) => {
    console.log(data);
    return {
      ...state,
      error: data.error,
      loading: false,
    };
  }),
  on(signUpRequest, (state) => {
    return {
      ...state,
      loading: true,
      error: null,
    };
  }),
  on(signUpSuccess, (state, { data }) => {
    return {
      ...state,
      userData: {
        ...data,
      },
      loading: false,
    };
  }),
  on(signUpFail, (state, { data }) => {
    return {
      ...state,
      loading: false,
      error: data.error,
    };
  }),
  on(logout, (state) => {
    return {
      ...state,
      userData: null,
      loading: false,
      error: null,
    };
  }),
  on(clearError, (state) => {
    return {
      ...state,
      userData: null,
      loading: false,
      error: null,
    };
  })
);

const authReducer = (state: any, action: any) => {
  return tempAuth(state, action);
};

export default authReducer;
