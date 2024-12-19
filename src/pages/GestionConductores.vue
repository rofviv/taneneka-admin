<template>
  <q-page class="q-pa-lg">
    <!-- <div style="width: 100%" class="text-right q-mb-md">
      <q-btn color="primary" @click="crearNuevo">Crear Nuevo</q-btn>
    </div> -->
    <q-table
      title="Conductores"
      :data="listaConductores"
      :columns="columns"
      row-key="id_solicitud"
      no-data-label="No hay registros"
      rows-per-page-label="Registros por página"
      :rows-per-page-options="[15, 50, 100, 0]"
      :filter="filter"
    >
    <template v-slot:top-right>
        <q-input outlined square dense debounce="300" v-model="filter" placeholder="Buscar">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
    <template v-slot:body-cell-activo="props">
        <q-td :props="props">
          <div v-if="props.value > 0">
            <q-chip
              style="color: white;"
              color="primary"
              label="Activo"
            >
            </q-chip>
          </div>
          <div v-else>
            <q-chip style="color: white;" color="negative" label="Inactivo">
            </q-chip>
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            size="xs"
            flat
            color="secondary"
            @click="detallesConductor(props)"
            >Detalles</q-btn
          >
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script>
export default {
  created() {
    this.getConductores();
  },
  data () {
    return {
      filter: "",
      columns: [
        {
          name: 'nombre',
          required: true,
          label: 'Nombre del conductor',
          align: 'left',
          field: 'nombre',
          sortable: true
        },
        { name: 'ciudad', label: 'Ciudad', field: 'ciudad', sortable: true },
        { name: 'celular', label: 'Teléfono', field: 'celular', sortable: true },
        { name: 'cedula_identidad', label: 'Cédula de identidad', field: 'cedula_identidad', sortable: true },
        { name: 'placa', label: 'Placa', field: 'placa', sortable: true },
        { name: 'empresa_transporte', label: 'Empresa de transporte', field: 'empresa_transporte', sortable: true },
        { name: 'transporte', label: 'Tipo vehículo', field: 'transporte', sortable: true },
        { name: 'ultima_sincronizacion', label: 'última sincronización', field: 'ultima_sincronizacion', sortable: true },
        { name: 'activo', label: 'Estado  ', field: 'activo', sortable: true },
        // {
        //   name: "actions",
        //   label: "Acciones",
        //   field: "actions",
        //   sortable: false
        // }
      ],
      listaConductores: []
    }
  },
  methods: {
    async getConductores() {
      const URI =
        "https://tanenek.com/api/?route=admin&type=obtener_todos_conductores";
      try {
        const res = await this.$axios.get(URI);
        this.listaConductores = res.data;
        console.log(this.listaConductores);
      } catch (error) {
        console.log("NO se obtuvo los conductores", error);
      }
    },
    crearNuevo() {

    },
    detallesConductor(conductor) {
      console.log(conductor.row)
    }
  },
  
}
</script>
