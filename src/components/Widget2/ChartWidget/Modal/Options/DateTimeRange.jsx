import { Form } from "react-bootstrap";
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css'

function DateTimeRange({id,startTime,endTime,onChange}){

    return(
        <Form.Group>
            <Form.Label>기간</Form.Label>
            <DateRangePicker initialSettings={{
                parentEl : '.modal-widget-'+id,
                showDropdowns : true,
                timePicker : true,
                timePicker24Hour : true,
                timePickerSeconds : true,
                startDate : new Date(startTime),
                endDate : new Date(endTime),
                opens : 'center',
                locale : {
                    format : 'YYYY-MM-DD hh:mm:ss A'
                }
            }} onCallback={(st,et)=>onChange({
                startTime : new Date(st).toISOString(),
                endTime : new Date(et).toISOString()
            })}>
                <Form.Control type='text' />
            </DateRangePicker>
        </Form.Group>
    )
}

export default DateTimeRange