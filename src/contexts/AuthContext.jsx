/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import React, { useContext, useState, useEffect } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithRedirect,
  // getRedirectResult,
} from "firebase/auth";


const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurentUser] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // signUp function
  async function signUp(email, password, userName, address, phoneNumber) {
    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, email, password);
    
    // update profile
    console.log(phoneNumber)
    await updateProfile(auth.currentUser, { displayName: userName});

    const user = auth.currentUser;
    setCurentUser({ ...user });
  }

  // log in function
  const logIn = async (email, password) =>  {
      const auth = getAuth();
      try{
        await signInWithEmailAndPassword(auth, email, password);
      }catch(error){
        setError(error)
      }
  }

  // log out function
  function logOut() {
    const auth = getAuth();
    return signOut(auth);
  }

  // Log in with Gmail Account
  const logInWithGmail = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithRedirect(auth, provider);
  }

  // const auth = getAuth();
  //   getRedirectResult(auth)
  //     .then((result) => {
  //       // This gives you a Google Access Token. You can use it to access Google APIs.
  //       const credential = GoogleAuthProvider.credentialFromResult(result);
  //       const token = credential.accessToken;
  //       console.log(token);
  //       // The signed-in user info.
  //       const user = result.user;
  //       console.log(user);
  //       // IdP data available using getAdditionalUserInfo(result)
  //       // ...
  //     })
  //     .catch((error) => {
  //       // Handle Errors here.
  //       // const errorCode = error.code;
  //       const errorMessage = error.message;
  //       console.log(errorMessage); 
  //       // The email of the user's account used.
  //       //const email = error.customData.email;
  //       // The AuthCredential type that was used.
  //     //  const credential = GoogleAuthProvider.credentialFromError(error);
  //       // ...
  //     });
 
  const value = {
    currentUser,
    signUp,
    logIn,
    logOut,
    logInWithGmail,
    error, 
    setError
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
