// import axios from "../axios";

const ACTIONS = {
    ARTIST_SET: "ARTIST_SET",
    URL: "URL",
    SONG_SET: "SONG_SET",
};

export async function selectedArtist(name, id) {
    return {
        type: ACTIONS.ARTIST_SET,
        artist: name,
        artistId: id,
    };
}

export async function sendImageToRedux(url) {
    return {
        type: ACTIONS.URL,
        url: url,
    };
}

export async function selectedSong(track, id) {
    return {
        type: ACTIONS.SONG_SET,
        track: track,
        trackId: id,
    };
}
