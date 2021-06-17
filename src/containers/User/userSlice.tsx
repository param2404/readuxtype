import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../../app/store';

export interface UseState {
    isLoggedIn: boolean;
    userData: any;
    errLogin: string;
    token: string;
}

const initialState: UseState = {
    isLoggedIn: false,
    userData: {},
    errLogin:'',
    token: '',
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<any>) => {
            state.isLoggedIn = true;
            state.userData = { email: action.payload.email }
            state.token = "xyz"
            state.errLogin=''
        },
        loginError: (state) => {
            state.isLoggedIn = false;
            state.userData = {}
            state.token = ''
            state.errLogin = 'Invalid Credentials'
        },
    }
})

export const { loginSuccess,loginError } = userSlice.actions;

export const login = (value: any): AppThunk => (
    dispatch,
    getState
) => {
    console.log(value)
    if (value.email === "admin@admin.com" && value.password === "admin") {
        dispatch(loginSuccess(value));
    } else {
        dispatch(loginError())
    }
};


export default userSlice.reducer