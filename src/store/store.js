import { createStore } from 'vuex';
import axios from 'axios';

const local = 'http://localhost:8081';

const state = {
  checklists: []
};


const actions = {
  async getChecklists({ commit }) {
    try {
      const response = await axios.get(local + '/checklists');
      commit('SET_CHECKLISTS', response.data);
    } catch (error) {
      console.error( error);
    }
  },
  async newCheckList({ commit }, newList) {
    try {
      const jsonString = JSON.stringify(newList);
      const response = await axios.post(local + '/checklists',jsonString);
      commit('SET_CHECKLISTS', response.data);

      return response;
    } catch (error) {
      console.error(error);
    }
  },


  async  editCheckList({ commit }, newList) {
    try {
      const checklistId = newList.id;

      const response = await axios.put(local+'/put/checklists/' + checklistId, newList);
      commit('SET_CHECKLISTS', response.data);
      return response;
    } catch (error) {
      console.error(error);
    }
  },
  async editTask({ commit }, newList) {
    try {
      const checklistId = newList.listId;
      const response = await axios.put(local+'/put/task/' + checklistId, newList);
      commit('SET_CHECKLISTS', response.data);
      return response;
    } catch (error) {
      console.error(error);
    }
  },


  async deleteChecklist({ commit }, list) {
    try {

      const jsonString = JSON.stringify({id:list.toString()});
      const response = await axios.post(local + '/delete/checklist',jsonString);
      commit('SET_CHECKLISTS', response.data);

      return response;
    } catch (error) {
      console.error(error);
    }
  },
  async deleteTask({ commit },data) {
    try {
      const jsonString = JSON.stringify({id:data.id.toString(), listId:data.listId.toString()});
      const response = await axios.post(local + '/delete/task',jsonString);
      commit('SET_CHECKLISTS', response.data);

      return response;
    } catch (error) {
      console.error(error);
    }
  },


  async newStep({ commit }, newStep) {
    try {
      const jsonString = JSON.stringify(newStep);
      const response = await axios.post(local + '/task',jsonString);
      commit('SET_CHECKLISTS', response.data);

      return response;
    } catch (error) {
      console.error(error);
    }
  },
};
const mutations = {
  SET_CHECKLISTS(state, data) {
    state.checklists = data;
  }
};

const store = createStore({
  state,
  mutations,
  actions
});

export default store;
