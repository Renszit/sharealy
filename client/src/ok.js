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
        axios
            .post("/api/images", {
                value: artist,
            })
            .then((response) => {
                // console.log(response);
                setImages(response.data);
            })
            .catch((err) => console.log("error in useEffect", err));
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
                    <p>Ok, so you like {artist}</p>
                    <p>now select a picture below you like</p>

                    <div className="containerHorizontal">
                        {images &&
                            images.map((url, idx) => (
                                <div key={idx} className="singleImage">
                                    <Link to="/songs">
                                        <img
                                            onClick={handleImage(url.url)}
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
