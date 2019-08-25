import React, { useState, useEffect } from 'react';
import './App.css';
import { MDBInput } from 'mdbreact';
import _ from 'lodash';
import SelectTerm from './SelectTerm';
import SelectPart from './SelectPart';
import { withRouter, Link, Route, Switch } from 'react-router-dom';
import { observer } from 'mobx-react';
import store from './store';
import ShowFiles from './ShowFiles';
function App({ match, history }) {
  useEffect(() => {
    console.log(history);
    store.fetchFiles();
  }, [history, match]);

  return (
    <div className=" container">
      <h2 className="app-title text-white py-3 text-center">
        CIT EXAMINATION FINDER
      </h2>
      <div className="app-searching col-12 col-md-8 mx-auto text-white ">
        <MDBInput
          label="Search by name..."
          size="lg"
          className="text-white text-center"
          disabled={store.loading}
        />
      </div>
      <hr />
      <Switch>
        <Route exact path="/" component={SelectTerm} />
        <Route exact path="/term/:term" component={SelectPart} />
        <Route exact path="/term/:term/part/:part" component={ShowFiles} />
      </Switch>
    </div>
  );
}

export default withRouter(observer(App));
