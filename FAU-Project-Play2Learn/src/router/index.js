// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import StartScreen from '../views/StartScreen.vue';
import AnagramStart from '../views/AnagramStart.vue';
import AnagramPlay from '../views/AnagramPlay.vue';
import AnagramGameOver from '../views/AnagramGameOver.vue';

import MathStart from '../views/MathStart.vue';
import MathPlay from '../views/MathPlay.vue';
import MathGameOver from '../views/MathGameOver.vue';

const routes = [
  {
    path: '/',
    name: 'StartScreen',
    component: StartScreen,
  },
    {
    path: '/anagram',
    name: 'AnagramStart',
    component: AnagramStart,
  },
  {
    path: '/anagram/play',
    name: 'AnagramPlay',
    component: AnagramPlay,
  },
  {
    path: '/anagram/game-over',
    name: 'AnagramGameOver',
    component: AnagramGameOver,
  },
  {
    path: '/math',
    name: 'MathStart',
    component: MathStart,
  },
  {
    path: '/math/play',
    name: 'MathPlay',
    component: MathPlay,
  },
  {
    path: '/math/game-over',
    name: 'MathGameOver',
    component: MathGameOver,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;