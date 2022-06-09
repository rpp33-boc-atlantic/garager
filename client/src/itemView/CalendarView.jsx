import React, { useState } from 'react';
import styled from 'styled-components';
import { differenceInCalendarDays } from 'date-fns';
import parseISO from 'date-fns/parseISO';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { isWithinInterval } from 'date-fns';
import moment from 'moment';

const CalendarView = (props) => {
  // const disabledRanges = [['2022-06-03', '2022-06-04'], ['2022-06-10', '2022-06-15']];
  const disabledRanges = props.datesBooked;

  const [value, setValue] = useState(new Date());

  const onChange = (nextValue) => {
    if (checkIfConflict(nextValue)) {
      alert('Please fix dates. Make sure proposed rent range does not include dates where item is unavailable');
    } else {
      setValue(nextValue);
      props.grabDateRange(nextValue);
    }
  };

  const tileDisabled = ({date, view}) => {
    if (view === 'month') {
      return isWithinRanges(date, disabledRanges);
    }
  };

  const isWithinRange = (date, range) => {
    return isWithinInterval(date, { start: parseISO(range['json_build_array'][0]), end: parseISO(range['json_build_array'][1]) });
  };

  const isWithinRanges = (date, ranges) => {
    return ranges.some(range => isWithinRange(date, range));
  };

  const isWithinRange2 = (date, range) => {
    return isWithinInterval(date, { start: parseISO(range[0]), end: parseISO(range[1]) });
  };

  const checkIfConflict = (proposedRange) => {
    // gonna get the first date of every disabled range
    // then check if that date is within the proposed range

    // IMPORTANT: dummy date must look like this
    // const dummyDate1 = new Date('6/11/2022');

    // IMPORTANT: formatted proposed range has to look like this
    // var fakeRange = ['2022-06-10', '2022-06-15'];

    // EXAMPLE
    // if (isWithinRange(dummyDate1, fakeRange)) {
    //   console.log('THERE IS CONFLICT! FIX RANGE');
    // }

    const formattedRange = [moment(proposedRange[0]).format().substring(0, 10), moment(proposedRange[1]).format().substring(0, 10)];

    for (var i = 0; i < disabledRanges.length; i++) {
      var firstDay = moment(disabledRanges[i]['json_build_array'][0]).format('l');
      console.log('first day', firstDay);
      if (isWithinRange2(new Date(firstDay), formattedRange)) {
        console.log('THERE IS CONFLICT! firstDay', firstDay);
        console.log('is in the proposed range:', formattedRange);
        return true;
      } else {
        console.log('YOURE GOOD TO GO!');
      }
    }
    return false;
  };

  const minimumDate = moment(new Date(props.availabilityRange.availablefrom)).isSameOrBefore(new Date()) ? new Date() : new Date(props.availabilityRange.availablefrom);

  return (
    <div>
      <Calendar
        tileDisabled={tileDisabled}
        minDate={minimumDate}
        maxDate={new Date(props.availabilityRange.availableto)}
        selectRange
        onChange={onChange}
        calendarType={'US'}
      />
      <h6 style={{ padding: '.4em', paddingTop:'.8em'}}>Pick Up Date: {value[0] ? value[0].toLocaleDateString('en-US') : null}</h6>
      <h6 style={{ padding: '.4em'}}>Return Date: {value[1] ? value[1].toLocaleDateString('en-US') : null}</h6>
    </div>
  );


};

export default CalendarView;


