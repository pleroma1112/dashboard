import { combineReducers } from 'redux'
import layoutReducer from './layoutReducer'
import widgetReducer from './widgetReducer'
import authReducer from './authReducer'
import WDReducer from '../components/Widget2/Reducers/WDReducer'
import TDReducer from '../components/Widget2/Reducers/TDReducer'

const rootReducer = combineReducers({
    layoutReducer,
    widgetReducer,
    authReducer,
    WDReducer,
    TDReducer
})

export default rootReducer