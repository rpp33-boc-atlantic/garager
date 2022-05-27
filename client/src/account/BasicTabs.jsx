/* eslint-disable func-style */
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import {Link } from 'react-router-dom';
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      sx={{ height: '100px', border: '5px solid blue'}}
    >
      {value === index && (
        <Box sx={{ height: '90%', border: '5px solid black', div: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`, 'text-align': 'center'
  };
}

export default function BasicTabs(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '55%' }} m= 'auto' margin-top= '20%'>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', border: '5px solid black' }} m = 'auto'>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
          <Tab label="Listings" {...a11yProps(0)} />
          <Tab label="Earnings" {...a11yProps(1)} />
          <Tab label="Saved" {...a11yProps(2)} />
        </Tabs>
      </Box>
      {/* // border: '5px solid black' */}
      <TabPanel value={value} index={0} >
        {/* {props.listings === false ? `:( You have no current listings. Click ${<Link to='PostItem'> here</Link>} to list an item` : 'item 1'} */}
       :[ You have no current listings.  Click {<Link to='../PostItem'> here</Link>} to list an item

      </TabPanel>
      <TabPanel value={value} index={1}>
        <div style={{size: '20px'}}>You have earned a total of </div> <h1>  ${props.earnings} </h1> from {props.rentedItems} items.
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </Box>
  );
}
