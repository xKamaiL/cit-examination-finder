import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import store from './store';
import { observer } from 'mobx-react-lite';
const StyleSelectTerm = styled.div`
  .part {
    &:last-child {
    }
    &:hover {
      opacity: 0.89;
    }
    cursor: pointer;
    background: #464c56 !important;
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
const SelectPart = ({ match }) => {
  useEffect(() => {
    store.term = match.params.term;
    return () => {};
  }, [match]);
  return (
    <CSSTransition
      in={!store.loading}
      timeout={3000}
      classNames="select"
      unmountOnExit
    >
      <StyleSelectTerm className="row py-5 mx-2 mx-md-0">
        <Link
          to={`/term/${match.params.term}/part/midterm`}
          className="col-12 col-md-6 part"
        >
          <h2>📅 MIDTERM</h2>
        </Link>
        <Link
          to={`/term/${match.params.term}/part/midterm`}
          className="col-12 col-md-6 part"
        >
          <h2>🔥 FINAL</h2>
        </Link>
      </StyleSelectTerm>
    </CSSTransition>
  );
};
export default withRouter(observer(SelectPart));
