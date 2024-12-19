
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'tablero', component: () => import('pages/Tablero.vue') },
      { path: '/gestion-solicitud', name: 'gestion-solicitud', component: () => import('pages/GestionSolicitud.vue') },
      { path: '/gestion-clientes', name: 'gestion-clientes', component: () => import('pages/GestionClientes.vue') },
      { path: '/gestion-conductores', name: 'gestion-conductores', component: () => import('pages/GestionConductores.vue') },
      { path: '/mapa-conductores', name: 'mapa-conductores', component: () => import('pages/MapaConductores.vue') },
    ]
  },
  {
    path: '/login',
    component: () => import('pages/login.vue'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
