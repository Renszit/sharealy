// import axios from "../axios";

const ACTIONS = {
    ARTIST_SET: "ARTIST_SET",
    IMAGES: "IMAGES",
};

export async function selectedArtist(artist) {
    return {
        type: ACTIONS.ARTIST_SET,
        artist: artist,
    };
}

export async function sendImageToRedux(url) {
    return {
        type: ACTIONS.IMAGE,
        url: url,
    };
}
