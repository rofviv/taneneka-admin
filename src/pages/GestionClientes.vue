<template>
  <q-page  class="q-pa-lg">
    <q-table
      title="Clientes"
      :data="listaClientes"
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
            class="text-negative"
            @click="bloquearCliente(props)"
            >Bloquear</q-btn
          >
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script>
export default {
  created() {
    this.getClientes();
  },
  data () {
    return {
      filter: "",
      columns: [
        // {
        //   name: 'id',
        //   required: true,
        //   label: 'Id',
        //   align: 'left',
        //   field: 'id',
        //   sortable: true
        // },
        { name: 'nombre', align: 'left', label: 'Nombre', field: 'nombre', sortable: true },
        { name: 'telefono', label: 'Teléfono', field: 'telefono', sortable: true },
        { name: 'email', label: 'Email', field: 'email', sortable: true },
        { name: 'creado_en', label: 'Registro', field: 'creado_en', sortable: true },
        { name: 'activo', label: 'Estado  ', field: 'activo', sortable: true },
        // {
        //   name: "actions",
        //   label: "Acciones",
        //   field: "actions",
        //   sortable: false
        // }
      ],
      listaClientes: []
    }
  },
  methods: {
    async getClientes() {
      const URI =
        "https://tanenek.com/api/?route=admin&type=obtener_todos_clientes";
      try {
        const res = await this.$axios.get(URI);
        this.listaClientes = res.data;
        console.log(this.listaClientes);
      } catch (error) {
        console.log("NO se obtuvo los clientes", error);
      }
    },
    bloquearCliente(cliente) {
      console.log(cliente.row)
    }
  },
}
</script>
