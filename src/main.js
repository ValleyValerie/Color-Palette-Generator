// src/main.js
import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import axios from 'axios';



const axiosInstance = axios.create({
   
  headers: {
    'Content-Type': 'application/json',
  },

});

const app = createApp(App);


app.config.globalProperties.$axios = axiosInstance;

app.mount('#app');

