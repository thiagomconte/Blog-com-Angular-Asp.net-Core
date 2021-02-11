import { Action, createReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions/auth.actions';

export interface State {
  email: string;
  token: string;
  isLoggedIn: boolean;
}

export const initialState: State = {
    email: '',
    token: '',
    isLoggedIn: false
}

const _authReducer = createReducer(
    initialState,
    on(AuthActions.authenticateUser, (state, { payload }) => ({
        email: payload.email,
        token: payload.token,
        isLoggedIn: payload.isLoggedIn,
    })),
    on(AuthActions.logoutUser, state => ({
        email: '',
        token: '',
        isLoggedIn: false,
    }),
    )
)

export function authReducer(state: State | undefined, action: Action) {
    return _authReducer(state, action);
  }