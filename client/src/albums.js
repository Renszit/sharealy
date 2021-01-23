import { useSelector } from "react-redux";
// import { useState } from "react";

export default function Albums() {
    const artist = useSelector((state) => state.artist && state.artist);

    return (
        <div>
            <div className="albumsContainer">
                <h1>Ahh, great choice!</h1>
            </div>
        </div>
    );
}
