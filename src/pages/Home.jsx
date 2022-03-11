import { Container, Row, Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import BoardWidget from "../components/widget/board-widget/BoardWidget";
import ChartWidget from "../components/widget/chart-widget/ChartWidget";
import { SET_FOOTER_HEIGHT, SET_SIDE_WIDTH, SET_HEADER_HEIGHT } from '../reducers/layoutReducer'

function Home(){

    let sideWidth = useSelector(state=>state.layoutReducer.sideWidth)
    let headerHeight = useSelector(state=>state.layoutReducer.headerHeight)
    let footerHeight = useSelector(state=>state.layoutReducer.footerHeight)

    let dispatch = useDispatch()

    return(
        <Container fluid>
            <Row>
                <Col className="p-3">
                    <Form.Label>Sidebar Width</Form.Label>
                    <Form.Control type="text" value={sideWidth} onChange={(e)=>dispatch({type : SET_SIDE_WIDTH, value : e.target.value})}/>
                    <Form.Label>Header Height</Form.Label>
                    <Form.Control type="text" value={headerHeight} onChange={(e)=>dispatch({type : SET_HEADER_HEIGHT, value : e.target.value})}/>
                    <Form.Label>Footer Height</Form.Label>
                    <Form.Control type="text" value={footerHeight} onChange={(e)=>dispatch({type : SET_FOOTER_HEIGHT, value : e.target.value})}/>
                    <div>
                        <ChartWidget type='line' 
                            id="test"
                            title="Test"
                            tags={{
                                tagNames : ['I.G1.300:FC015.PV','I.G1.300:FC059.PV'],
                                startTime : new Date('2022-01-01 00:00:00').toISOString(),
                                endTime : new Date('2022-01-02 00:00:00').toISOString(),
                                stepSizeSec : 900
                            }}
                            labels={['Test1']}
                        />
                    </div>
                    <BoardWidget 
                        id='boardTest'
                        title='board'
                        boardId='TEST'
                        viewLength='10'
                        pageLength='5'
                    />
                </Col>
            </Row>
        </Container>
    )
}

export default Home