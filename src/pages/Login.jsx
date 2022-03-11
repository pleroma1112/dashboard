import { useState } from "react"
import { Container, Row, Col, Form, Button } from "react-bootstrap"
import { useDispatch } from "react-redux"
import api from "../models/api"
import { SETAUTH } from "../reducers/authReducer"

function Login(){

    let [id,setId] = useState('')
    let [password,setPassword] = useState('')
    let dispatch = useDispatch()

    return(
        <Container fluid>
            <Row>
                <Col className="p-0">
                    <div className="vh-100 d-flex flex-column justify-content-center align-items-center bg-light">
                        <div className="login-logo mb-3">
                            <h2 className="text-dark">WON-ONE <span className="font-weight-light">TECH</span></h2>
                        </div>
                        <Form style={{width : 300 + 'px'}} onSubmit={(e)=>{
                            e.preventDefault()
                            api.login(id,password).then(result=>{
                                dispatch({type : SETAUTH, valeu : result.auth})
                                if(!result.auth){
                                    window.alert(result.msg)
                                }else{
                                    window.location.href = '/'
                                }
                            })
                        }}>
                            <Form.Control className="mb-3 shadow-sm border-0" type='text' placeholder="ID" value={id} onChange={(e)=>setId(e.target.value)}/>
                            <Form.Control className="shadow-sm border-0" type='password' placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                            <Button className="d-none" type="submit">Login</Button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Login