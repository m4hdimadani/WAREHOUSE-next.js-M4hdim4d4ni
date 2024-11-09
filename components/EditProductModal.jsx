import { useEffect, useState } from "react";
import styles from "./EditProductModal.module.css";

function EditProductModal({
  isEditModalOpen,
  setEditModalOpen,
  productData,
  onEditSubmit,
}) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    if (productData) {
      setName(productData.name || "");
      setPrice(productData.price || "");
      setQuantity(productData.quantity || "");
    }
  }, [productData]);

  const handleSubmit = () => {
    const updatedProductData = { name, price, quantity };
    onEditSubmit(productData.id, updatedProductData);
    setEditModalOpen(false);
  };
  return (
    isEditModalOpen && (
      <div className={styles.container}>
        <div className={styles.modal}>
          <h2>ویرایش محصول</h2>
          <p>نام کالا</p>
          <input
            type="text"
            placeholder="نام"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <p>قیمت</p>
          <input
            type="number"
            placeholder="قیمت"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <p>تعداد موجودی</p>
          <input
            type="number"
            placeholder="موجودی"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <div className={styles.button}>
            <button onClick={handleSubmit}>ذخیره تغییرات</button>
            <button onClick={() => setEditModalOpen(false)}>لغو</button>
          </div>
        </div>
      </div>
    )
  );
}

export default EditProductModal;
