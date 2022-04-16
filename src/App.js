import { BrowserRouter, Switch, Route } from "react-router-dom";
import EditNote from "./components/EditNote";
import SearchNote from "./components/SearchNote";

function App() {
    return (
        <>
            <BrowserRouter>
                <Switch>
                    <Route path={"/"} exact>
                        <SearchNote />
                    </Route>
                    <Route path={"/:code"} exact>
                        <EditNote />
                    </Route>
                </Switch>
            </BrowserRouter>
        </>
    );
}

export default App;
