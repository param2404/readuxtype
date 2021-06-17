import { RootState} from "../../app/store";

export const getToken = (state: RootState) => state.user.token;

export const loginError = (state: RootState) => state.user.errLogin;