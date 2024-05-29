import { firebaseConfig } from "./firebase-config.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { getAuth, signOut } from 'https://www.gstatic.com/firebasejs/10.12.1/firebase-auth.js'
import { flightsService } from "./flights-service.js";

const app = initializeApp(firebaseConfig);


function createTableRow(singleFlight) {
    console.log(singleFlight);
    const row = document.createElement('tr');

    const cell1 = document.createElement('td');
    const cell2 = document.createElement('td');
    const cell3 = document.createElement('td');
    const cell4 = document.createElement('td');
    const cell5 = document.createElement('td');

    const input1 = document.createElement('input');
    input1.type = 'text';
    input1.value = singleFlight.data().name;
    input1.classList.add('text-input');
    input1.classList.add('editable');

    const input2 = document.createElement('input');
    input2.type = 'text';
    input2.value = singleFlight.data().image;
    input2.classList.add('text-input');
    input2.classList.add('editable');

    const input3 = document.createElement('input');
    input3.type = 'text';
    input3.value = singleFlight.data().price;
    input3.classList.add('text-input');
    input3.classList.add('editable');


    const input4 = document.createElement('input');
    input4.type = 'text';
    input4.value = singleFlight.data().description;
    input4.classList.add('text-input');
    input4.classList.add('editable');


    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.innerHTML = '&#10006;';
    deleteBtn.title = 'Delete';
    deleteBtn.addEventListener('click', async () => {
        flightsService.deleteFlight(singleFlight.id);
        await refreshFlightsList();
    });

    const saveBtn = document.createElement('button');
    saveBtn.classList.add('save-btn');
    saveBtn.title = 'Save';
    saveBtn.innerHTML = ' &#128190; ';
    saveBtn.addEventListener('click', () => {
        flightsService.updateFlight(singleFlight.id, {
            name: input1.value,
            image: input2.value,
            price: input3.value,
            description: input4.value
        });
    });

    cell1.appendChild(input1);
    cell2.appendChild(input2);
    cell3.appendChild(input3);
    cell4.appendChild(input4);

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');
    buttonContainer.appendChild(deleteBtn);
    buttonContainer.appendChild(saveBtn);
    cell5.appendChild(buttonContainer);

    row.appendChild(cell1);
    row.appendChild(cell2);
    row.appendChild(cell3);
    row.appendChild(cell4);
    row.appendChild(cell5);

    return row;
}

async function refreshFlightsList() {

    // get all flights
    const table = document.getElementById('flights-tbody');
    // clear all existing items
    table.innerHTML = ''; 

    const flights = await flightsService.getAllFlights();
    flights.forEach(singleFlight => {
        // add to tbody
        const newRow = createTableRow(singleFlight);
        table.appendChild(newRow);
    });

}

await refreshFlightsList();

const addFlightBtn = document.getElementById('add-flight-btn');
addFlightBtn.addEventListener('click', async () => {
    flightsService.createFlight( {
        name: "?",
        image: "https://?.com/image",
        price: "$500",
        description: "Amazing location"
    });
    await refreshFlightsList();
});

var signoutLink = document.getElementById("sign-out");
signoutLink.addEventListener("click", function (event) {
    event.preventDefault();

    // firebase signout

    signOut(getAuth(app));
    window.location.href = "login.html";
});


// data samples:
// {"image":"https://a57.foxnews.com/static.foxnews.com/foxnews.com/content/uploads/2023/08/720/405/eiffel-tower-paris.jpg","description":"Explore the City of Light's iconic landmarks like the Eiffel Tower and the Louvre Museum","name":"Paris","price":"$1245"}
// {"price":"$987","image":"https://a.loveholidays.com/media-library/~production/6d7b5475d338ee30647c4b88d27fea204429081c-3840x1408.jpg?auto=avif%2Cwebp&quality=80&dpr=1.5&optimize=high&fit=crop&width=1280&height=380","name":"Tokyo","description":"Experience the unique blend of modern and traditional in Japan's vibrant capital"}
// {"image":"https://i.natgeofe.com/n/bd48279e-be5a-4f28-9551-5cb917c6766e/GettyImages-103455489cropped.jpg?w=1280&h=853","description":"Soak up the sun on Bondi Beach and marvel at the iconic Sydney Opera House","name":"Sydney","price":"$1567"}
// {"image":"https://theplanetd.com/images/Top-Things-to-in-Rio-De-Janeiro.jpg","description":"Dance the night away at lively samba clubs and visit the iconic Christ the Redeemer statue","price":"$845","name":"Rio de Janeiro"}
// {"description":"Relax on pristine beaches, explore lush jungles, and immerse yourself in Balinese culture","price":"$689","name":"Bali","image":"https://imageio.forbes.com/specials-images/imageserve/675172642/pura-ulun-danu-bratan-temple-in-Bali-/960x0.jpg?format=jpg&width=1440"}
// {"description":"Get lost in the vibrant souks and marvel at the ornate architecture of this Moroccan gem","image":"https://media.tacdn.com/media/attractions-splice-spp-674x446/09/f7/05/90.jpg","price":"$578","name":"Marrakech"}
// {"price":"$945","image":"https://www.telegraph.co.uk/content/dam/Travel/Destinations/Europe/Iceland/Reykjavik/reykjavik-guide-lead-image-48-hours.jpg?imwidth=1280","description":"Chase the Northern Lights and soak in natural hot springs in this Icelandic wonderland","name":"Reykjavik"}
// {"name":"Havana","image":"https://adriana-maria.com/wp-content/uploads/2021/02/DSC00189-2-1920x1028.jpg","description":"Step back in time and experience the colorful streets and classic cars of Cuba's capital","price":"$567"}
// {"image":"https://lp-cms-production.imgix.net/2021-05/shutterstockRF_1563449509.jpg?auto=format&w=1440&h=810&fit=crop&q=75","price":"$1123","description":"Admire the stunning whitewashed buildings and breathtaking caldera views on this Greek island","name":"Santorini"}
// {"name":"Queenstown","image":"https://media.tacdn.com/media/attractions-content--1x-1/10/7d/70/d6.jpg","price":"$1289","description":"Enjoy adventure sports and stunning natural scenery in New Zealand's adrenaline capital"}