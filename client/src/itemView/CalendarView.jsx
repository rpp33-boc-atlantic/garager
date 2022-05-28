import React, { useState } from 'react';
import styled from 'styled-components';
import { differenceInCalendarDays } from 'date-fns';
// var parseISO = require('date-fns/parseISO')
import parseISO from 'date-fns/parseISO';


// const disabledDates = ['Mon May 30 2022 00:00:00 GMT-0700 (Pacific Daylight Time)'];
const disabledDates = ['2022-06-03', '2022-06-04'];

// REACT CALENDAR OPTION
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function tileDisabled({date, view}) {
  if (view === 'month') {
    return disabledDates.find(dDate => isSameDay(parseISO(dDate), date));
  }
}

function isSameDay(a, b) {
  return differenceInCalendarDays(a, b) === 0;
}

const CalendarView = () => {

  const [value, setValue] = useState(new Date());

  const onChange = (nextValue) => {
    setValue(nextValue);
  }

  const simpleDate = (locale, date) => {
    formatDate(date, 'dd MMM YYYY')
  }

  return (
    <div>
      <Calendar
      tileDisabled={tileDisabled}
      minDate={new Date()}
      selectRange
      onChange={onChange}
      />
      {console.log(value)}
      {value.toString()}
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


