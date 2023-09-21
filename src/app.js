// firebase config:

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
    getFirestore,
    addDoc,
    collection,
    getDocs,
    doc,
    deleteDoc,
    onSnapshot,
    query,
    where,
    orderBy,
    serverTimestamp,
    setDoc,
    Timestamp,
    collectionGroup,
  } from "firebase/firestore";
  import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
  } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBw3J6LSTRgaDUM8vyiE0vw1UHm-3NGj1c",
  authDomain: "blogapp-7cc2a.firebaseapp.com",
  projectId: "blogapp-7cc2a",
  storageBucket: "blogapp-7cc2a.appspot.com",
  messagingSenderId: "451207321182",
  appId: "1:451207321182:web:28b08465301fb09c2ac6cf",
  measurementId: "G-Z5T1JJMZTF"
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Firebase auth and firestore
const auth=getAuth()
const db=getFirestore()


// -------------------SignUp start---------------------
let signForm=document.querySelector('.sign-form')

signForm.addEventListener('submit', async(e)=>{
    e.preventDefault()
    let name=e.target.name.value
    let email=e.target.email.value
    let password=e.target.password.value
    let redAlert=document.querySelector('.red-alert')
    if(!name || !email || !password){
        redAlert.style.display='block'
    }
    else{
       redAlert.style.display='none'

       await createUserWithEmailAndPassword(auth, email, password)
  .then(async(userCredential) => {
    // Signed in 
    const user = userCredential.user;
    
    const userData={
        id:user.uid,
        Name:name,
        createdAt:Timestamp.fromDate(new Date()),
        email,
       
        
    }
    await setDoc(doc(db, "users", user.uid),userData);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
  
    const errorMessage = error.message;
    if (errorCode?.includes('auth/email-already-in-use')){
        redAlert.style.display='block'
        redAlert.textContent='Email is already in use'

    }
    // ..
  });
      
    }
   
}
)

// -------------------SignUp end---------------------