import React, { useState } from 'react';

const Header = (props) => {

  return (
    <p>Header: {props.thread.theirUsername}, {props.thread.productName}</p>
  );
};

export default Header;