import { createAction, props } from '@ngrx/store';

export const loginRequest = createAction(
  '[Auth] Login Request',
  props<{ data: any }>()
);
export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ data: any }>()
);
export const loginFail = createAction(
  '[Auth] Login Fail',
  props<{ data: any }>()
);
export const signUpRequest = createAction(
  '[Auth] signUp Request',
  props<{ data: any }>()
);
export const signUpSuccess = createAction(
  '[Auth] signUp Success',
  props<{ data: any }>()
);
export const signUpFail = createAction(
  '[Auth] signUp Fail',
  props<{ data: any }>()
);
export const logout = createAction('[Auth] logout');
export const clearError = createAction('[Auth] clear error');
