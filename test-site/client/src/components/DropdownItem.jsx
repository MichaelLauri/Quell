/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
import React from 'react';

/*
  A reusable component for all dropdowns in the query
*/

const DropdownItem = (props) => {
  const { func, item } = props;

  return (
    <>
      <div className="dropdown-items" onClick={() => func(item)}>
        {item}
      </div>
    </>
  );
};

export default DropdownItem;
