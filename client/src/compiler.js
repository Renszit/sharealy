import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "./axios";

export default function Compiler() {
    const artist = useSelector((state) => state.artist);
    const image = useSelector((state) => state.url);
    const track = useSelector((state) => state.track);
    const trackId = useSelector((state) => state.trackId);
    const [lyrics, setLyrics] = useState();

    useEffect(() => {
        axios
            .post("/api/lyrics", {
                value: trackId,
            })
            .then((response) => {
                console.log(response);
                setLyrics(response.data.snippet_body);
            })
            .catch((err) => console.log("error in useEffect", err));
    }, [trackId]);

    return (
        <div>
            <div className="container">
                <h1>
                    Awesome, now add a lyric of {track} to this image of{" "}
                    {artist}!
                </h1>
                <p>click here when ready</p>
            </div>
            <div className="gridContainer">
                <div className="gridFonts">test</div>
                <img className="gridImage" src={image} alt="image"></img>
                <div className="gridLyrics">
                    <p className="lyrics">{lyrics}</p> 
                </div>
            </div>
        </div>
    );
}
