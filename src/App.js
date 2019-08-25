import React, { useState, useEffect } from 'react';
import './App.css';
import { MDBInput, MDBBtn } from 'mdbreact';
import axios from 'axios';
import _ from 'lodash';
import SelectTerm from './SelectTerm';
import SelectPart from './SelectPart';
import { withRouter, Link, Route, Switch } from 'react-router-dom';
const APP_ENTRY_POINT =
  'https://us-central1-cit-examination.cloudfunctions.net/api';

function App({ match, history }) {
  const [loading, setLoading] = useState(true);
  const [is_error, setHasError] = useState(false);
  const [data, setData] = useState({
    term1: {
      midterm: [],
      final: []
    },
    term2: {
      midterm: [],
      final: []
    }
  });
  async function fetchFiles() {
    await axios
      .get(APP_ENTRY_POINT)
      .then(response => response.data)
      .then(data => {
        setData(data);
        setHasError(false);
      })
      .catch(error => {
        setHasError(true);
      });
    setLoading(false);
  }
  useEffect(() => {
    console.log(history);
    fetchFiles();
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
          disabled={loading}
        />
      </div>
      <hr />
      <Switch>
        <Route exact path="/" component={SelectTerm} />
        <Route exact path="/term/:term" component={SelectPart} />
        <Route exact path="/term/:term/part/:part" />
      </Switch>
    </div>
  );
}

export default withRouter(App);
