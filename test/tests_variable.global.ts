export interface GlobalState {
  refreshToken: string;
  accessToken: string;
}

export const globalState: GlobalState = {
  refreshToken: "",
  accessToken: "",
};
