import React, { useState } from 'react';
import styled from 'styled-components';
import { differenceInCalendarDays } from 'date-fns';
import parseISO from 'date-fns/parseISO';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { isWithinInterval } from "date-fns";
import moment from 'moment';

// const disabledDates = ['2022-06-03', '2022-06-04'];
// const disabledRanges = [['2022-06-03', '2022-06-04'], ['2022-06-10', '2022-06-15']];

// const tileDisabled = ({date, view}) => {
//   if (view === 'month') {
//     return disabledDates.find(dDate => isSameDay(parseISO(dDate), date));
//   }
// };

// const isSameDay = (a, b) => {
//   return differenceInCalendarDays(a, b) === 0;
// };

// const tileDisabled = ({date, view}) => {
//   if (view === 'month') {
//     return isWithinRanges(date, disabledRanges);
//   }
// };

// const isWithinRange = (date, range) => {
//   return isWithinInterval(date, { start: parseISO(range[0]), end: parseISO(range[1]) });
// };

// const isWithinRanges = (date, ranges) => {
//   return ranges.some(range => isWithinRange(date, range));
// };


const CalendarView = (props) => {

  const disabledRanges = [['2022-06-03', '2022-06-04'], ['2022-06-10', '2022-06-15']];

  const [value, setValue] = useState(new Date());

  const onChange = (nextValue) => {
    checkIfConflict(nextValue);
    setValue(nextValue);
    // fix this so that it's handled asynchronously
    props.grabDateRange(nextValue);
  };

  const tileDisabled = ({date, view}) => {
    if (view === 'month') {
      return isWithinRanges(date, disabledRanges);
    }
  };

  const isWithinRange = (date, range) => {
    return isWithinInterval(date, { start: parseISO(range[0]), end: parseISO(range[1]) });
  };

  const isWithinRanges = (date, ranges) => {
    return ranges.some(range => isWithinRange(date, range));
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
      var firstDay = moment(disabledRanges[i][0]).format('l');
      console.log('first day', firstDay);
      if (isWithinRange(new Date(firstDay), formattedRange)) {
        console.log('THERE IS CONFLICT! firstDay', firstDay);
        console.log('is in the proposed range:', formattedRange);
        alert('Please fix dates. Make sure proposed rent range does not include dates where item is unavailable');
      } else {
        console.log('YOURE GOOD TO GO!');
      }
    }
  };

  return (
    <div>
      <Calendar
        tileDisabled={tileDisabled}
        minDate={new Date()}
        selectRange
        onChange={onChange}
      />
      <h6>Pick Up Date: {value[0] ? value[0].toLocaleDateString('en-US') : null}</h6>
      <h6>Return Date: {value[1] ? value[1].toLocaleDateString('en-US') : null}</h6>
      {console.log(value)}
    </div>
  );


};

export default CalendarView;









// REACT DATE RANGE OPTION
// import { DateRange } from 'react-date-range';
// import 'react-date-range/dist/styles.css'; // main css file
// import 'react-date-range/dist/theme/default.css'; // theme css file

// const disabledDates = ['Mon May 30 2022 00:00:00 GMT-0700 (Pacific Daylight Time)'];

// // function tileDisabled({ date, view }) {
// //   // Disable tiles in month view only
// //   if (view === 'month') {
// //     // Check if a date React-Calendar wants to check is on the list of disabled dates
// //     return disabledDates.find(dDate => isSameDay(dDate, date));
// //   }
// // }

// const CalendarView = () => {
//   const [state, setState] = useState([
//     {
//       startDate: new Date(),
//       endDate: new Date(),
//       key: 'selection'
//     }
//   ]);

//   return (
//     <div>
//       <DateRange
//         // disabledDates={disabledDates}
//         editableDateInputs={true}
//         onChange={item => setState([item.selection])}
//         moveRangeOnFirstSelection={false}
//         ranges={state}
//         minDate={new Date()}
//         direction="vertical"
//         scroll={{ enabled: true }}
//       />
//       {console.log(state)}
//     </div>
//   )
// }


