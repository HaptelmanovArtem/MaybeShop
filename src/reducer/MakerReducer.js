const initState = {
    makers: [],
    count: 0
}

const MakerReducer = (state = initState, action) => {
    switch(action.type){
        case "SET_MAKER":
            return{
                ...state,
                makers: action.payload,
                count: action.payload.length
            }
        default:
            return state;
    }
}

export const SetMakerAC = makers => ({
    type: "SET_MAKER",
    payload: makers
});

export default MakerReducer;