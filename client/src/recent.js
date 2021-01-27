import { useEffect, useState } from "react";
import axios from "./axios";

export default function RecentSearches() {
    const [recent, setRecent] = useState();

    useEffect(() => {
        {
            !recent &&
                axios.get("/db/recent").then((res) => setRecent(res.data));
        }
    }, [recent]);

    const handleClick = (id) => {
        const shared = "http://localhost:3000/shared/" + id;
        window.location.href = shared;
    };

    return (
        <div>
            <div className="recentContainer">
                <h1 className="recentSharesH1">recent shares</h1>
                {recent &&
                    recent.map((result, idx) => (
                        <div className="recentSearchContainer" key={idx}>
                            <p
                                className="recentLyrics"
                                onClick={() => handleClick(result.id)}
                            >
                                {result.lyrics}
                            </p>
                            <p className="recentArtist">{result.artist}</p>
                        </div>
                    ))}
            </div>
        </div>
    );
}
