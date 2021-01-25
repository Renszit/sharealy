import { useScreenshot } from "use-react-screenshot";
import { createRef } from "react";
import { useSelector } from "react-redux";
import Compiler from "./compiler";

export default function Screenshot() {
    const ref = createRef(null);
    const [screenshot, takeScreenshot] = useScreenshot();
    const getImage = () => takeScreenshot(ref.current);
    const track = useSelector((state) => state.track);
    const artist = useSelector((state) => state.artist);

    return (
        <div>
            <div className="container">
                <h1>
                    Awesome, now pick a font for this lyric of {track} for this
                    image of {artist}!
                </h1>
                {!screenshot && (
                    <p onClick={() => getImage()}>Looks good? click here!</p>
                )}
                {screenshot && <p>Share this lyric and song!</p>}
            </div>
            <div className="gridContainer">
                {!screenshot && (
                    <div ref={ref}>
                        <Compiler />
                    </div>
                )}
                {screenshot && (
                    <img
                        width="500px"
                        src={screenshot}
                        alt={"ScreenShot"}
                    ></img>
                )}
            </div>
        </div>
    );
}
