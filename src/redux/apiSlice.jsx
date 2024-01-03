import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { fireDB } from "../firebase/firebase";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getOrders: builder.query({
      async queryFn( email) {
        try {
          const q = query(
            collection(fireDB, "orders"),
            where('product.vendorEmail', "==", `${email}`)
          );
          // onSnapshot(q, (QuerySnapshot) => {
          //   let orders = [];
          //   QuerySnapshot.forEach((doc) => {
          //     orders.push({ ...doc.data(), id: doc.id });
          //     // setLoading(false);
          //   });

          const querySnapshot = await getDocs(q);
          let orders = [];
          querySnapshot.forEach((doc) => {
            orders.push({ ...doc.data(), id: doc.id });
          });

          console.log(orders);
          return { data: orders };
        } catch (error) {
          console.log(error);
          return { error: error };
          //setLoading(false);
        }
      },
    }),
    addOrder: builder.mutation({
      async queryFn(order) {
        try {
          const orderRef = collection(fireDB, "orders");
          await addDoc(orderRef, {
            ...order,
            time: Timestamp.now(),
            date: new Date().toLocaleString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            }),
          });
          console.log(order);
          toast.success("The order has been placed successfully.");
        } catch (error) {
          console.log(error);
        }
      },
    }),
    updateOrder: builder.mutation({
      async queryFn({ id, newStatus }) {
        console.log({id, newStatus})
        try {
          const orderRef = doc(fireDB, "orders", id);

          await updateDoc(orderRef, {
            status: newStatus,
          });
        } catch (error) {
          console.log(error);
        }
      },
    }),
    getOrdersForUser: builder.query({
      async queryFn( email) {
        try {
          const q = query(
            collection(fireDB, "orders"),
            where('customerEmail', "==", `${email}`)
          );
          // onSnapshot(q, (QuerySnapshot) => {
          //   let orders = [];
          //   QuerySnapshot.forEach((doc) => {
          //     orders.push({ ...doc.data(), id: doc.id });
          //     // setLoading(false);
          //   });

          const querySnapshot = await getDocs(q);
          let orders = [];
          querySnapshot.forEach((doc) => {
            orders.push({ ...doc.data(), id: doc.id });
          });

          console.log(orders);
          return { data: orders };
        } catch (error) {
          console.log(error);
          return { error: error };
          //setLoading(false);
        }
      },
    }),
    getVendorDetails: builder.query({
      async queryFn(vendorEmail) {
        try {
          const q = query(
            collection(fireDB, "vendors"),
            where("email", "==", `${vendorEmail}`)
          );
          // onSnapshot(q, (QuerySnapshot) => {
          //   let orders = [];
          //   QuerySnapshot.forEach((doc) => {
          //     orders.push({ ...doc.data(), id: doc.id });
          //     // setLoading(false);
          //   });

          const querySnapshot = await getDocs(q);
          let vendorDetails;
          querySnapshot.forEach((doc) => {
            vendorDetails = ({ ...doc.data(), id: doc.id });
          });

          console.log(vendorDetails);
          return { data: vendorDetails };
        } catch (error) {
          console.log(error);
          return { error: error };
          //setLoading(false);
        }
      },
    }),
    addUser: builder.mutation({
      async queryFn(user) {
        try {
          const orderRef = collection(fireDB, "users");
          await addDoc(orderRef, {
            ...user,
            time: Timestamp.now(),
            date: new Date().toLocaleString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            }),
          });
        } catch (error) {
          console.log(error);
        }
      },
    }), 
    getUser: builder.query({
      async queryFn(email) {
        console.log(email)
        try {
          const q = query(
            collection(fireDB, "users"),
            where("email", "==", `${email}`)
          );
         
          // onSnapshot(q, (QuerySnapshot) => {
          //   let orders = [];
          //   QuerySnapshot.forEach((doc) => {
          //     orders.push({ ...doc.data(), id: doc.id });
          //     // setLoading(false);
          //   });

          const querySnapshot = await getDocs(q);
          let user = null;
          querySnapshot.forEach((doc) => {
            user = ({ ...doc.data(), id: doc.id });
          });
          console.log(user)
          return { data: user };
        } catch (error) {
          console.log(error);
          return { error: error };
          //setLoading(false);
        }
      }
    }), 
    updateUser: builder.mutation({
      async queryFn(updatedInfo) {
        try {
          const usersRef = doc(fireDB, "users", updatedInfo.id);
          await updateDoc(usersRef, updatedInfo);
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useAddOrderMutation,
  useGetOrdersQuery,
  useUpdateOrderMutation,
  useGetOrdersForUserQuery,
  useGetVendorDetailsQuery, 
  useAddUserMutation, 
  useGetUserQuery, 
  useUpdateUserMutation
} = apiSlice;
