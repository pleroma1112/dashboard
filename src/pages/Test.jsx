import { Col, Container, Row } from "react-bootstrap";
import SuperCard from "../components/card/SuperCard";
import GridWidget from "../components/widget/grid-widget/GridWidget";
import PostWidget from '../components/widget/post-widget/PostWidget'
import ChartWidget from "../components/Widget2/ChartWidget/ChartWidget";

function Test(){

    return(
        <>
            <GridWidget id='gridTest' title='Grid Test'>
            </GridWidget>
            <Container fluid>
                <Row>
                    <Col md="12" className="p-3">
                        <PostWidget id='wysiwyg' title={'Test'}/>
                    </Col>
                    <Col md="12" className="p-3" style={{minHeight : 500 + 'px'}}>
                        <ChartWidget id={'testID-wononetech1234'} />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Test