const initState = {
    noteInfo: {},
};

const noteReducer = (state = initState, action) => {
    switch (action.type) {
        case "UPDATE_NOTE_INFO":
            return {
                ...state,
                noteInfo: action.data,
            };
        default:
            return state;
    }
};

export default noteReducer;
