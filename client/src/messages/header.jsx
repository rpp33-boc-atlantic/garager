import React, { useState } from 'react';

const Header = (props) => {

  return (
    <p>{props.thread.productName}</p>
  );
};

export default Header;