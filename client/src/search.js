import { useState } from "react";
import axios from "./axios";
import { selectedArtist } from "./redux/actions";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function Search() {
    const dispatch = useDispatch();
    const [search, setSearch] = useState();
    const [result, setResult] = useState();

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            axios
                .post("/api/artist", {
                    value: search,
                })
                .then((response) => {
                    setResult(response.data.artist_list);
                });
        }
    };

    function handleClick(value) {
        dispatch(selectedArtist(value));
    }

    return (
        <div>
            <div className="searchContainer">
                <h1>
                    search for the artist you really want to share a song of
                </h1>
                <input
                    onChange={(e) => setSearch(e.target.value)}
                    type="text"
                    placeholder="search here"
                    onKeyDown={handleKeyDown}
                ></input>
                <div className="resultsContainer">
                    {result &&
                        result.map((track, idx) => (
                            <div className="searchResults" key={idx}>
                                <Link to="/albums">
                                    <p
                                        onClick={() =>
                                            handleClick(track.artist.artist_id)
                                        }
                                    >
                                        {track.artist.artist_name}
                                    </p>
                                </Link>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}
