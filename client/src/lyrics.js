import { useSelector } from "react-redux";

export default function Lyrics() {
    const lyrics = useSelector(
        (state) => state.lyrics && state.lyrics.lyrics.lyrics_body
    );
    return (
        <div>
            <div className="albumsContainer">
                <h1>test</h1>
                {lyrics &&
                    lyrics.map((lyrics, idx) => (
                        <div key={idx}>
                            <p>{lyrics.lyrics.lyrics_body}</p>
                        </div>
                    ))}
            </div>
        </div>
    );
}
