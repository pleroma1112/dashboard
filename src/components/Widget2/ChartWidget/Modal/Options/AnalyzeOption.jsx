import { Row, Col, Form } from "react-bootstrap";

function AnalyzeOption({analyze, onChange}){
    return(
        <Form>
            <Row>
                <Col md='6'>
                    <Row>
                        <Col md='6'>
                            <Form.Check type="checkbox" label={'총합'} checked={analyze&&analyze.sum} onChange={(e)=>{
                                onChange({...analyze,sum : e.target.checked})
                            }}/>
                            <Form.Check type="checkbox" label={'평균'} checked={analyze&&analyze.avg} onChange={(e)=>{
                                onChange({...analyze,avg : e.target.checked})
                            }}/>
                            <Form.Check type="checkbox" label={'분산'} checked={analyze&&analyze.var} onChange={(e)=>{
                                onChange({...analyze,var : e.target.checked})
                            }}/>
                        </Col>
                        <Col md='6'>
                            <Form.Check type="checkbox" label={'표준편차'} checked={analyze&&analyze.std} onChange={(e)=>{
                                onChange({...analyze,std : e.target.checked})
                            }}/>
                            <Form.Check type="checkbox" label={'최댓값'} checked={analyze&&analyze.max} onChange={(e)=>{
                                onChange({...analyze,max : e.target.checked})
                            }}/>
                            <Form.Check type="checkbox" label={'최솟값'} checked={analyze&&analyze.min} onChange={(e)=>{
                                onChange({...analyze,min : e.target.checked})
                            }}/>
                        </Col>
                    </Row>
                </Col>
                <Col md='6'>
                    <Form.Label>단위 시간 (sec)</Form.Label>
                    <Form.Control type="number" value={analyze&&analyze.unitTime} onChange={(e)=>{
                        onChange({...analyze,unitTime : e.target.value})
                    }}/>
                </Col>
            </Row>
        </Form>
    )
}

export default AnalyzeOption