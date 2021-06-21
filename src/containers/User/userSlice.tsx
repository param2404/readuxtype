import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../../app/store';
import { getUsers } from './userSelector';

export interface UseState {
  isLoggedIn: boolean;
  userData: any;
  errLogin: string;
  errRegister: string;
  token: string;
  allUsers: any;
}

const initialState: UseState = {
  isLoggedIn: false,
  userData: {},
  errLogin: "",
  errRegister: "",
  token: "",
  allUsers: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUsers: (state, action: PayloadAction<any>) => {
      state.allUsers = action.payload;
    },
    loginSuccess: (state, action: PayloadAction<any>) => {
      state.isLoggedIn = true;
      state.userData = action.payload;
      state.token = "xyz";
      state.errLogin = "";
    },
    loginError: (state) => {
      state.isLoggedIn = false;
      state.userData = {};
      state.token = "";
      state.errLogin = "Invalid Credentials";
    },
    registerSuccess: (state, action: PayloadAction<any>) => {
      state.isLoggedIn = true;
      state.userData = [action.payload];
      state.token = "xyz";
      state.errRegister = "";
      state.allUsers = [...state.allUsers, action.payload];
    },
    registerError: (state) => {
      state.isLoggedIn = false;
      state.userData = {};
      state.token = "";
      state.errRegister = "User Already Exist";
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userData = {};
      state.token = "";
      state.errLogin = "";
    },
    deleteUser: (state, action: PayloadAction<any>) => {
      state.allUsers = state.allUsers.filter(
        (u: any) => u.email !== action.payload
      );
    },
    update: (state, action: PayloadAction<any>) => {
      state.allUsers =state.allUsers.map((user:any) => (user.email === action.payload.email ? { ...user,...action.payload } : user))
      state.userData=[{...state.userData[0] , ...action.payload}]
    },
  },
});

export const { loginSuccess,loginError,addUsers,registerSuccess, registerError,logout, deleteUser,update } = userSlice.actions;

export const login = (value: any): AppThunk => (
    dispatch,
    getState
) => {
    let user = getUsers(getState());
    const result = user.filter((u: any) => u.email === value.email && u.password === value.password)
    if (result && result.length) {
        dispatch(loginSuccess(result));
    } else {
        dispatch(loginError())
    }
};

export const register = (value: any): AppThunk => (dispatch, getState) => {
  let user = getUsers(getState());
  const result = user.filter(
    (u: any) => u.email === value.email
  );
  if (result && result.length) {
    dispatch(registerError());
  } else {
    dispatch(registerSuccess(value));
  }
};




export default userSlice.reducer