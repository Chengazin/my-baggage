// src/router.js
import { createRouter, createWebHistory } from 'vue-router'
// Стало
import TicketPage from '../pages/TicketsPage.vue';
import CheckPage from '../pages/BaggageCheck.vue';
import ProfilePage from '../pages/ProfilePage.vue';
import NotFoundPage from '../pages/404Page.vue';
import MainPage from '../pages/MainPage.vue'

const routes = [
    { path: '/', component: MainPage },
    { path: '/get-ticket', component: TicketPage },
    { path: '/check-bag', component: CheckPage },
    { path: '/profile', component: ProfilePage },
    {
        path: '/:catchAll(.*)',  // специальный маршрут для всех несуществующих путей
        name: 'NotFound',
        component: NotFoundPage,
      },
]

const router = createRouter({
    history: createWebHistory(), // Обычно используют createWebHistory для сайтов
    routes,
})

export default router
