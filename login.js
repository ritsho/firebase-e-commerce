import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { getFirestore, collection, where, query, getDocs, limit } from 'https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js'
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.12.1/firebase-auth.js'
import { firebaseConfig } from "./firebase-config.js";
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


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