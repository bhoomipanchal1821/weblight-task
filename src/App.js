import React from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import RepositoryList from "./components/RepositoryList";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {

  return (
    <Provider store={store}>
      <div className="App">
        <RepositoryList />
      </div>
    </Provider>
  );
}

export default App;
