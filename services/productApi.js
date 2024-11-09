import api from "../configs/api";
import { useMutation } from "@tanstack/react-query";

const getProducts = () => api.get("products");


const useNewProducts = () => {
  const mutationFn = (data) => api.post("products", data);
  return useMutation({ mutationFn });
};

const useDeleteProduct = () => {
  const mutationFn = (id) => api.delete(`products/${id}`);
  return useMutation({ mutationFn });
}
const useEditProduct = () => {
  const mutationFn = (id) => api.put(`products/${id}`);
  return useMutation({ mutationFn });
}

export { getProducts, useNewProducts,  useDeleteProduct, useEditProduct};
