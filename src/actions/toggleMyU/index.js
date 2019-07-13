import {
  TOGGLE_MYU
} from "@constants/action-names";
const toggleMyU = (payload) => {
  return {
    type: TOGGLE_MYU,
    payload
  }
}
export {
  toggleMyU
}