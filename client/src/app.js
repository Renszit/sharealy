import Search from "./search";
import { BrowserRouter, Route } from "react-router-dom";
import Albums from "./albums";

export default function App() {
    return (
        <BrowserRouter>
            <div>
                <header>
                    <img src="/gummy-cassette.svg"></img>
                    <h1 className="logo">sharealy.</h1>
                    {/* <p>(as in, share-a-lyric with someone...)</p> */}
                </header>
                <Route path="/artist" render={() => <Search />} />
                <Route path="/albums" render={() => <Albums />} />
            </div>
        </BrowserRouter>
    );
}
