import { LocalStorage } from 'quasar'

export const usuario = {
  namespaced: true,
  state: {
    id_usuario: LocalStorage.getItem('tnnk_id_usuario') || null,
    nombre_usuario: "",

  },
  getters: {
    getUsuario: state => {
      return {
        id_usuario: state.id_usuario,
        nombre_usuario: state.nombre_usuario,
      }
    }
  },
  mutations: {
    guardarUsuario(state, payload) {
      state.id_usuario = payload.id;
      state.nombre_usuario = payload.nombre;
      LocalStorage.set('tnnk_id_usuario', state.id_usuario);
    },
    borrarUsuario(state) {
      state.id_usuario = null;
      state.nombre_usuario = "";
      LocalStorage.remove('tnnk_id_usuario');
    }
  }
}