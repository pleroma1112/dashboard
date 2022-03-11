import { Form, Row, Col } from 'react-bootstrap'

function Analyze({options, unitTime, setOptions, setUnitTime}){

    return(
        <Form>
            <Row>
                <Col md="6">
                    <Row>
                        <Col md="6">
                            {[['총합','sum'],['평균','mean'],['분산','variance']].map(arr=>(
                                <Form.Check type='checkbox' label={arr[0]} checked={options.find(val=>val===arr[1])} onChange={(e)=>{
                                    if(e.target.checked){
                                        if(!options.find(val=>val===arr[1])){
                                            setOptions(options.concat(arr[1]))
                                        }
                                    }else{
                                        setOptions(options.filter(val=>val!==arr[1]))
                                    }
                                }}/>
                            ))}
                        </Col>
                        <Col md="6">
                            {[['표준편차','standard'],['최댓값','max'],['최솟값','min']].map(arr=>(
                                <Form.Check type='checkbox' label={arr[0]} checked={options.find(val=>val===arr[1])} onChange={(e)=>{
                                    if(e.target.checked){
                                        if(!options.find(val=>val===arr[1])){
                                            setOptions(options.concat(arr[1]))
                                        }
                                    }else{
                                        setOptions(options.filter(val=>val!==arr[1]))
                                    }
                                }}/>
                            ))}
                        </Col>
                    </Row>
                </Col>
                <Col md="6" className='pl-0'>
                    <Form.Label>Unit Time (sec)</Form.Label>
                    <Form.Control type='number' value={unitTime} onChange={(e)=>{
                        setUnitTime(e.target.value)
                    }}/>
                </Col>
            </Row>
        </Form> 
    )
}

export default Analyze