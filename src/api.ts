import axios from "axios";

const api = axios.create({
  baseURL:
    "https://s3.us-west-2.amazonaws.com/secure.notion-static.com/a7804447-abeb-473e-be8b-8025c4f624f6/test.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220331T134017Z&X-Amz-Expires=86400&X-Amz-Signature=f64f8c43cdb195e2763813d016e5e58165b14b40643e78829449e0b790bcaa02&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22test.json%22&x-id=GetObject",
});
export const Api = {
  getAllImgs: () => api.get("/").then((res) => res),
};
