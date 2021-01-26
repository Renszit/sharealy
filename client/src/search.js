import { useState } from "react";
import axios from "./axios";
import { selectedArtist } from "./redux/actions";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
// import Input from "@bit/semantic-org.semantic-ui-react.input";

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
                    // console.log(response.data.artist_list);
                    setResult(response.data.artist_list);
                });
        }
    };

    function handleClick(name, id) {
        dispatch(selectedArtist(name, id));
    }

    return (
        <div>
            <div className="container">
                <h1>first, find an artist you really like</h1>
                <input
                    onChange={(e) => setSearch(e.target.value)}
                    type="text"
                    className="inputField"
                    placeholder="search here"
                    onKeyDown={handleKeyDown}
                ></input>

                <div className="container">
                    {result &&
                        result.map((artist, idx) => (
                            <div className="searchResults" key={idx}>
                                <Link to="/ok">
                                    <p
                                        onClick={() =>
                                            handleClick(
                                                artist.artist.artist_name,
                                                artist.artist.artist_id
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
