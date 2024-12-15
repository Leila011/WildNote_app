const backendUrl =
   import.meta.env.MODE === "development"
     ? import.meta.env.VITE_BACKEND_URL_DEV
     : import.meta.env.VITE_BACKEND_URL_PROD;

 export { backendUrl };

//export const backendUrl = "https://leila011.pythonanywhere.com"
