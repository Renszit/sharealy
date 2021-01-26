import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "./axios";
import FontPicker from "font-picker-react";
import secrets from "../../server/secrets.json";
import { useDispatch } from "react-redux";
import { renderId } from "./redux/actions";
import {
    TwitterShareButton,
    TwitterIcon,
    FacebookShareButton,
    FacebookIcon,
    WhatsappShareButton,
    WhatsappIcon,
    EmailShareButton,
    EmailIcon,
} from "react-share";

export default function Compiler() {
    const url = useSelector((state) => state.url);
    const trackId = useSelector((state) => state.trackId);
    const [lyrics, setLyrics] = useState();
    const [fonts, setFonts] = useState("Poiret One");
    const track = useSelector((state) => state.track);
    const artist = useSelector((state) => state.artist);
    const dispatch = useDispatch();
    const [sqlId, setsqlId] = useState();
    const [sending, setSending] = useState(false);
    const shareUrl = "localhost:3000/shared/" + sqlId;
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
                dispatch(renderId(url, lyrics, artist, fonts, res.data.id));
                setsqlId(res.data.id);
                setSending(true);
            })
            .catch((err) => console.log(err));
    }
    //sharesubject/message:
    let emailBody = "Someone was sure you would like this song by " + artist;
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
                {sending && (
                    <div className="containerHorizontal">
                        <TwitterShareButton
                            title={lyrics}
                            via="sharealy"
                            url={shareUrl}
                        >
                            <TwitterIcon round size={32} />
                        </TwitterShareButton>
                        <FacebookShareButton
                            hashtag={artist}
                            quote={lyrics}
                            url={shareUrl}
                        >
                            <FacebookIcon round size={32} />
                        </FacebookShareButton>
                        <WhatsappShareButton title={lyrics} url={shareUrl}>
                            <WhatsappIcon round size={32} />
                        </WhatsappShareButton>
                        <EmailShareButton
                            body={emailBody}
                            subject={lyrics}
                            url={shareUrl}
                        >
                            <EmailIcon round size={32} />
                        </EmailShareButton>
                    </div>
                )}
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
