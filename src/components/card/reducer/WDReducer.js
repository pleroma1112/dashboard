export const SETWD = 'WDReducer/SETDATA'

const initState = {
    widgetData : []
}

const WDReducer = (state=initState,action)=>{
    switch(action.type){
        case SETWD:
            if(state.widgetData.find(val=>val.id===action.value.id)){
                return {...state,widgetData : state.widgetData.map(val=>val.id===action.value.id?action.value:val)}
            }else{
                return {...state,widgetData : state.widgetData.concat(action.value)}
            }
        default:
            return state
    }
}

export default WDReducer