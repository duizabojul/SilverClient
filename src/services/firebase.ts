import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/functions';
import 'firebase/database'
const config = {
    apiKey: 'AIzaSyCFnzI4i8t6NEjvlR5vuJxk3MiOPPNRsoo',
    authDomain: "silver-smok-admin.firebaseapp.com",
    databaseURL: 'https://sekoia-main.firebaseio.com',
    projectId: 'silver-smok-admin',
    storageBucket: 'sekoia',
    messagingSenderId: '609941678873'
  }
const firebaseApp = firebase.initializeApp(config);
const firebaseAuth = firebase.auth()
const firebaseFunctions = firebaseApp.functions('europe-west1')
let currentUser:any = null

const getRef = (path:string) => {
    return firebaseApp.database(`https://sekoia-430fa.firebaseio.com`).ref(`-L2wDq1EksBQyqkLbTBy/${path}`)
}

const setUser = (user:any) => {
    currentUser = user
    console.log(user)
    if(user){

    } else {

    }
}




firebase.auth().onAuthStateChanged(setUser);

export default {
    getRef,
    callFunction : (functionName:string, data:Object) => {
        const refresher = firebaseFunctions.httpsCallable(functionName)
        return refresher(data)
    },
    createAccount : (email:string, password:string, hiboutikId : Number) => {
        return new Promise((resolve, reject) => {
            firebaseAuth.createUserWithEmailAndPassword(email,password).then((userCredentials:firebase.auth.UserCredential) => {
                if(userCredentials && userCredentials.user){
                    const userRecord = {
                        id : hiboutikId
                    }
                    Promise.all([getRef(`customersSpaces/${userCredentials.user.uid}`).set(userRecord), userCredentials.user.sendEmailVerification()]).then(() => {resolve()})
                } else {
                    reject() 
                }
            }).catch(reject)
        })
    },
    getCurrentUser : () => {
        return currentUser
    }
}