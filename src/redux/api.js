import axios from "axios";
//const API = axios.create({baseURL: "http://localhost:4700" });
const API = axios.create({baseURL: "https://testtourpediaac.herokuapp.com" });

API.interceptors.request.use((req) => {
    if (localStorage.getItem("profile")) {
      req.headers.Authorization = `Bearer ${
        JSON.parse(localStorage.getItem("profile")).token
      }`;
    }
    return req;
  });

export const signIn = (FormData) => API.post("/users/signin",FormData);
export const signUp = (FormData) => API.post("/users/signup",FormData);
export const googleSignIn = (result) => API.post("/users/googleSignIn", result);

export const createTour = (tourData) => API.post("/tour", tourData);

export const getTours = () => API.get("/tour");
export const getTour = (id) => API.get(`/tour/${id}`);


export const deleteTour = (id) => API.delete(`/tour/${id}`);
export const updateTour = (updatedTourData,id) => API.patch(`/tour/${id}`, updatedTourData);

export const getToursByUser = (userId) => API.get(`/tour/userTours/${userId}`); 
