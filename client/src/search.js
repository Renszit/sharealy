import { useState } from "react";
import axios from "./axios";

export default function Search() {
    const [search, setSearch] = useState("");
    const [result, setResult] = useState([]);

    const handleKeyDown = (e) => {
        console.log(search);
        if (e.key === "Enter") {
            console.log("sending this to axios: ", search);
            const { data } = axios.post("/api/spotify", search);
            console.log("data?", data);
            // return (e.target.value = "");
        }
    };

    return (
        <div>
            <h1>search:</h1>
            <input
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="search here"
                onKeyDown={handleKeyDown}
            ></input>
            <h2>Results:</h2>
        </div>
    );
}
