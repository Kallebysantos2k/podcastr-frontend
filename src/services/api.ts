import { config } from 'dotenv';
import axios from 'axios';

config();

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2MjMzOTg1MjksImV4cCI6MTYyMzQwMjEyOSwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoia2FsbGVieUBlbWFpbC5jb20ifQ.Wv0ppMoC_7H6E94EyPWdPTDTqBNY564geKUVRm1F55lY4rp69zFqEjiq_M6FRqKCEegauzLWGVQVa-0apn8i4FSlk_tOrqI1DgCNXyRVURHWLopjfxmNlQ9s8UC0Hm-cJupfrE66lNe7HBrEpBB48nZreL1LTwyhNWsBazdsxM77T823LjvAD2AzvnhzuSCUfENP5144ZalBRz74dKzQv7Rv4F0N9N30m2sbe7wJ2qPGsFfd7XZGnj8kBfY8trY_T0CXLaXAbE_Oy46QjLqpTtoJNcj8ZnjmcPV81hsSrj3ipDAv0DqGb_vxyhL_8hdMBGmrrb7I0EWvcASKwajs4g';

const api = axios.create({
  baseURL: process.env.API_HOST,
  headers: { Authorization: `Bearer ${token}` },
});

export default api;
