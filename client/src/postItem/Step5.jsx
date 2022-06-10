import React, { useState } from 'react';
import Calendar, { onClickDay } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Form, Button } from 'react-bootstrap';

//step5 includes time availability.

const Step5 = (props) => {
  const { values, changeToPrevious, handSelectDate, handlePost } = props;
  const [date, setDate] = useState(new Date());
  const onChange = (date) => {
    setDate(date);
  };

  return (
    <div className="mx-auto" style={{padding: '5em'}}>
      <h1 className='text-center'>Availability Range</h1>
      <br/>
      <div className='calendar-container d-flex justify-content-center' >
        <Calendar
          onChange={onChange}
          value={date}
          selectRange={true}
        />
        <br/>
      </div>

      {date.length > 0 ? (
        <p className='text-center'>
          <span className='bold'>Start:</span>{' '}
          {date[0].toDateString()}
          &nbsp;|&nbsp;
          <span className='bold'>End:</span> {date[1].toDateString()}
        </p>
      ) : (
        <p className='text-center'>
          <span className='bold'>Default selected date:</span>{' '}
          {date.toDateString()}
        </p>
      )}
      <br/>
      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <Button type="button" onClick={changeToPrevious}>Back</Button>
        <Button type="submit" onClick={handlePost} value={date}>Finish</Button>
      </div>
    </div>

  );
};

export default Step5;