<template>
  <q-page class="q-pa-lg">
    <q-dialog v-model="dialogDetalle">
      <q-card style="min-width: 250px; width: 800px">
        <q-card-section>
          <div class="text-center">
            <h6 class="q-my-xs">
              ID Solicitud: {{ detalleSeleccion.id_solicitud }}
            </h6>
          </div>
          <div class="text-center">
            <q-badge
              v-if="detalleSeleccion.estado_orden == 1"
              class="cursor-pointer"
              color="blue"
              label="Pendiente de revisión"
            />
            <q-badge
              v-else-if="detalleSeleccion.estado_orden == 2"
              class="cursor-pointer"
              color="primary"
              label="Aprobado"
            />
            <q-badge
              v-else-if="detalleSeleccion.estado_orden == 3"
              class="cursor-pointer"
              color="orange"
              label="Pendiente de aprobación"
            />
            <q-badge
              v-else-if="detalleSeleccion.estado_orden == 4"
              class="cursor-pointer"
              color="orange"
              label="En proceso"
            />
            <q-badge
              v-else-if="detalleSeleccion.estado_orden == 5"
              class="cursor-pointer"
              color="orange"
              label="Finalizado"
            />
            <q-badge
              v-else
              class="cursor-pointer"
              color="negative"
              label="Cancelado"
            />
          </div>
          <div class="text-center">
            {{ detalleSeleccion.creado_en }}
          </div>
          <div>
            <div class="q-my-xs text-primary">Datos del cliente:</div>
            <q-separator></q-separator>
            <div>
              Nombre:
              <span class="text-subtitle2">{{
                detalleSeleccion.nombre_cliente
              }}</span>
              <br />
              Contacto:
              <span class="text-subtitle2">{{
                detalleSeleccion.telefono_cliente
              }}</span>
              <br />
              Email:
              <span class="text-subtitle2">{{
                detalleSeleccion.email_cliente
              }}</span>
              <br />
              Imagen NIT:
              <template v-if="detalleSeleccion.url_nit != null && detalleSeleccion.url_nit != ''">
                <a :href="detalleSeleccion.url_nit" target="_blank">Ver imagen</a>
              </template>
              <template v-else>
                -
              </template>
              <br />
            </div>
            <div class="q-pt-md q-my-xs text-primary">
              Detalle de la solicitud:
            </div>
            <q-separator></q-separator>
            <div>
              Tipo de transporte:
              <span class="text-subtitle2">{{
                detalleSeleccion.tipo_transporte
              }}</span>
              <br />
              Ciudad origen:
              <span class="text-subtitle2"
                >{{ detalleSeleccion.ciudad_origen }},
                {{ detalleSeleccion.pais_origen }}</span
              >
              <span class="text-caption q-mr-sm">
                {{ detalleSeleccion.direccion_origen }}</span
              >
              <a
                :href="
                  `https://www.google.com/maps?q=${detalleSeleccion.lat_origen},${detalleSeleccion.lng_origen}&z=15&hl=es`
                "
                target="_blank"
                >Ver ubicación</a
              >
              <br />
              Ciudad destino:
              <span class="text-subtitle2"
                >{{ detalleSeleccion.ciudad_destino }}
                {{ detalleSeleccion.pais_destino }}</span
              >
              <span class="text-caption q-mr-sm">
                {{ detalleSeleccion.direccion_destino }}</span
              >
              <a
                :href="
                  `https://www.google.com/maps?q=${detalleSeleccion.lat_destino},${detalleSeleccion.lng_destino}&z=15&hl=es`
                "
                target="_blank"
                >Ver ubicación</a
              >
              <br />
              Tipo de mercancía:
              <span class="text-subtitle2">{{
                detalleSeleccion.tipo_mercancia
              }}</span>
              <br />
              Tipo de camión:
              <span class="text-subtitle2"
                >{{ detalleSeleccion.tipo_camion }}
                {{ detalleSeleccion.tipo_camion_2 }}</span
              >
              <br />
              Descrición de la carga:
              <span class="text-subtitle2">{{
                detalleSeleccion.descripcion_carga || "Sin descripción"
              }}</span>
              <br />
              Fecha programada:
              <span class="text-subtitle2">{{
                detalleSeleccion.fecha_programada
              }}</span>
              <br />
            </div>
            <div class="q-pt-md q-my-xs text-primary">
              Detalles del servicio:
            </div>
            <q-separator></q-separator>
            <div>
              ID de rastreo:
              <q-badge color="blue"
                ><span>{{
                  detalleSeleccion.id_rastreo || "No asignado"
                }}</span></q-badge
              >
              <br />
              Costo del servicio (USD):
              <span class="text-subtitle2">{{
                detalleSeleccion.costo_servicio
                  ? `${detalleSeleccion.costo_servicio} USD`
                  : "No asignado"
              }}</span>
              <br />
              Cotización seleccionada (USD):
              <template v-if="detalleSeleccion.cotizacion_seleccionada">
                <span class="text-subtitle2">
                  {{
                    detalleSeleccionCotizacion[
                      detalleSeleccion.cotizacion_seleccionada
                    ].forma_pago
                  }}</span
                >
              </template>
              <template v-else>
                <span class="text-subtitle2"> No seleccionado</span>
              </template>
              <br />
              Depósito:
              <template v-if="detalleSeleccion.url_comprobante">
                <a :href="detalleSeleccion.url_comprobante" target="_blank"
                  >Ver comprobante</a
                >
              </template>
              <template v-else>
                <span class="text-subtitle2">No realizado</span>
              </template>

              <br />
              <div class="q-pt-md q-my-xs text-primary">
                Detalles del conductor:
              </div>
              <q-separator></q-separator>
              Conductor asignado:
              <span class="text-subtitle2">{{
                detalleSeleccion.nombre_conductor || "No asignado"
              }}</span>
              <br />
              Contacto conductor:
              <span class="text-subtitle2">{{
                detalleSeleccion.celular_conductor || "-"
              }}</span>
              <br />
              Placa conductor:
              <span class="text-subtitle2">{{
                detalleSeleccion.placa_conductor || "-"
              }}</span>
              <br />
              Empresa de transporte:
              <span class="text-subtitle2">{{
                detalleSeleccion.empresa_conductor || "-"
              }}</span>
              <br />
            </div>
          </div>
        </q-card-section>
        <q-card-section v-if="detalleSeleccion.estado_orden == 1">
          <q-form @submit="enviarCotizacion">
            <div class="text-primary">
              Acciones
            </div>
            <q-separator></q-separator>
            <div class="text-center q-mt-xs text-caption">
              Envía la cotización del servicio y espera la aprobación del
              cliente
            </div>
            <div>
              <div class="text-caption q-mt-xs text-center">
                <b>Cotización</b>
              </div>
              <q-input
                hint="Ingrsa el valor de la cotización (Solo números)"
                :rules="[
                  v => !!v || 'Debes ingresar la cotización',
                  v => v > 0 || 'Debe ser mayor a 0'
                ]"
                style="width: 50%; margin: auto;"
                placeholder="0"
                dense
                class="q-py-xs"
                outlined
                v-model="precio_cotizacion"
                type="number"
                prefix="USD"
              />
              <q-separator class="q-mt-lg" />
              <div class="row text-center q-py-xs text-subtitle2">
                <div class="col">
                  Forma de Pago
                </div>
                <div class="col">
                  Interes (%)
                </div>
                <div class="col">
                  1er Pago (USD)
                </div>
                <div class="col">
                  2do Pago (USD)
                </div>
                <div class="col">
                  Total (USD)
                </div>
              </div>
              <q-separator />
              <div class="row text-center q-py-xs ">
                <div class="col">
                  50 % Anticipo
                </div>
                <div class="col">
                  2
                </div>
                <div class="col">
                  {{
                    parseFloat((precio_cotizacion_50 * 0.5).toString()).toFixed(
                      2
                    )
                  }}
                </div>
                <div class="col">
                  {{
                    parseFloat((precio_cotizacion_50 * 0.5).toString()).toFixed(
                      2
                    )
                  }}
                </div>
                <div class="col">
                  {{ precio_cotizacion_50 }}
                </div>
              </div>
              <q-separator />
              <div class="row text-center q-py-xs">
                <div class="col">
                  30 % Anticipo
                </div>
                <div class="col">
                  5
                </div>
                <div class="col">
                  {{
                    parseFloat((precio_cotizacion_30 * 0.3).toString()).toFixed(
                      2
                    )
                  }}
                </div>
                <div class="col">
                  {{
                    parseFloat((precio_cotizacion_30 * 0.7).toString()).toFixed(
                      2
                    )
                  }}
                </div>
                <div class="col">
                  {{ precio_cotizacion_30 }}
                </div>
              </div>
              <q-separator />
              <div class="row text-center q-py-xs">
                <div class="col">
                  Al Contado
                </div>
                <div class="col">
                  0
                </div>
                <div class="col">
                  {{ precio_cotizacion || 0 }}
                </div>
                <div class="col">
                  0
                </div>
                <div class="col">
                  {{ precio_cotizacion || 0 }}
                </div>
              </div>
              <q-separator></q-separator>
              <div class="text-center q-mt-xs text-caption">
                * Estadías de 150 usd luego de 2 días hábiles por demoras ajenas al transportistas <br>
                * Add 14% al flete en caso de precisar factura con iva boliviano.
              </div>
              <div class="q-mt-lg text-center">
                <q-btn
                  type="submit"
                  flat
                  class="text-primary"
                  label="Enviar cotización"
                />
              </div>
            </div>
          </q-form>
        </q-card-section>
        <q-card-section v-else-if="detalleSeleccion.estado_orden == 2">
          <q-form @submit="actualizarSolicitud">
            <div class="text-primary">
              Acciones
            </div>
            <q-separator></q-separator>
            <div class="text-center q-mt-xs text-caption">
              Envía el ID de rastreo y asigna a un conductor
            </div>
            <div>
              <div class="text-caption q-mt-xs text-center">
                <b>ID Rastreo se generará automáticamente</b>
              </div>
              <!-- <q-input
                readonly
                :rules="[v => !!v || 'Ingresa el ID de Rastreo']"
                style="width: 50%; margin: auto;"
                placeholder="TNK_2020019"
                dense
                class="q-py-xs"
                outlined
                v-model="idRastreo"
                hint="Generado automáticamente"
              /> -->
              <div class="text-caption q-mt-lg text-center">
                <b>Selecciona un conductor</b>
              </div>
              <q-select
                option-value="id"
                option-label="nombre"
                :rules="[v => !!v || 'Selecciona un conductor']"
                dense
                outlined
                style="width: 50%; margin: auto;"
                v-model="conductorSeleccionado"
                :options="conductorOpciones"
              />
              <div class="q-mt-md text-center">
                <q-btn
                  type="submit"
                  flat
                  class="text-primary"
                  label="Actualizar"
                />
              </div>
            </div>
          </q-form>
        </q-card-section>
        <!-- <q-card-section v-else-if="detalleSeleccion.estado_orden == 4">
          <div class="text-primary">
            Acciones
          </div>
          <q-separator></q-separator>
          <div class="text-center q-mt-xs text-caption">
            Puedes marcar como completado 
          </div>
        </q-card-section> -->
      </q-card>
    </q-dialog>
    <q-table
      title="Listado de Solicitudes"
      :data="data"
      :columns="columns"
      row-key="id_solicitud"
      no-data-label="No hay registros"
      rows-per-page-label="Registros por página"
      :rows-per-page-options="[15, 50, 100, 0]"
      :filter="filter"
    >
      <template v-slot:top-right>
        <q-input
          outlined
          square
          dense
          debounce="300"
          v-model="filter"
          placeholder="Buscar"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:body-cell-costo_servicio="props">
        <q-td :props="props">
          <div v-if="props.value > 0">
            <q-chip
              style="color: white;"
              color="primary"
              :label="`${props.value} USD`"
            >
            </q-chip>
          </div>
          <div v-else>
            <q-chip style="color: white;" color="negative" label="No asignado">
            </q-chip>
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-id_rastreo="props">
        <q-td :props="props">
          <q-badge class="cursor-pointer" color="blue" :label="props.value">
          </q-badge>
        </q-td>
      </template>
      <template v-slot:body-cell-estado_orden="props">
        <q-td :props="props">
          <div v-if="props.value == 1">
            <q-badge
              class="cursor-pointer"
              color="blue"
              label="Pendiente de revisión"
            />
          </div>
          <div v-else-if="props.value == 2">
            <q-badge class="cursor-pointer" color="primary" label="Aprobado" />
          </div>
          <div v-else-if="props.value == 3">
            <q-badge
              class="cursor-pointer"
              color="orange"
              label="Pendiente de aprobación"
            />
          </div>
          <div v-else-if="props.value == 4">
            <q-badge class="cursor-pointer" color="orange" label="En proceso" />
          </div>
          <div v-else-if="props.value == 5">
            <q-badge
              class="cursor-pointer"
              color="positive"
              label="Finalizado"
            />
          </div>
          <div v-else>
            <q-badge
              class="cursor-pointer"
              color="negative"
              label="Cancelado"
            />
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-nombre_usuario="props">
        <q-td :props="props">
          <div>
            {{ props.value == null ? '-' : props.value }}
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            size="xs"
            flat
            color="secondary"
            @click="detallesSolicitud(props)"
            >Detalles</q-btn
          >
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import moment from "moment";
moment.locale("es");

export default {
  created() {
    this.obtenerSolicitudes();
    this.getConductores();
  },
  data() {
    return {
      moment: moment,
      filter: "",
      idRastreo: "",
      conductorSeleccionado: "",
      conductorOpciones: [],
      precio_cotizacion: "",
      precio_cotizacion_50: 0,
      precio_cotizacion_30: 0,
      dialogDetalle: false,
      detalleSeleccion: {},
      detalleSeleccionCotizacion: [],
      columns: [
        {
          name: "id_solicitud",
          required: true,
          label: "ID Solicitud",
          align: "center",
          field: "id_solicitud",
          sortable: true
        },
        {
          name: "id_rastreo",
          align: "center",
          label: "ID Rastreo",
          field: "id_rastreo",
          sortable: true
        },
        {
          name: "ciudad_origen",
          align: "center",
          label: "Ciudad Origen",
          field: "ciudad_origen",
          sortable: true
        },
        {
          name: "ciudad_destino",
          align: "center",
          label: "Ciudad Destino",
          field: "ciudad_destino",
          sortable: true
        },
        // { name: 'tipo_transporte', align: 'center',label: 'Tipo Transporte', field: 'tipo_transporte', sortable: true },
        {
          name: "fecha_programada",
          align: "center",
          label: "Fecha Programada",
          field: "fecha_programada",
          sortable: true
        },
        {
          name: "creado_en",
          align: "center",
          label: "Fecha Solicitud",
          field: "creado_en",
          sortable: true
        },
        {
          name: "tipo_mercancia",
          label: "Tipo de Mercancía",
          field: "tipo_mercancia",
          sortable: true
        },
        {
          name: "nombre_cliente",
          label: "Cliente",
          field: "nombre_cliente",
          sortable: true
        },
        {
          name: "telefono_cliente",
          label: "Contacto cliente",
          field: "telefono_cliente",
          sortable: true
        },
        {
          name: "costo_servicio",
          align: "center",
          label: "Costo del servicio (USD)",
          field: "costo_servicio",
          sortable: true
        },
        {
          name: "estado_orden",
          label: "Estado",
          field: "estado_orden",
          sortable: true
        },
        {
          name: "nombre_usuario",
          label: "Usuario",
          field: "nombre_usuario",
          sortable: true
        },
        {
          name: "actions",
          label: "Acciones",
          field: "actions",
          sortable: false
        }
      ],
      data: []
    };
  },
  methods: {
    async getConductores() {
      this.conductorOpciones = [];
      const URI =
        "https://tanenek.com/api/?route=admin&type=obtener_todos_conductores";
      try {
        const res = await this.$axios.get(URI);
        this.conductorOpciones = res.data;
        console.log(res.data);
      } catch (error) {
        console.log("NO se obtuvo los conductores", error);
      }
    },
    async obtenerSolicitudes() {
      const URI =
        "https://tanenek.com/api/?route=admin&type=obtener_todas_solicitudes_aux";
      try {
        const res = await this.$axios.get(URI);
        console.log(res.data);
        this.data = res.data;
      } catch (error) {
        console.log("NO se pudo obtener las solicitudes", error);
      }
    },
    detallesSolicitud(props) {
      console.log(props.row);
      this.detalleSeleccion = props.row;
      this.detalleSeleccionCotizacion = JSON.parse(props.row.cotizacion_JSON);
      console.log(this.detalleSeleccionCotizacion);
      this.dialogDetalle = true;
    },
    async enviarCotizacion() {
      this.$q.loading.show();
      const URI =
        "https://tanenek.com/api/?route=admin&type=enviar_cotizacion_aux";

      let cotizacion_json = [
        {
          forma_pago: "50 % Anticipo / Saldo contra-entrega",
          interes: 2,
          pago_1: parseFloat(
            (this.precio_cotizacion_50 * 0.5).toString()
          ).toFixed(2),
          pago_2: parseFloat(
            (this.precio_cotizacion_50 * 0.5).toString()
          ).toFixed(2),
          total: this.precio_cotizacion_50
        },
        {
          forma_pago: "30 % Anticipo / Saldo contra-entrega",
          interes: 5,
          pago_1: parseFloat(
            (this.precio_cotizacion_30 * 0.3).toString()
          ).toFixed(2),
          pago_2: parseFloat(
            (this.precio_cotizacion_30 * 0.7).toString()
          ).toFixed(2),
          total: this.precio_cotizacion_30
        },
        {
          forma_pago: "Al contado",
          interes: 0,
          pago_1: this.precio_cotizacion,
          pago_2: 0,
          total: this.precio_cotizacion
        }
      ];

      const data = new URLSearchParams();
      data.append("id_solicitud", this.detalleSeleccion.id_solicitud);
      data.append("costo_servicio", this.precio_cotizacion);
      data.append("cotizacion_JSON", JSON.stringify(cotizacion_json));

      data.append("tipo_transporte", this.detalleSeleccion.tipo_transporte);
      data.append("fecha_programada", this.detalleSeleccion.fecha_programada);
      data.append("tipo_mercancia", this.detalleSeleccion.tipo_mercancia);
      data.append("descripcion_carga", this.detalleSeleccion.descripcion_carga);

      data.append("ciudad_origen", this.detalleSeleccion.ciudad_origen);
      data.append("ciudad_destino", this.detalleSeleccion.ciudad_destino);
      data.append("pais_origen", this.detalleSeleccion.pais_origen);
      data.append("pais_destino", this.detalleSeleccion.pais_destino);

      data.append("nombre_cliente", this.detalleSeleccion.nombre_cliente);
      data.append("telefono_cliente", this.detalleSeleccion.telefono_cliente);
      data.append("email_cliente", this.detalleSeleccion.email_cliente);
      data.append("url_nit_cliente", this.detalleSeleccion.url_nit);

      data.append("id_usuario", this.$store.getters["usuario/getUsuario"].id_usuario);

      try {
        const res = await this.$axios.post(URI, data);
        console.log(res.data);
        if (res.data.flag == 1) {
          this.$q.notify({
            message: res.data.message,
            color: "primary",
            position: "center"
          });
          location.reload();
        } else {
          this.$q.notify({
            message: res.data.message,
            color: "negative",
            position: "center"
          });
        }
      } catch (error) {
        console.log("No se pudo actualizar", error);
      }
      this.$q.loading.hide();
    },
    async actualizarSolicitud() {
      let id_rastreo_generado = this.detalleSeleccion.id_solicitud;
      // alert("ID de rastreo generado automáticamente: " + id_rastreo_generado);
      this.$q.loading.show();
      const URI =
        "https://tanenek.com/api/?route=admin&type=actualizar_solicitud_aux";
      const data = new URLSearchParams();
      data.append("id_rastreo", id_rastreo_generado);
      data.append("id_conductor", this.conductorSeleccionado.id);
      data.append("id_solicitud", this.detalleSeleccion.id_solicitud);

      let pago_cotizacion = this.detalleSeleccionCotizacion[this.detalleSeleccion.cotizacion_seleccionada];

      data.append("costo", this.detalleSeleccion.costo_servicio);
      data.append("pago_1", pago_cotizacion.pago_1);
      data.append("pago_2", pago_cotizacion.pago_2);
      data.append("nombre_cliente", this.detalleSeleccion.nombre_cliente);
      data.append("telefono_cliente", this.detalleSeleccion.telefono_cliente);
      data.append("email_cliente", this.detalleSeleccion.email_cliente);
      data.append("url_nit_cliente", this.detalleSeleccion.url_nit);
      data.append("ciudad_origen", this.detalleSeleccion.ciudad_origen);
      data.append("ciudad_destino", this.detalleSeleccion.ciudad_destino);
      data.append("pais_origen", this.detalleSeleccion.pais_origen);
      data.append("pais_destino", this.detalleSeleccion.pais_destino);
      data.append("nombre_conductor",  this.conductorSeleccionado.nombre);
      data.append("placa_conductor",  this.conductorSeleccionado.placa);
      data.append("fecha_programada", this.detalleSeleccion.fecha_programada);

      try {
        const res = await this.$axios.post(URI, data);
        console.log(res.data);
        if (res.data.flag == 1) {
          this.$q.notify({
            message: res.data.message,
            color: "primary",
            position: "center"
          });
          location.reload();
        } else {
          this.$q.notify({
            message: res.data.message,
            color: "negative",
            position: "center"
          });
        }
      } catch (error) {
        console.log("No se pudo actualizar", error);
      }
      this.$q.loading.hide();
    }
  },
  watch: {
    precio_cotizacion: function(val) {
      if (val != "" && val >= 0) {
        this.precio_cotizacion_50 = parseInt(val) + parseInt((val * 2) / 100);
        this.precio_cotizacion_30 = parseInt(val) + parseInt((val * 5) / 100);
      } else {
        this.precio_cotizacion_50 = 0;
        this.precio_cotizacion_30 = 0;
      }
    }
  }
};
</script>
