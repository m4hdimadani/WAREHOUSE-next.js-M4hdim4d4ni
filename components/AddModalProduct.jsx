import styles from "./AddModalProduct.module.css";

import { useNewProducts } from "../services/productApi";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

function AddModalProduct({ setModalOpen }) {
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  const queryClient = useQueryClient();
  const { mutate, isLoading } = useNewProducts();

  const addProductHandler = (e) => {
    e.preventDefault();
    const newProduct = {
      name: productName,
      quantity: Number(quantity),
      price: Number(price),
    };

    mutate(newProduct, {
      onSuccess: () => {
        setModalOpen(false);
        queryClient.invalidateQueries("product");
      },
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3> ایجاد محصول جدید </h3>
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
          <p>نام کالا</p>
          <input
            type="text"
            placeholder="نام کالا"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <p>تعداد موجودی</p>
          <input
            type="number"
            placeholder="تعداد"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <p>قیمت</p>
          <input
            type="number"
            placeholder="قیمت"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </form>
        <div className={styles.button}>
          <button
            type="button"
            onClick={addProductHandler}
            disabled={isLoading}
          >
            {isLoading ? "ایجاد" : "درحال انجام ..."}
          </button>
          <button onClick={() => setModalOpen(false)}>انصراف</button>
        </div>
      </div>
    </div>
  );
}

export default AddModalProduct;
