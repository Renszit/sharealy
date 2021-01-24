const ACTIONS = {
    ARTIST_SET: "ARTIST_SET",
    IMAGE: "IMAGE",
};

export function reducer(state = {}, action) {
    if (action.type == ACTIONS.ARTIST_SET) {
        state = {
            ...state,
            artist: action.artist,
        };
    } else if (action.type == ACTIONS.IMAGE) {
        state = {
            ...state,
            image: action.url,
        };
    }
    return state;
}
