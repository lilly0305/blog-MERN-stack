import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

// connectedRouter를 사용하여 리듀서 관련 함수를 불러올 때 'router'라 명명한 함수를 불러온다.
const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
  });

export default createRootReducer;
