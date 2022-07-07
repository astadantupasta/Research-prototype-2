
import {UserData} from "main.js";

export function uploadToDatabase(user){

    const firebaseConfig = {

        apiKey: "AIzaSyCCSg686MIwY4jJz7UNFx6PMNZ_LwOG7zk",
        authDomain: "research-prototype-22.firebaseapp.com",
        projectId: "research-prototype-22",
        storageBucket: "research-prototype-22.appspot.com",
        messagingSenderId: "551766409520",
        appId: "1:551766409520:web:493f25acf035234a9d88f5"

    };

    const app = initializeApp(firebaseConfig);

    const database = getFirestore(app);

    const dataCollection = collection(database, "experimentData");



    addDoc(dataCollection, {
        ...user
    });
}