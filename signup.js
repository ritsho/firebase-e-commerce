import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.12.1/firebase-auth.js'
import { getFirestore, collection, addDoc } from 'https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js'
import { firebaseConfig } from "./firebase-config.js";

const app = initializeApp(firebaseConfig);

document.getElementById("signup").onclick = onsignup;

function onsignup() {
    const auth = getAuth(app);
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            addUserToUsersStore(username, password, email);
            window.location = "login.html";
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
            alert(errorMessage);
        });
}

async function addUserToUsersStore(username, password, email) {
    const db = getFirestore(app);
    const usersRef = collection(db, "users");
    const docRef = await addDoc(usersRef, {
            username: username,
            password: password,
            email: email,
            is_admin: false,
            cart: [],
            created_date: new Date()
        })
        .then((docRef) => {
            console.log("user written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding user: ", error);
        });
}