import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import DashBoard from "./components/DashBoard";
import api from "./models/api";
import Login from "./pages/Login";
import { SETAUTH } from "./reducers/authReducer";

function App() {

    let pathname = useLocation().pathname
    let auth = useSelector(state=>state.authReducer.auth)
    let dispatch = useDispatch()
    let [loaded,setLoaded] = useState(false)

    useEffect(()=>{
        setLoaded(false)
        api.authCheck().then(result=>{
            dispatch({type : SETAUTH, value : result.auth})
            setLoaded(true)
        })
    },[])

    useEffect(()=>{
        api.authCheck().then(result=>dispatch({type : SETAUTH, value : result.auth}))
    },[pathname])

    return (
        <div className="App">
            {loaded?(
                auth?(
                    <DashBoard />
                ):(
                    <Login />
                )
            ):null}
        </div>
    );
}

export default App;
