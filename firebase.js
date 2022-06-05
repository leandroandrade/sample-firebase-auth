
const firebase = require('firebase/app');
const {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} = require('firebase/auth');

const firebaseConfig = {
    apiKey: "YOU_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
  };

firebase.initializeApp(firebaseConfig);

async function login(auth, email, password) {
    try {
        const signIn = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        console.log('Login user:', signIn.user.uid);
    } catch (err) {
        if (err.code === 'auth/wrong-password') {
            console.error('Invalid user or password!');
        } else {
            console.error(err);
        }
    }
}

async function createUser(auth, email, password) {
    try {
        const signUp = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        console.log('Create user:', signUp.user.uid);
    } catch (err) {
        // auth/weak-password
        if (err.code === 'auth/email-already-in-use') {
            console.error('User already registered!');
        } else {
            console.error(err);
        }
    }
}

async function run() {
    const auth = getAuth();
    const email = 'firebase_auth@gmail.com';
    const password = '123456';
    
    await createUser(auth, email, password);
    await login(auth);
}
run().catch(console.error);
