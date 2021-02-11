import { createAction, props } from '@ngrx/store';
import {Auth} from '../../models/auth';


export const authenticateUser = createAction('[Login Component] Authtenticate User', props<{payload: Auth}>());
export const logoutUser = createAction('[Navbar Component] Logout User');