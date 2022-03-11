import { useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { SETWD } from "../Reducers/WDReducer";

function GridWidget({id}){

    let widgetData = useSelector(state=>state.WDReducer.widgetData.find(val=>val.id===id))
    let dispatch = useDispatch()

    useEffect(()=>{
        if(!widgetData){
            dispatch({
                type : SETWD,
                value : {
                    id,
                    columns : []
                }
            })
        }
    },[])

    return(
        <>
            <Container fluid>
                <Row>
                    <Col className="p-3" md="12">
                        <Card>
                            <Card.Header>

                            </Card.Header>
                            <Card.Body>
                                
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Container fluid>
                <Row className="pl-2 pr-2 pt-3">
                    {widgetData&&widgetData.columns?(
                        widgetData.columns.map(column=>(
                            <Col className="pl-2 pr-2 pb-3" md={column.col}>

                            </Col>
                        ))
                    ):null}
                    <Col className="pl-2 pr-2 pb-3">
                    
                    </Col>
                </Row>
            </Container>
        </>
    )
}