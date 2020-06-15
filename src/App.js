import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Header from "./component/Header";
import StockTable from "./component/StockTable";
import ProductTable from "./component/ProductTable";
import LocationTable from "./component/ProductTable";

function App() {
    return (
        <Provider store={store}>
            <Router>
                <div className="App">
                    <Header />
                    <Switch>
                        <Redirect exact path="/" to="/stock" />
                        <Route exact path="/stock" component={StockTable} />
                        <Route exact path="/product" component={ProductTable} />
                        <Route exact path="/location" component={LocationTable} />
                    </Switch>
                </div>
            </Router>
        </Provider>
    );
}

export default App;
