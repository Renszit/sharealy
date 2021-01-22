import { useState } from "react";
import axios from "./axios";
// import secrets from "./secrets";
// const lyricsFinder = require("lyricsFinder");

export default function Search() {
    const [search, setSearch] = useState();
    const [result, setResult] = useState([]);
    // const [lyricSearch, setLyricSearch] = useState();

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            axios
                .post("/api/lyrics", {
                    value: search,
                })
                .then((response) => {
                    setResult(response);
                    // console.log("response api request cline", response)
                });
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
            <div className="resultsContainer">
                {result &&
                    result.map((song, idx) => (
                        <div className="searchResults" key={idx}>
                            <img src={song.cover}></img>
                            <p>artist: {song.artist}</p>
                            <p>show me more images of this artist</p>

                            <p>song: {song.track}</p>
                            <p>show me the lyrics to this song</p>
                        </div>
                    ))}
            </div>
        </div>
    );
}
