export const SET_SIDE_WIDTH = 'layoutReducer/SET_SIDE_WIDTH'
export const SET_HEADER_HEIGHT = 'layoutReducer/SET_HEADER_HEIGHT'
export const SET_FOOTER_HEIGHT = 'layoutReducer/SET_FOOTER_HEIGHT'
export const SET_MENUS = 'layoutReducer/SET_MENUS'

const initState = {
    sideWidth : 250 + 'px',
    headerHeight : 58 + 'px',
    footerHeight : 58 + 'px',
    sideMenus : []
}

const layoutReducer = (state=initState,action)=>{
    switch(action.type){
        case SET_SIDE_WIDTH:
            return {...state,sideWidth : action.value}
        case SET_HEADER_HEIGHT:
            return {...state,headerHeight : action.value}
        case SET_FOOTER_HEIGHT:
            return {...state,footerHeight : action.value}
        case SET_MENUS:
            return {...state,sideMenus : action.value}
        default:
            return state
    }
}

export default layoutReducer