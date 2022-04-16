const updateNoteInfo = (noteInfo) => {
    return {
        type: "UPDATE_NOTE_INFO",
        data: noteInfo,
    };
};

export { updateNoteInfo };
