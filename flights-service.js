import { firebaseConfig } from "./firebase-config.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { getFirestore, collection, getDocs, doc, updateDoc, addDoc, deleteDoc } from 'https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js'

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// CRUD operations
export const flightsService = {
    getAllFlights: async () => {
        const flights = collection(db, "products");
        const querySnapshot = await getDocs(flights);
        return querySnapshot.docs;
    },

    updateFlight: async (id, updates) => {
        try {
            console.log(id, updates);
            const docRef = doc(db, "products", id);
            await updateDoc(docRef, updates);
            console.log('Flight updated successfully');
        } catch (error) {
            console.error('Error updating Flight:', error);
        }
    },

    createFlight: async (flight) => {
        try {
            const flights = collection(db, "products");
            const docRef = await addDoc(flights, flight);
            console.log('Flight created with ID:', docRef.id);
            return docRef.id;
        } catch (error) {
            console.error('Error creating Flight:', error);
        }
    },

    getFlightById: async (id) => {
        try {
            const docRef = doc(db, "products", id);
            const doc = await docRef.get();
            if (doc.exists) {
                return doc.data();
            } else {
                console.log('No such Flight!');
                return null;
            }
        } catch (error) {
            console.error('Error getting Flight:', error);
        }
    },



    deleteFlight: async (id) => {
        try {
            const docRef = doc(db, "products", id);
            await deleteDoc(docRef);
            console.log('Flight deleted successfully');
        } catch (error) {
            console.error('Error deleting Flight:', error);
        }
    }
};
