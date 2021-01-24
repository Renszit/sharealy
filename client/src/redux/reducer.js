const ACTIONS = {
    ARTIST_SET: "ARTIST_SET",
    URL: "URL",
    SONG_SET: "SONG_SET",
};

export function reducer(state = {}, action) {
    if (action.type == ACTIONS.ARTIST_SET) {
        state = {
            ...state,
            artist: action.artist,
            id: action.artistId,
        };
    } else if (action.type == ACTIONS.URL) {
        state = {
            ...state,
            url: action.url,
        };
    } else if (action.type == ACTIONS.SONG_SET) {
        state = {
            ...state,
            track: action.track,
            trackId: action.trackId,
        };
    }
    return state;
}
