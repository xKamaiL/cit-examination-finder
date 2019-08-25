import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { withRouter, Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import store from './store';
function ShowFiles({ match, history }) {
  const [initial, setInitial] = useState(false);
  useEffect(() => {
    store.term = match.params.term;
    store.part = match.params.part;
    // store.fetchFiles();
    setInitial(true);
  }, [history, match]);
  if (!initial) return null;
  const data = store.data[`term${store.term}`][store.part];
  return <div className="text-white">{JSON.stringify(data.length)}</div>;
}

export default withRouter(observer(ShowFiles));
