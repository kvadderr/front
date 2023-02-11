import { SET_USER_FAVORITE, SET_USER, SET_ONLINE_OPERATOR_LIST } from './actions';

const initialState = {
    favorite: [],
    user: {},
    onlineOperatorList: [],
}

function userReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER_FAVORITE:
            return { ...state, favorite: action.payload };
        case SET_USER:
            return { ...state, user: action.payload };
        case SET_ONLINE_OPERATOR_LIST:
            return { ...state, onlineOperatorList: action.payload };
        default:
            return state;
    }
}

export default userReducer;