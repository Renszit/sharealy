import { useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import axios from "./axios";
import FontPicker from "font-picker-react";
import { useDispatch } from "react-redux";
import { renderId } from "./redux/actions";
import ReactPlayer from "react-player";
import { animateScroll as scroll } from "react-scroll";

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
    // const ref = useRef();
    const arrowRef = useRef();
    const [loading, setLoading] = useState();

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
        setLoading(true);
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
                        dispatch(
                            renderId(url, lyrics, artist, fonts, res.data.id)
                        );
                        scroll.scrollTo(270);
                        setsqlId(res.data.id);
                        setSending(true);
                        setLoading(false);
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
                {!sending && (
                    <h1>
                        Awesome, {track} by {artist} is a great pick.
                    </h1>
                )}{" "}
                {sending && (
                    <h1>
                        Now, share {track} by {artist}!
                    </h1>
                )}
                {!sending && !loading && (
                    <button className="takeItAway" onClick={handleClick}>
                        share and explore!
                    </button>
                )}
            </div>

            <div className="gridContainer">
                {!sending && !loading && (
                    <p>if you want you can change the font on the image here</p>
                )}
                {loading && <img width={"100px"} src="./716.gif"></img>}
                {!sending && !loading && (
                    <div className="fontPickerContainer">
                        <FontPicker
                            apiKey="AIzaSyBJ8eiRgZC3FHQ1t6z_oqyaRSysyJ5 - sD0"
                            activeFontFamily={fonts}
                            families="[Abril Fatface, Anton, Bebas Neue,Londrina Solid,Pacifico, Quicksand,Zilla Slab Highlight]"
                            onChange={(nextFont) => setFonts(nextFont.family)}
                        />
                    </div>
                )}
                {sending && (
                    <div className="containerHorizontal">
                        <div className="socialButton">
                            <TwitterShareButton
                                title={lyrics}
                                via="sharealy"
                                url={shareUrl}
                            >
                                <TwitterIcon round size={32} />
                            </TwitterShareButton>
                        </div>
                        <div className="socialButton">
                            <FacebookShareButton
                                hashtag={artist}
                                quote={lyrics}
                                href={shareUrl}
                            >
                                <FacebookIcon round size={32} />
                            </FacebookShareButton>
                        </div>
                        <div className="socialButton">
                            <WhatsappShareButton title={lyrics} url={shareUrl}>
                                <WhatsappIcon round size={32} />
                            </WhatsappShareButton>
                        </div>
                        <div className="socialButton">
                            <EmailShareButton
                                body={emailBody}
                                subject={lyrics}
                                url={shareUrl}
                            >
                                <EmailIcon round size={32} />
                            </EmailShareButton>
                        </div>
                    </div>
                )}

                <div className="imageWrapper">
                    <img src={url} alt="image"></img>
                    <p className="apply-font">{lyrics}</p>
                </div>
                {youtubeVid && (
                    <img
                        ref={arrowRef}
                        className="youtubeArrow"
                        src="./down-arrow.svg"
                    ></img>
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
