import { useSelector } from "react-redux";

export default function Songs() {
    const artist = useSelector((state) => state.artist && state.artist);
    //useEffect gebruiken voor api search naar songs,
    // deze dan opslaan in redux, hoe? -> zie ok.js
    //hier ga ik 

    return (
        <div>
            <div className="container">
                <h1>{artist}</h1>
                <p>what is your favorite song by {artist} ?</p>
                
            </div>
        </div>
    );
}
