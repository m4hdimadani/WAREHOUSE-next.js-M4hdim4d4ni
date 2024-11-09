import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getProducts,
  useDeleteProduct,
  useEditProduct,
} from "../services/productApi";
import { useEffect, useState } from "react";
import { HiOutlineTrash } from "react-icons/hi2";
import { FaRegEdit } from "react-icons/fa";
import { VscSettings } from "react-icons/vsc";
import { CiSearch } from "react-icons/ci";

import styles from "../styles/ProductsPage.module.css";
import AddModalProduct from "../components/AddModalProduct";
import Loading from "../components/Loading";
import toast, { Toaster } from "react-hot-toast";
import EditProductModal from "../components/EditProductModal";


function ProductsPage() {
  const [isModalOpen, setModalOpen] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const queryClient = useQueryClient();
  const [isClient, setIsClient] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  useEffect(() => {
    setIsClient(true);
  }, []);
 
  

  const { mutate: editProduct } = useEditProduct();

  const handleEditSubmit = (updatedProductData) => {
    editProduct(
      { id: editingProduct.id, data: updatedProductData },
      {
        onSuccess: () => {
          toast.success("محصول با موفقیت ویرایش شد");
          queryClient.invalidateQueries("products");
          setEditModalOpen(false);
        },
        onError: (err) => {
          toast.error("خطا در ویرایش محصول");
          console.log(err);
        },
      }
    );
  };
  const editHandler = (product) => {
    setEditingProduct(product);
    setEditModalOpen(true);
  };

  const showHandler = () => {
    setModalOpen(true);
  };
  const { mutate } = useDeleteProduct();

  const deleteHandler = (id) => {
    mutate(id, {
      onSuccess: () => {
        toast.success("محصول با مفقیت حذف شد");
        queryClient.invalidateQueries("products");
      },
      onError: (err) => {
        toast.error("خطا نا موفق");
        console.log(err);
      },
    });
  };
  if (!isClient) return null

  return (
    <>
      <div className={styles.body}>
        <div>
          <Toaster position="top-center" reverseOrder={false} />
        </div>
        <div className={styles.box}>
          <div className={styles.search}>
            <span>
              <CiSearch />
            </span>
            <input type="text" placeholder="جستجو کالا" />
          </div>
          <div className={styles.manage}>
            <div className={styles.manage_product}>
              <h2>مدیریت کالا</h2>
              <span>
                <VscSettings />
              </span>
            </div>
            <div className={styles.add_product}>
              <button onClick={showHandler}>افزودن محصول</button>
              {!!isModalOpen && (
                <AddModalProduct
                  isModalOpen={isModalOpen}
                  setModalOpen={setModalOpen}
                />
              )}
            </div>
          </div>

          <table className={styles.table}>
            <thead>
              <tr>
                <th>نام کالا</th>
                <th>موجودی </th>
                <th> قیمت</th>
                <th> شناسه کالا</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <Loading />
              ) : (
                data?.data?.data.map((i) => (
                  <tr key={i.id}>
                    <td>{i.name}</td>
                    <td>{i.quantity}</td>
                    <td>
                      <span className={styles.priceValue}>{i.price}</span>
                      <span className={styles.priceUnit}>هزار تومان</span>
                    </td>
                    <td>{i.id}</td>

                    <td>
                      <span
                        className={styles.edit}
                        onClick={() => editHandler(i.id)}
                      >
                        {!!isEditModalOpen && (
                          <EditProductModal
                            isEditModalOpen={isEditModalOpen}
                            setEditModalOpen={setEditModalOpen}
                            productData={editingProduct}
                            onEditSubmit={handleEditSubmit}
                          />
                        )}

                        <FaRegEdit />
                      </span>
                      <span
                        className={styles.trash}
                        onClick={() => deleteHandler(i.id)}
                      >
                        <HiOutlineTrash />
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default ProductsPage;
