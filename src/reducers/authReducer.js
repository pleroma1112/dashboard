export const SETAUTH = 'authReducer/SETAUTH'

const initState = {
    auth : false
}

const authReducer = (state=initState,action)=>{
    switch(action.type){
        case SETAUTH:
            return {...state,auth : action.value}
        default:
            return state
    }
}

export default authReducer