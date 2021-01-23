export function reducer(state = {}, action) {
    if (action.type == "SONG_GET") {
        state = {
            ...state,
            lyrics: action.lyrics,
        };
    }
    return state;
}
