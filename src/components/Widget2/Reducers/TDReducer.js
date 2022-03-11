export const SETTD = 'TDReducer/SETDATA'

const initState = {
    tagsData : []
}

const TDReducer = (state=initState,action)=>{
    switch(action.type){
        case SETTD:
            if(state.tagsData.find(val=>val.id===action.value.id)){
                return {...state,tagsData : state.tagsData.map(val=>val.id===action.value.id?action.value:val)}
            }else{
                return {...state,tagsData : state.tagsData.concat(action.value)}
            }
        default:
            return state
    }
}

export default TDReducer