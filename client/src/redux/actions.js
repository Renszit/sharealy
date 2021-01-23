import axios from "../axios";

export async function albumsOfSelectedArtist(arrayOfAlbums) {
    return {
        type: "albums",
        albums: arrayOfAlbums,
    };
}

export async function selectedArtist(artist) {
    const { data } = await axios.post("/api/getArtist", {
        value: artist,
    });

    return {
        type: "artist",
        albums: data,
    };
}
