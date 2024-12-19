import Vue from 'vue'
import Vuex from 'vuex'

import { usuario } from './usuario';

Vue.use(Vuex)

export default function () {
  const Store = new Vuex.Store({
    modules: {
      usuario
    },

    strict: process.env.DEBUGGING
  })

  return Store
}
