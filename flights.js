import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/10.12.1/firebase-auth.js'
import { getFirestore, collection, where, getDocs, query } from 'https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js'
import { firebaseConfig } from "./firebase-config.js";
import { flightsService } from "./flights-service.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function FillFlightsFromDatabase() {

    const flights = await flightsService.getAllFlights();
    console.log(flights);
    flights.forEach((doc) => {
        console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);

        var product = doc.data();
        const container = document.getElementById('product-container');
        const productElement = createProductElement(product.image, product.name, product.price, product.description);
        container.appendChild(productElement);
    });
}

await FillFlightsFromDatabase();

var signoutLink = document.getElementById("sign-out");
signoutLink.addEventListener("click", function (event) {
    event.preventDefault();

    // firebase signout
    signOut(getAuth(app));
    window.location.href = "login.html";
});

const auth = getAuth(app);
onAuthStateChanged(auth, async (user) => {
    if (user) {
        console.log('User is signed in:', user.email);
        const q = query(collection(db, "users"), where("email", "==", user.email));
        const querySnapshot = await getDocs(q);
        const userDoc = querySnapshot.docs[0].data();
        document.getElementById("username").innerHTML = `${userDoc.username}`;

    } else {
        console.log('No user signed in. please go to login.html');
        //window.location.href = "login.html";
    }
});


function createProductElement(imageSrc, name, price, description) {
    const productDiv = document.createElement('div');
    productDiv.className = 'product';

    const img = document.createElement('img');
    img.src = imageSrc;
    img.alt = name;
    productDiv.appendChild(img);

    const h2 = document.createElement('h2');
    h2.textContent = name;
    productDiv.appendChild(h2);

    const priceP = document.createElement('p');
    priceP.className = 'price';
    priceP.textContent = price;
    productDiv.appendChild(priceP);

    const descP = document.createElement('p');
    descP.className = 'description';
    descP.textContent = description;
    productDiv.appendChild(descP);

    return productDiv;
}
