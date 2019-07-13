import { FETCH_LOGOUT } from "@constants/action-names";

const logout = () => {
  return {
    type: FETCH_LOGOUT,
    payload: {
    }
  }
}

export default logout