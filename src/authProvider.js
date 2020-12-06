import firebase from 'firebase';


const API_URL = "https://api.amosed.ro/edu";

async function initFirebase() {
    var firebaseConfig = {
        apiKey: "AIzaSyDsolyafGMsBPg31j82LnbQtSVwxy74gk0",
        authDomain: "radical-98691.firebaseapp.com",
        databaseURL: "https://radical-98691.firebaseio.com",
        projectId: "radical-98691",
        storageBucket: "radical-98691.appspot.com",
        messagingSenderId: "267619841367",
        appId: "1:267619841367:web:3f6df6b3335673829c3a12",
        measurementId: "G-X7TKB7FS6Z"
    };
    // Initialize Firebase
    await firebase.initializeApp(firebaseConfig);
    await firebase.analytics();
}

class AuthProvider {

    constructor() {
        initFirebase();
        this._authenticated = false;
        this._user = null;
        firebase.auth().onAuthStateChanged(user => {
            console.log(user);
            if (user) {
                this.fetchData(user.email);
            }
        });
    }

    fetchData = async (email) => {
        await fetch(`${API_URL}/users.php?email=${email}`, {
            headers: {
                "Content-Type": "application/json"
            },
            method: 'GET'
        })
            .then(response => response.json())
            .then(user => {
                console.log(user);
                this._user = user;
                this._authenticated = true;
            })
            .catch(error => {
                console.error(error);
                throw error;
            })
    }

    async login(email, password) {
        await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
            .then(async () => {
                await firebase.auth().signInWithEmailAndPassword(email, password)
                    .then(async response => {
                        await this.fetchData(email);
                    })
                    .catch(error => {
                        alert("Nume de utilizator sau parola gresite");
                        console.error(error);
                    })
            })
            .catch(error => {
                console.error(error);
            })
        return this._user;
    }

    async register(email, password, name) {
        return await firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async response => {
                await fetch(`${API_URL}/users.php`, {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: email,
                        name: name
                    }),
                    method: "POST"
                })
                    .then(response => response.json())
                    .then(json => {
                        console.log(json);
                        this._user = [{email: email, name: name}];
                        this._authenticated = true;
                    })
                    .catch(error => {
                        console.error(error);
                        throw error;
                    });
            })
            .catch(error => console.error(error));
    }

    getUser() {
        return this._user;
    }

    isAuthenticated() {
        return this._authenticated;
    }

    logout() {
        firebase.auth().signOut()
            .then(() => {

            })
    }

}

export default new AuthProvider();