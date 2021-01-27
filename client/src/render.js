// import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FontPicker from "font-picker-react";
import secrets from "../../server/secrets.json";
import axios from "./axios";
import ReactPlayer from "react-player";

// import {Link} from
export default function Render() {
    let params = useParams();
    const [id, setId] = useState();
    const [lyrics, setLyrics] = useState();
    const [fonts, setFonts] = useState("Poiret One");
    const [url, setUrl] = useState();
    const [artist, setArtist] = useState();
    const [youtubelink, setYoutube] = useState();
    const [track, setTrack] = useState();
    const [videos, setVideos] = useState();

    const updateYoutubeVideos = (array) => {
        for (let i = 0; i < array.length; i++) {
            if (array[i].type !== "video") {
                array.splice(i, 1);
            }
        }
        setVideos(array);
    };

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
                            id,
                        } = res.data;
                        setUrl(url);
                        setTrack(track);
                        setLyrics(lyrics);
                        setArtist(artist);
                        setFonts(fonts);
                        setYoutube(youtube);
                        setId(id);
                        axios
                            .post("/api/youtube", {
                                track: track,
                                artist: artist,
                            })
                            .then((res) => updateYoutubeVideos(res.data))
                            .catch((err) =>
                                console.log(
                                    "error in getting render videos",
                                    err
                                )
                            );
                    })
                    .catch((err) =>
                        console.log("getting image in render failed", err)
                    );
        }
    }, [id]);

    if (!url || !lyrics || !track || !youtubelink || !artist || !fonts || !id) {
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
                    <a href={youtubelink}>
                        <img
                            className="renderImage"
                            src={url}
                            alt="image"
                        ></img>
                    </a>
                    <p className="apply-font">{lyrics}</p>
                </div>
                <img className="youtubeArrow" src="./down-arrow.svg"></img>
                {videos &&
                    videos.map((video, idx) => (
                        <div className="youtubeVideo" key={idx}>
                            <ReactPlayer url={video.link} />
                        </div>
                    ))}
            </div>
        </div>
    );
}
