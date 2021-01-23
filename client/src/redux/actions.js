import axios from "../axios";

export async function selectedSong(song) {
    const { data } = await axios.post("/api/getSong", {
        value: song,
    });

    return {
        type: "SONG_GET",
        lyrics: data,
    };
}
