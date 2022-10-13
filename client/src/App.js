import "bootstrap/dist/css/bootstrap.min.css";
import MyRouter from "./routes/Router";
import { Provider } from "react-redux";
import store from "./store";

const App = () => {
  return (
    <Provider store={store}>
      {/* <ConnectedRouter history={history}> */}
      <MyRouter />
      {/* </ConnectedRouter> */}
    </Provider>
  );
};

export default App;
