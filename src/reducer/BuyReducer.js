const initialState = {
    user: {
        family_name: "",
        given_name: "",
        email: "",
        address: ""        
    },
    isEdit: false
}

const BuyReducer = (state = initialState, action) => {
    switch(action.type){
        case "ON_CHANGE_USER_INFO":
            return{
                ...state,
                user:{
                    ...state.user,
                    [action.field]: action.payload
                }
            }
        case "SET_IS_EDIT":
            return{
                ...state,
                isEdit: !state.isEdit
            }
        default:
            return state;
    }
}

export const SetIsEditAC = () => ({
    type: "SET_IS_EDIT"
});

export const SetChangedUserInfoFieldAC = (field, text) => ({
    type: "ON_CHANGE_USER_INFO",
    field,
    payload: text
});

export default BuyReducer;