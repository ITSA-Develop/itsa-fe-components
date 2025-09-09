// En un archivo como: src/api/securityApi.ts
import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';
// import { useAuthStore } from '@/store/auth.store'; // 1. Importa tu store
import { EMicroFrontends } from '@/enums';
import { clearLocalStorage } from '@/index';


// Puedes crear la instancia base aquí
const initialInstance = axios.create();

// La función que configura la instancia
export const getInstance = (instance: AxiosInstance) => {
	instance.interceptors.request.use(
		async (config: InternalAxiosRequestConfig) => {
			// La configuración se mueve aquí adentro
			// const apiVersion = 'v1'; // O la versión que necesites
			const baseURL = import.meta.env.VITE_API;	
			const finalBaseUrl = `${baseURL}`;

			// 2. Obtén el token del store en cada petición
			const token = null; // useAuthStore.getState().token;

			// Asigna la nueva configuración
			config.baseURL = finalBaseUrl;
			if (config.headers && token) {
				config.headers.Authorization = `Bearer ${token}`;
			}

			return config;
		},
		error => {
			// Es bueno manejar errores aquí también
			return Promise.reject(error);
		},
	);

	instance.interceptors.response.use(
		response => response,
		async error => {
			// Aquí puedes manejar errores globales, como un 401 (token expirado)
			// y ejecutar la lógica de logout o de refrescar el token.
			return Promise.reject(error);
		},
	);

	return instance;
};

// Exporta la instancia ya configurada
export const securityApi = getInstance(initialInstance);

export const logoutAndClearLocalStorage = () => {
	clearLocalStorage();
	window.location.href = EMicroFrontends.itsaBackOffice + '/login';
};
