/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
// import images
import Minus from '../images/buttons/minus-button.svg';
import MinusHover from '../images/buttons/minus-button-hover.svg';

/*
  component that renders each string-type field in our query
*/

const QueryField = (props) => {
  const { item, deleteItem, sub } = props;

  // Below is so that we don't render the minus button for the id field
  const [itemIsNotId, setItemIsNotId] = useState(true);
  useEffect(() => {
    if (item === 'id') setItemIsNotId(false);
  }, [itemIsNotId]);

  const tab = <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>;
  const space = <span>&nbsp;</span>;
  return (
    <>
      <div className="queryLine">
        {tab}
        {tab}
        {sub && <>{tab}</>}
        {/* Generate minus button */}
        {itemIsNotId && (
          <button className="minus-button" onClick={() => deleteItem(item)}>
            <div className="plus-minus-icons">
              <img src={Minus} alt="minus botton" />
              <img
                src={MinusHover}
                alt="minus botton"
                className="hover-button"
              />
            </div>
          </button>
        )}
        {space}
        {item}
      </div>
    </>
  );
};

export default QueryField;
