import Search from "./search";
import { BrowserRouter, Route } from "react-router-dom";
import Lyrics from "./lyrics";

export default function App() {
    return (
        <BrowserRouter>
            <div>
                <header>
                    <img src="/gummy-cassette.svg"></img>
                    <h1 className="logo">sharealy.</h1>
                </header>
                <Route path="/" render={() => <Search />} />
                <Route path="/lyrics" render={() => <Lyrics />} />
            </div>
        </BrowserRouter>
    );
}
