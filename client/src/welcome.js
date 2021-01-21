import { HashRouter, Route } from "react-router-dom";
import App from "./app";

export default function Welcome() {
    return (
        <div>
            <h1> This is the welcome page</h1>
            <h3> i.e. where users (maybe) log in with spotify </h3>
            <HashRouter>
                <div>
                    <p>nothing much here now</p>
                    <Route path="/app" component={App}>
                    </Route>
                </div>
            </HashRouter>
        </div>
    );
}
