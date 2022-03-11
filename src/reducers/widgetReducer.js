export const SETDATA = 'widgetReducer/SETDATA'
export const LOADDATA = 'widgetReducer/LOADDATA'

const initState = {
    widgetData : []
}

const widgetReducer = (state=initState,action)=>{
    switch(action.type){
        case SETDATA:
            if(state.widgetData.find(val=>val.id===action.value.id)){
                return {...state, widgetData : state.widgetData.map(val=>val.id===action.value.id?action.value:val)}
            }else{
                return {...state, widgetData : state.widgetData.concat(action.value)}
            }
        case LOADDATA:
            return {...state, widgetData : action.value}
        default:
            return state
    }
}

export default widgetReducer