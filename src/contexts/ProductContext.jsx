/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
// eslint-disable-next-line no-unused-vars
import { Timestamp, addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, setDoc } from "firebase/firestore";
// eslint-disable-next-line no-unused-vars
import React, { useContext, createContext, useState, useEffect } from "react";
import { fireDB, storage } from "../firebase/firebase";
import {toast} from 'react-toastify'
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const ProductContext = React.createContext();

export function useProduct() {
  return useContext(ProductContext);
}

export function ProductProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({
    title: "",
    price: "",
    imgUrl: null,
    category: "",
    description: "",
    vendorEmail: "",
    unit: 1,
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });


  const addProduct = async (e) => {
    e.preventDefault();
    if (
      product.title == "" ||
      product.price == "" ||
      product.imgUrl == "" ||
      product.category == "" ||
      product.description == ""
    ) {
      return toast.error("Please fill all fields");
    }

    setLoading(true);
    try {
      // uploadFile();
      const productRef = collection(fireDB, "products");
      await addDoc(productRef, product);
      console.log(product)
      toast.success("The product has been added successfully.");
      getProducts();
      // closeModal();
      setLoading(false);
      setProduct({
        ...product,
        title: "",
        price: "",
        imgUrl: "",
        category: "",
        description: "",
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };


  // get Products
  const [products, setProducts] = useState([]);

  //--------- Get Product
  const getProducts = async () => {
    setLoading(true);
    try {
      const q = query(collection(fireDB, "products"), orderBy("time"));

      const data = onSnapshot(q, (QuerySnapshot) => {
        let productsArray = [];

        if (QuerySnapshot.empty) {
          setProducts([]);
        }
        QuerySnapshot.forEach((doc) => {
          productsArray.push({ ...doc.data(), id: doc.id });
          setProducts(productsArray);
          setLoading(false);
        });

        return () => data;
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };


  // Edit product
  const productToEdit = (product) => {
    setProduct(product);
  };

  const updateProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await setDoc(doc(fireDB, "products", product.id), product);
      toast.success("Product Updated successfully.");
      getProducts();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const deleteProduct = async (productId) => {
    setLoading(true);
    try {
      await deleteDoc(doc(fireDB, "products", productId));
      toast.success("Product Deleted successfully");
      getProducts();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

 // Here is the function to upload image. you decide where to call it.

  // set initial state for the object 
  const [data, setData] = useState([]);
  // call setfile on file input onChange
  const [file, setFile] = useState(null);
  

  const uploadFile = () => {
    //By creating a reference to a file, your app gains access to it.
    console.log(file)
    const storageRef = ref(storage,file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("upload is" + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload paused");
            break;
          case "running":
            console.log("Upload running");
            break;
          default:
            break;
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadedURL) => {
          // you keep uploaded img url
          setData((prev) => ([...prev, downloadedURL]));
        });
      }
    );
    
   
  };

  useEffect(()=> {
    getProducts()
  }, [])

  return (
    <ProductContext.Provider
      value={{
        loading,
        product,
        setProduct,
        products,
        addProduct,
        productToEdit,
        updateProduct,
        deleteProduct,
        uploadFile, 
        data, 
        setFile
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
