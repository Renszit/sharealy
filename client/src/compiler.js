import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "./axios";
import FontPicker from "font-picker-react";
import secrets from "../../server/secrets.json";

export default function Compiler() {
    const image = useSelector((state) => state.url);
    const trackId = useSelector((state) => state.trackId);
    const [lyrics, setLyrics] = useState();
    const [fonts, setFonts] = useState("Poiret One");
    // const [width, setwidth] = useState(500);

    useEffect(() => {
        {
            trackId &&
                axios
                    .post("/api/lyrics", {
                        value: trackId,
                    })
                    .then((response) => {
                        console.log(response);
                        setLyrics(response.data.snippet_body);
                    })
                    .catch((err) =>
                        console.log("error in useEffect compiler", err)
                    );
        }
    }, [trackId]);

    // function handleClick() {}

    return (
        <div>
            <div className="gridFonts">
                <FontPicker
                    apiKey={secrets.GOOGLE_FONTS_KEY}
                    activeFontFamily={fonts}
                    categories="display"
                    onChange={(nextFont) => setFonts(nextFont.family)}
                />
            </div>
            <div className="imageWrapper">
                <img src={image} alt="image"></img>
                <div>
                    <p className="apply-font">{lyrics}</p>
                </div>
            </div>
        </div>
    );
}
