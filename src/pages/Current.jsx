import { Col, Container, Row } from "react-bootstrap";
import ChartWidget from "../components/widget/chart-widget/ChartWidget";

function Current(){

    return(
        <Container fluid>
            <Row>
                <Col md="12" className="p-3">
                    <ChartWidget 
                        id='current-1'
                        title='에너지 현황 (1 Day)'
                        type='line'
                        height='300'
                        tags={{
                            tagNames : ['I.G1.300:FC015.PV','I.G1.300:FI058.PV','I.G1.300:FI044.PV','I.G1.300:FC059.PV'],
                            startTime : (()=>{
                                let now = new Date()
                                now.setDate(now.getDate()-1)
                                return now.toISOString()
                            })(),
                            endTime : new Date().toISOString(),
                            stepSizeSec : 900
                        }}
                        labels={['전기','가스','석탄','스팀']}
                        options={['sum','mean','variance','standard','max','min']}
                        unitTime='3600'
                    >
                        <Container fluid>
                            <Row>
                                <Col md="3" className="pt-0 pl-3 pr-3 pb-3">
                                    <ChartWidget
                                        id='current-2'
                                        title='에너지 사용 비율 (1 Day)'
                                        type='doughnut'
                                        tags={{
                                            tagNames : ['I.G1.300:FC015.PV','I.G1.300:FI058.PV','I.G1.300:FI044.PV','I.G1.300:FC059.PV'],
                                            startTime : (()=>{
                                                let now = new Date()
                                                now.setDate(now.getDate()-1)
                                                return now.toISOString()
                                            })(),
                                            endTime : new Date().toISOString(),
                                            stepSizeSec : 3600
                                        }}
                                        labels={['전기','가스','석탄','스팀']}
                                    />
                                </Col>
                                <Col md="9" className="pl-0 pb-3">
                                    <ChartWidget className='h-100'
                                        id='current-3'
                                        title='원 단위 현황 (1 Day)'
                                        type='line'
                                        tags={{
                                            tagNames : [
                                                'WOT.CALC.CALCTAG/EXPR=IV("I.G1.300:FC015.PV")/IV("I.G1.300:FI044.PV")',
                                                'WOT.CALC.CALCTAG/EXPR=IV("I.G1.300:FI058.PV")/IV("I.G1.300:FI044.PV")',
                                                'WOT.CALC.CALCTAG/EXPR=IV("I.G1.300:FC059.PV")/IV("I.G1.300:FI044.PV")'
                                            ],
                                            startTime : (()=>{
                                                let now = new Date()
                                                now.setDate(now.getDate()-1)
                                                return now.toISOString()
                                            })(),
                                            endTime : new Date().toISOString(),
                                            stepSizeSec : 900
                                        }}
                                        labels={['전기','가스','스팀']}
                                        options={['sum','mean','variance','standard','max','min']}
                                        unitTime='3600'
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col md="12" className="pb-3">
                                    <ChartWidget
                                        id='current-4'
                                        title='상관관계'
                                        type='scatter'
                                        tags={{
                                            tagNames : ['I.G1.300:FC015.PV','I.G1.300:FI058.PV','I.G1.300:FI044.PV','I.G1.300:FC059.PV'],
                                            startTime : (()=>{
                                                let now = new Date()
                                                now.setDate(now.getDate()-30)
                                                return now.toISOString()
                                            })(),
                                            endTime : new Date().toISOString(),
                                            stepSizeSec : 3600
                                        }}
                                        labels={['전기','가스','석탄','스팀']}
                                    />
                                </Col>
                            </Row>
                        </Container>
                    </ChartWidget>
                </Col>
            </Row>
        </Container>
    )
}

export default Current