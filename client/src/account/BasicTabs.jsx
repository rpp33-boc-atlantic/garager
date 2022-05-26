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
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
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
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '55%' }} m= 'auto' margin-top= '20%'>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }} m = 'auto'>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Listings" {...a11yProps(0)} m='auto' />
          <Tab label="Earnings" {...a11yProps(1)} />
          <Tab label="Saved" {...a11yProps(2)} />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0} m='auto'>
        {/* {props.listings === false ? `:( You have no current listings. Click ${<Link to='PostItem'> here</Link>} to list an item` : 'item 1'} */}
       :[ You have no current listings.  Click {<Link to='../PostItem'> here</Link>} to list an item

      </TabPanel>
      <TabPanel value={value} index={1}>
        <h3>You have earned a total of </h3> <h1>  ${props.earnings} </h1> from {props.rentedItems} items.
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </Box>
  );
}
