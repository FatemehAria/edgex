import { intercepter, mock } from "../config";
import { fileDataBase } from "./uploadMedia.mock";

const UploadedMedia = [
  {
    id: Math.ceil(Math.random()) * 1000,
    url: '../assets/media/G-gp-921-600x492.jpg',
  },
];

mock.mock('/media/uploadedMedia', 'get' , intercepter(fileDataBase))