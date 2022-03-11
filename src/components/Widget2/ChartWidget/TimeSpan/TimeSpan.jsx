import { FormControl, InputGroup, Form } from "react-bootstrap";
import { FaRegClock } from 'react-icons/fa'
import { ISOtoDATETIME } from "../Chart/Chart";

function TimeSpan({startTime,endTime}){
    if(startTime&&endTime){
        return(
            <div className="d-flex flex-row justify-content-between pr-3 pl-3 mb-2">
                <Form>
                    <InputGroup size="sm">
                        <InputGroup.Prepend>
                            <InputGroup.Text className='bg-info text-light'>
                                <FaRegClock />
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl value={ISOtoDATETIME(startTime)} readOnly/>
                    </InputGroup>
                </Form>
                <Form>
                    <InputGroup size="sm">
                        <FormControl className="text-right" value={ISOtoDATETIME(endTime)} readOnly/>
                        <InputGroup.Append>
                            <InputGroup.Text className='bg-info text-light'>
                                <FaRegClock />
                            </InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>
                </Form>
            </div>
        )
    }else{
        return(<></>)
    }
}

export default TimeSpan