const initialState = {
    isAuthorized: false,
    error: "",
    user: {}
}

const UserReducer = (state = initialState, action) => {
    switch(action.type){
        case "SET_AUTHORIZE":
            return{
                ...state,
                isAuthorized: true,
                user: action.payload
            }
        case "SET_UNAUTHORIZE":
            return{
                ...state,
                isAuthorized: false,
                user: {}
            }
        default:
            return state;
    }
}

export const SetAuthorizeAC = user => ({
    type: "SET_AUTHORIZE",
    payload: user
});

export const SetUnAuthorizeAC = () => ({
    type: "SET_UNAUTHORIZE"
});

export default UserReducer;