export function reducer(state = {}, action) {
    if (action.type == "albums") {
        state = {
            ...state,
            albums: action.albums,
        };
    } else if (action.type == "artist") {
        state = { ...state, artist: action.artist };
    }

    return state;
}
