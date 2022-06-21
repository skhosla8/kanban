export const ActionTypes = {
    ADD_BOARD: "ADD_BOARD",
}

export const addBoard = (newBoard) => {
    return {
        type: ActionTypes.ADD_BOARD,
        payload: newBoard 
    }
}
