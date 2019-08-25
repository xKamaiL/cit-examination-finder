import { observable, action } from 'mobx';
import axios from 'axios';
const APP_ENTRY_POINT =
  'https://us-central1-cit-examination.cloudfunctions.net/api';

class mainStore {
  @observable loading = true;
  @observable data = {
    term1: {
      midterm: [],
      final: []
    },
    term2: {
      midterm: [],
      final: []
    }
  };
  @observable term = null;
  @observable part = null;
  @action
  async fetchFiles() {
    await axios
      .get(APP_ENTRY_POINT)
      .then(response => response.data)
      .then(data => {
        this.data = data;
      })
      .catch(error => {});
    this.loading = false;
  }
}
const store = new mainStore();
export default store;
