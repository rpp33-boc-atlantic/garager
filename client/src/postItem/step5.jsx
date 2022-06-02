import React, { useState } from 'react';
import Calendar, { onClickDay } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

//step5 includes time availability

const Step5 = (props) => {
  const [date, setDate] = useState(new Date());
  const onChange = (date) => {
    setDate(date);
    props.values.availableFrom = date[0].toDateString();
    props.values.availableTo = date[1].toDateString();
  };

  return (
    <React.Fragment>
      <div className='step5'>
        <h1 className='text-center'>Avaibility Range</h1>
        <div className='calendar-container'>
          <Calendar
            onChange={onChange}
            value={date}
            selectRange={true}
          />
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
      </div>

      <button
        type="submit" className="btn"
        onClick={props.changeToPrevious}
      >Back</button>
      <button
        type="submit" className="btn"
        onClick={props.handleSubmit(props.values)}
      >Finish</button>
    </React.Fragment>

  );
};

export default Step5;

