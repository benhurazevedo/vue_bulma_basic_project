import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    apiPath: "http://localhost:3000",
    jwt: null,
    lista: [],
  },
  getters: {
    getJwt: function(state)
    {
      return state.jwt;
    },
    getLista: function(state)
    {
      return state.lista;
    },
    getApiPath: function(state)
    {
      return state.apiPath;
    }
  },
  mutations: {
    ATRIBUIR_JWT: function(state, varJwt)
    {
      state.jwt = varJwt;
    },
    ATRIBUIR_LISTA: function(state, varLista)
    {
      state.lista = varLista;
    }
  },
  actions: {
    setJwt: function(contexto, varJwt)
    {
      contexto.commit("ATRIBUIR_JWT", varJwt);
    },
    setLista: function(contexto, varLista)
    {
      contexto.commit("ATRIBUIR_LISTA", varLista);
    },
  }/*,
  modules: {
  }*/
})
