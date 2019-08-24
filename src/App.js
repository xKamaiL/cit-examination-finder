import React, { useState, useEffect } from 'react';
import './App.css';
import { MDBInput } from 'mdbreact';
import axios from 'axios';
import _ from 'lodash';
const APP_ENTRY_POINT =
  'https://us-central1-cit-examination.cloudfunctions.net/api';

function App() {
  const [loading, setLoading] = useState(true);
  const [is_error, setHasError] = useState(false);
  async function fetchFiles() {
    await axios
      .get(APP_ENTRY_POINT)
      .then(response => response.data)
      .then(data => {
        setHasError(false);
      })
      .catch(error => {
        setHasError(true);
      });
    setLoading(false);
  }
  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div className=" container">
      <h2 className="app-title text-white py-3 text-center">
        CIT EXAMINATION FINDER
      </h2>
      <div className="app-searching w-80 mx-auto text-white ">
        <MDBInput
          label="Search by name..."
          size="lg"
          className="text-white text-center"
        />
      </div>
    </div>
  );
}

export default App;
