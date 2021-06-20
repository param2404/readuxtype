import { RootState} from "../../app/store";

export const getToken = (state: RootState) => state.user.token;

export const loginError = (state: RootState) => state.user.errLogin;
export const registerError = (state: RootState) => state.user.errRegister;

export const getUsers = (state: RootState) => state.user.allUsers;
export const getUserData = (state: RootState) => state.user.userData;
export const getUsersOnly = (state: RootState) =>
  state.user.allUsers.filter((u:any) => u.userRole !== 'admin');