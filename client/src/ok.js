import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "./axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { sendImageToRedux } from "./redux/actions";

export default function Ok() {
    const dispatch = useDispatch();
    const artist = useSelector((state) => state.artist);
    const [images, setImages] = useState();

    useEffect(() => {
        {
            artist &&
                axios
                    .post("/api/images", { value: artist })
                    .then((result) => setImages(result.data));
        }
    }, [artist]);

    function handleImage(urlOfImage) {
        dispatch(sendImageToRedux(urlOfImage));
    }

    if (!artist) {
        return null;
    }

    return (
        <div>
            <div className="container">
                <div className="container">
                    {artist && <h3>Ok, so you like {artist}</h3>}
                    <h3>now select a picture below you like</h3>

                    <div className="containerHorizontal">
                        {images &&
                            images.slice([0], [16]).map((url, idx) => (
                                <div key={idx} className="singleImage">
                                    <Link
                                        onClick={() => handleImage(url.url)}
                                        to="/songs"
                                    >
                                        <img
                                            className="images"
                                            src={url.url}
                                            onError={(e) => {
                                                e.target.src =
                                                    "/gummy-cassette.svg";
                                            }}
                                        ></img>
                                    </Link>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
