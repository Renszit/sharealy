import { useState } from "react";
import axios from "./axios";
import { selectedSong } from "./redux/actions";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function Search() {
    const dispatch = useDispatch();
    const [search, setSearch] = useState();
    const [result, setResult] = useState();

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            axios
                .post("/api/song", {
                    value: search,
                })
                .then((response) => {
                    console.log(response.data.artist_list);
                    setResult(response.data.artist_list);
                });
        }
    };

    function handleClick(value) {
        dispatch(selectedSong(value));
    }

    return (
        <div>
            <div className="searchContainer">
                <h1>first, find an artist you really like</h1>
                <input
                    onChange={(e) => setSearch(e.target.value)}
                    type="text"
                    placeholder="search here"
                    onKeyDown={handleKeyDown}
                ></input>
                <div className="resultsContainer">
                    {result &&
                        result.map((artist, idx) => (
                            <div className="searchResults" key={idx}>
                                <Link to="/lyrics">
                                    <p
                                        onClick={() =>
                                            handleClick(
                                                artist.artist.artist_name
                                            )
                                        }
                                    >
                                        {artist.artist.artist_name}
                                    </p>
                                </Link>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}
