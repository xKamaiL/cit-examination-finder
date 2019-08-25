import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
const StyleSelectTerm = styled.div`
  .part {
    &:last-child {
    }
    &:hover {
      opacity: 0.89;
    }
    cursor: pointer;
    background: #435471 !important;
    display: flex;
    color: #fff;
    box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.18),
      0 4px 15px 0 rgba(0, 0, 0, 0.15);
    justify-content: center;
    align-items: center;

    h2 {
      font-size: 3.75em;
      font-weight: 400;
    }
  }
  height: 70vh;
  @media-min;
`;
const SelectTerm = ({ onClick, match }) => {
  useEffect(() => {
    console.log(match);
    return () => {};
  }, [match]);
  return (
    <StyleSelectTerm className="row py-5 mx-2 mx-md-0">
      <Link to="/term/1" className="col-12 col-md-6 part">
        <h2>TERM 1</h2>
      </Link>
      <Link to="/term/2" className="col-12 col-md-6 part">
        <h2>TERM 2</h2>
      </Link>
    </StyleSelectTerm>
  );
};
export default withRouter(SelectTerm);
