// import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FontPicker from "font-picker-react";
import secrets from "../../server/secrets.json";
import axios from "./axios";

export default function Render() {
    let params = useParams();
    const [id, setId] = useState();
    const [lyrics, setLyrics] = useState();
    const [fonts, setFonts] = useState("Poiret One");
    const [url, setUrl] = useState();
    const [artist, setArtist] = useState();

    useEffect(() => {
        {
            !id &&
                axios
                    .get("/app/shared/" + params.id)
                    .then((res) => {
                        console.log("response", res);
                        const { url, lyrics, artist, fonts } = res.data;
                        setUrl(url);
                        setLyrics(lyrics);
                        setArtist(artist);
                        setFonts(fonts);
                        setId(params.id);
                    })
                    .catch((err) =>
                        console.log("getting image in render failed", err)
                    );
        }
    }, [id]);

    if (!url || !lyrics || !artist || !fonts || !id) {
        return null;
    }

    return (
        <div>
            <FontPicker
                apiKey={secrets.GOOGLE_FONTS_KEY}
                activeFontFamily={fonts}
                categories="display"
                onChange={(nextFont) => setFonts(nextFont.family)}
            />
            <div className="container">
                <h1>Someone thought you might like this song by {artist}</h1>
                <div className="imageWrapper">
                    <img src={url} alt="image"></img>
                    <p className="apply-font">{lyrics}</p>
                </div>
            </div>
        </div>
    );
}
