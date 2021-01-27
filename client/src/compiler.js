import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "./axios";
import FontPicker from "font-picker-react";
import secrets from "../../server/secrets.json";
import { useDispatch } from "react-redux";
import { renderId } from "./redux/actions";
import ReactPlayer from "react-player";
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
    const [youtubeVid, setYoutube] = useState();
    // const arrowRef = useRef();

    const updateYoutubeVideos = (array) => {
        for (let i = 0; i < array.length; i++) {
            if (array[i].type !== "video") {
                array.splice(i, 1);
            }
        }
        setYoutube(array);
    };

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

    //hier eerst youtube api. daarna axios post2.
    function handleClick() {
        axios
            .post("/api/youtube", { track: track, artist: artist })
            .then((res) => {
                let sqlLink = res.data[1].link;
                // console.log(res.data);
                updateYoutubeVideos(res.data);

                axios
                    .post("/imageToSql", {
                        url: url,
                        track: track,
                        lyrics: lyrics,
                        artist: artist,
                        fonts: fonts,
                        youtube: sqlLink,
                    })
                    .then((res) => {
                        // console.log(res);
                        dispatch(
                            renderId(url, lyrics, artist, fonts, res.data.id)
                        );
                        // arrowRef.scrollIntoVIew({ behavior: "smooth" });
                        setsqlId(res.data.id);
                        setSending(true);
                    })
                    .catch((err) => console.log("error in posting image", err));
            })
            .catch((err) => console.log("error in getting youtube", err));
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
                    <button className="takeItAway" onClick={handleClick}>
                        take it away.
                    </button>
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
                            href={shareUrl}
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
                    <div className="fontPickerContainer">
                        <FontPicker
                            apiKey={secrets.GOOGLE_FONTS_KEY}
                            activeFontFamily={fonts}
                            families="[Roboto, Lobster, Poiret One,Dosis,Alfa slab, Abril Fatface,Staatliches, Faster One,Zilla Slab Highlight,Barrio,Jolly Lodger,Creepster]"
                            onChange={(nextFont) => setFonts(nextFont.family)}
                        />
                    </div>
                )}
                <div className="imageWrapper">
                    <img src={url} alt="image"></img>
                    <p className="apply-font">{lyrics}</p>
                </div>
                {youtubeVid && (
                    <img className="youtubeArrow" src="down-arrow.svg"></img>
                )}
                {youtubeVid &&
                    youtubeVid.map((video, idx) => (
                        <div className="youtubeVideo" key={idx}>
                            <ReactPlayer url={video.link} />
                        </div>
                    ))}
            </div>
        </div>
    );
}
