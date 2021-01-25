import { useSelector } from "react-redux";
import FontPicker from "font-picker-react";
import secrets from "../../server/secrets.json";

export default function Render() {
    // const id = useSelector((state) => state.renderId);
    const lyric = useSelector((state) => state.renderLyrics);
    const fonts = useSelector((state) => state.renderFonts);
    const url = useSelector((state) => state.renderUrl);
    const artist = useSelector((state) => state.renderArtist);

    //on page load: useEffect, id -> render.
    // uit de server het image + font etc.

    return (
        <div>
            {/* DIT NOG OPLOSSEN. */}
            <FontPicker
                apiKey={secrets.GOOGLE_FONTS_KEY}
                activeFontFamily={fonts}
                categories="display"
            />
            <div className="container">
                <h1>{artist}</h1>
                <div className="imageWrapper">
                    <img src={url} alt="image"></img>
                    <p className="apply-font">{lyric}</p>
                </div>
            </div>
        </div>
    );
}
