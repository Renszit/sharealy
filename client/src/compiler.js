import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "./axios";
import FontPicker from "font-picker-react";
import secrets from "../../server/secrets.json";
import { useDispatch } from "react-redux";
import { renderId } from "./redux/actions";
import Share from "./share";

export default function Compiler() {
    const url = useSelector((state) => state.url);
    const trackId = useSelector((state) => state.trackId);
    const [lyrics, setLyrics] = useState();
    const [fonts, setFonts] = useState("Poiret One");
    const track = useSelector((state) => state.track);
    const artist = useSelector((state) => state.artist);
    const dispatch = useDispatch();
    const [sending, setSending] = useState(false);

    useEffect(() => {
        {
            trackId &&
                axios
                    .post("/api/lyrics", {
                        value: trackId,
                    })
                    .then((response) => {
                        // console.log(response);
                        setLyrics(response.data.snippet_body);
                    })
                    .catch((err) =>
                        console.log("error in useEffect compiler", err)
                    );
        }
    }, [trackId]);

    function handleClick() {
        axios
            .post("/imageToSql", {
                url: url,
                lyrics: lyrics,
                artist: artist,
                fonts: fonts,
            })
            .then((res) => {
                dispatch(renderId(url, lyrics, artist, fonts, res.id));
                setSending(true);
            })
            .catch((err) => console.log(err));
    }

    return (
        <div>
            <div className="container">
                <h1>
                    Awesome, {track} by {artist} is so good.
                </h1>
            </div>
            <div className="gridContainer">
                {!sending && (
                    <button onClick={handleClick}>click here when ready</button>
                )}
                {sending && <Share />}
                {!sending && (
                    <div>
                        <FontPicker
                            apiKey={secrets.GOOGLE_FONTS_KEY}
                            activeFontFamily={fonts}
                            categories="display"
                            onChange={(nextFont) => setFonts(nextFont.family)}
                        />
                    </div>
                )}
                <div className="imageWrapper">
                    <img src={url} alt="image"></img>
                    <p className="apply-font">{lyrics}</p>
                </div>
            </div>
        </div>
    );
}
