import { config } from 'dotenv';
import axios from 'axios';

config();

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2MjI2MjExODgsImV4cCI6MTYyMjYyNDc4OCwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoia2FsbGVieUBlbWFpbC5jb20ifQ.mzrtU29YDHt1aFQSxYlCQovyFvsAKQzbRxzCBlsD40iOKcFOKjKPysprfYOk0gAnuSCDN5SzhGuYMlYXtLulyAkjCJZUoYjP6Wu9q3UEcKl4u_D2fgzowWtuWW8Dz8H3qI3WJz_8_lD1eq0NVNOhr6sZtDby4QZ7gHBGi31sgk-ZBLC_xwT66j2yRIv3RUUsPitPkeHJVOi10CT3jFjO2NaRF_A2py461xIMaUMirxX6nnXNepw3zGzn-wKunSv3Wm-_wvBpYB1bEw-vCNWz2W02BBOOlgfSm1lYSdbdY_YX5GbGmPa44ShU_t7mtxYkIUIMFjxEE4IcUKEEI4A4EQ';

const api = axios.create({
  baseURL: process.env.API_HOST,
  headers: { Authorization: `Bearer ${token}` },
});

export default api;
