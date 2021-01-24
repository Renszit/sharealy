import Search from "./search";
import { BrowserRouter, Route } from "react-router-dom";
import Ok from "./ok";
import Songs from "./songs";

export default function App() {
    return (
        <BrowserRouter>
            <div>
                <header>
                    <img src="/gummy-cassette.svg"></img>
                    <h1 className="logo">sharealy.</h1>
                </header>
                <Route exact path="/" render={() => <Search />} />
                <Route path="/ok" render={() => <Ok />} />
                <Route path="/songs" render={() => <Songs />} />
            </div>
        </BrowserRouter>
    );
}
