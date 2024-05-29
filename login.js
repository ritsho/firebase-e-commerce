import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { getFirestore, collection, where, query, getDocs } from 'https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js'
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.12.1/firebase-auth.js'
import { firebaseConfig } from "./firebase-config.js";
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function showListOfUsers() {
    const db = getFirestore(app);
    const usersRef = collection(db, "users");
    const querySnapshot = await getDocs(usersRef);
    const userslist = document.getElementById("userslist");
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
        
        const newOptionElement = document.createElement('option');
        newOptionElement.value = doc.data().username;
        newOptionElement.text = doc.data().username;
        userslist.appendChild(newOptionElement);
    });
}
await showListOfUsers();

document.getElementById("login").onclick = doLogin;
async function doLogin() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // get users storage from firestore
    const q = query(collection(db, "users"), where("username", "==", username));
    const querySnapshot = await getDocs(q);

    // querySnapshot.forEach((doc) => {
    //         console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
    //     });

    if (querySnapshot.empty) {
        alert("User not found");
        return;
    }
    try {
        const userDoc = querySnapshot.docs[0];
        const auth = getAuth(app);
        const logged_in_user = await signInWithEmailAndPassword(auth, userDoc.data().email, password);
    
    } catch (error) {
        alert(`Login failed: ${error}`);
            return;
    }
  
    window.location = "flights.html";
}