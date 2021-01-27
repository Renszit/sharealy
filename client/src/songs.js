import { useSelector } from "react-redux";
import { useState } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { selectedSong } from "./redux/actions";

export default function Songs() {
    const artist = useSelector((state) => state.artist);
    const image = useSelector((state) => state.url);
    const [search, setSearch] = useState();
    const [result, setResult] = useState();
    const dispatch = useDispatch();

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            axios
                .post("/api/song", {
                    value: search,
                    name: artist,
                })
                .then((response) => {
                    console.log(response.data);
                    setResult(response.data);
                });
        }
    };

    function handleClick(track, id) {
        dispatch(selectedSong(track, id));
    }

    return (
        <div>
            <div className="container">
                <p>Cool. what is your favorite song by {artist}?</p>
                <input
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="not sure? press enter!"
                    onKeyDown={handleKeyDown}
                    className="inputField"
                    type="text"
                ></input>
                {result && (
                    <div className="recentContainer">
                        <h1 className="recentSharesH1">search results</h1>
                        {result &&
                            result.map((track, idx) => (
                                <div
                                    key={idx}
                                    onClick={() =>
                                        handleClick(
                                            track.track.track_name,
                                            track.track.track_id
                                        )
                                    }
                                    className="searchResults"
                                >
                                    <Link to="/compiler">
                                        <p>{track.track.track_name}</p>
                                    </Link>
                                </div>
                            ))}
                    </div>
                )}
                <img className="songImage" src={image}></img>
            </div>
        </div>
    );
}
