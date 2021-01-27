// import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FontPicker from "font-picker-react";
import secrets from "../../server/secrets.json";
import axios from "./axios";
// import {Link} from
export default function Render() {
    let params = useParams();
    const [id, setId] = useState();
    const [lyrics, setLyrics] = useState();
    const [fonts, setFonts] = useState("Poiret One");
    const [url, setUrl] = useState();
    const [artist, setArtist] = useState();
    const [youtube, setYoutube] = useState();
    const [track, setTrack] = useState();

    useEffect(() => {
        {
            !id &&
                axios
                    .get("/app/shared/" + params.id)
                    .then((res) => {
                        console.log("response", res);
                        const {
                            url,
                            track,
                            lyrics,
                            artist,
                            fonts,
                            youtube,
                        } = res.data;
                        setUrl(url);
                        setTrack(track);
                        setLyrics(lyrics);
                        setArtist(artist);
                        setFonts(fonts);
                        setYoutube(youtube);
                        setId(params.id);
                    })
                    .catch((err) =>
                        console.log("getting image in render failed", err)
                    );
        }
    }, [id]);

    if (!url || !lyrics || !track || !youtube || !artist || !fonts || !id) {
        return null;
    }

    return (
        <div>
            <div className="fontPickerContainer">
                <FontPicker
                    apiKey={secrets.GOOGLE_FONTS_KEY}
                    activeFontFamily={fonts}
                    families="[Roboto, Lobster, Poiret One,Dosis,Alfa slab, Abril Fatface,Staatliches, Faster One,Zilla Slab Highlight,Barrio,Jolly Lodger,Creepster]"
                    onChange={(nextFont) => setFonts(nextFont.family)}
                />
            </div>

            <div className="container">
                <h1>
                    You might like {track} by {artist}
                </h1>
                <div className="imageWrapper">
                    <a href={youtube}>
                        <img
                            className="renderImage"
                            src={url}
                            alt="image"
                        ></img>
                    </a>
                    <p className="apply-font">{lyrics}</p>
                </div>
            </div>
        </div>
    );
}
