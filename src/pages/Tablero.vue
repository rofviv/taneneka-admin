<template>
  <q-page class="q-pa-lg">
    <div class="row q-gutter-lg justify-center">
      <q-card class="card-reporte">
        <q-card-section horizontal class="row justify-center items-center">
          <q-card-section class="col-7">
            <div class="text-h4">{{ datos.cant_orden_total }}</div>
            <div class="text-subtitle2 text-weight-light">
              Solicitudes recibidas
            </div>
          </q-card-section>

          <div class="col-5 text-center ">
            <q-icon name="fas fa-dolly" class="icono-grande"></q-icon>
          </div>
        </q-card-section>
      </q-card>

      <q-card class="card-reporte">
        <q-card-section horizontal class="row justify-center items-center">
          <q-card-section class="col-7">
            <div class="text-h4">{{ datos.cant_cliente }}</div>
            <div class="text-subtitle2 text-weight-light">
              Clientes registrados
            </div>
          </q-card-section>

          <div class="col-5 text-center ">
            <q-icon name="fas fa-users" class="icono-grande"></q-icon>
          </div>
        </q-card-section>
      </q-card>

      <q-card class="card-reporte">
        <q-card-section horizontal class="row justify-center items-center">
          <q-card-section class="col-7">
            <div class="text-h4">{{ datos.cant_conductores }}</div>
            <div class="text-subtitle2 text-weight-light">
              Conductores activos
            </div>
          </q-card-section>

          <div class="col-5 text-center ">
            <q-icon name="fas fa-user-tag" class="icono-grande"></q-icon>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div class="row q-gutter-lg justify-center">
      
    </div>
  </q-page>
</template>

<script>
export default {
  created() {
    this.cargarDatos();
  },
  data() {
    return {
      datos: {}
    };
  },
  methods: {
    async cargarDatos() {
      const URI =
        "https://tanenek.com/api/?route=admin&type=contador_registros";
      try {
        const res = await this.$axios.get(URI);
        console.log(res.data);
        this.datos = res.data[0];
      } catch (error) {
        console.log("Error en los datos", error);
      }
    }
  }
};
</script>

<style scoped>
.card-reporte {
  width: 300px;
}
.icono-grande {
  font-size: 50px;
  opacity: 0.7;
  color: var(--q-color-secondary);
}
</style>
