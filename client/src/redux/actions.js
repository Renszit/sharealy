// import axios from "../axios";

const ACTIONS = {
    ARTIST_SET: "ARTIST_SET",
    URL: "URL",
    SONG_SET: "SONG_SET",
    SET_RENDER: "SET_RENDER",
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

export async function renderId(url, lyrics, artist, fonts, id) {
    return {
        type: ACTIONS.SET_RENDER,
        renderUrl: url,
        renderLyrics: lyrics,
        renderFonts: fonts,
        renderId: id,
        renderArtist: artist,
    };
}
