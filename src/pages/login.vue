<template>
  <div class="row wrap justify-center">
    <q-card class="col q-mt-lg q-mx-md" style="min-width:250px; max-width: 500px;">
      <q-form @submit="login">
        <q-card-section class="text-h6">
          <q-icon name="lock"></q-icon> Login
        </q-card-section>
        <q-card-section>
          <q-input
            :disable="loadBtn"
            v-model="usuario"
            label="Usuario"
            :rules="[val => (val && val.length > 0) || '']"
          ></q-input>
          <q-input
            :disable="loadBtn"
            type="password"
            v-model="clave"
            label="Contraseña"
            :rules="[val => (val && val.length > 0) || '']"
          ></q-input>
        </q-card-section>
        <q-card-actions>
          <q-btn
            class="full-width"
            :loading="loadBtn"
            color="secondary"
            type="submit"
            >Ingresar</q-btn
          >
        </q-card-actions>
      </q-form>
    </q-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      usuario: "",
      clave: "",
      loadBtn: false
    };
  },
  methods: {
    async login() {
      this.loadBtn = true;
      const URI = "https://tanenek.com/api/?route=admin&type=login";
      const params = new URLSearchParams();
      params.append("usuario", this.usuario);
      params.append("clave", this.clave);
      try {
        const res = await this.$axios.post(URI, params);
        if (res.data.length > 0) {
          this.$store.commit("usuario/guardarUsuario", res.data[0]);
          this.$router.replace("/");
        } else {
          this.$q.notify({
            position: "top",
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: "Usuario o contraseña incorrectos"
          });
        }
      } catch (error) {
        console.log("LOGIN ERROR", error);
      }
      this.loadBtn = false;
    }
  }
};
</script>

<style></style>
