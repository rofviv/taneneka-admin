<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Taneneka Admin
        </q-toolbar-title>

        <div><q-btn flat @click="logout">Salir</q-btn></div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label header class="text-grey-8">
          Menu de navegación
        </q-item-label>
        <q-item exact clickable :to="{ name: 'tablero' }" v-ripple>
          <q-item-section avatar>
            <q-icon name="fas fa-tachometer-alt" />
          </q-item-section>

          <q-item-section>
            Tablero
          </q-item-section>
        </q-item>
        <q-item exact clickable :to="{ name: 'gestion-solicitud' }" v-ripple>
          <q-item-section avatar>
            <q-icon name="fas fa-dolly" />
          </q-item-section>

          <q-item-section>
            Gestión de solicitud
          </q-item-section>
        </q-item>
        <q-item exact clickable :to="{ name: 'gestion-clientes' }" v-ripple>
          <q-item-section avatar>
            <q-icon name="fas fa-users" />
          </q-item-section>

          <q-item-section>
            Gestión de clientes
          </q-item-section>
        </q-item>
        <q-item exact clickable :to="{ name: 'gestion-conductores' }" v-ripple>
          <q-item-section avatar>
            <q-icon name="fas fa-user-tag" />
          </q-item-section>

          <q-item-section>
            Gestión de conductores
          </q-item-section>
        </q-item>
        <q-item exact clickable :to="{ name: 'mapa-conductores' }" v-ripple>
          <q-item-section avatar>
            <q-icon name="fas fa-map-marked" />
          </q-item-section>

          <q-item-section>
            Mapa de conductores
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "MainLayout",
  created() {
    this.checkUsuario();
  },
  data() {
    return {
      leftDrawerOpen: false
    };
  },
  methods: {
    checkUsuario() {
      if (this.$store.getters["usuario/getUsuario"].id_usuario != null) {
        // Verificar usuario
      } else {
        this.$router.replace("/login");
      }
    },
    async logout() {
      this.$store.commit("usuario/borrarUsuario");
      this.$router.replace("/login");
    }
  }
};
</script>
