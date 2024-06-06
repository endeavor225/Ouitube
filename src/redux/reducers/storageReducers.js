
const initState = {
    notifications: []
}

const initAction = {
    type: null,
    payload: null
}
export const storageReducers = (state=initState, action=initAction) => {
    switch (action.type) {
        case "ADD" :
            return {
                notifications: [...state.notifications, action.payload]
            }
            break;
        
        case "REMOVE" : 
            state.notifications = state.notifications.filter(notif => notif._id !== action.payload._id)
            return {
                notifications: [...state.notifications]
            }
            break;

        case "CLEAR" : 
            return {
                ...initState
            }
            break;

        default :
            return state
            break;
    }
}