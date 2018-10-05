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
const auth = firebase.auth()
const db = firebaseApp.database(`https://sekoia-430fa.firebaseio.com`)
const functions = firebaseApp.functions('europe-west1')
let refs = <any>[]
let userData:any = null

const reinitRefs = () => {
    refs.forEach((ref:any) => {
        ref.destroy()
    })
    refs = []
    userData = null
}

const getRef = (path:string) => {
    return db.ref(`-L2wDq1EksBQyqkLbTBy/${path}`)
}

const getObjectRef = (ref:string) => {
    const object = {
        ref : getRef(ref),
        val : null,
        $resolved : false,
        resolvePromises : <any>[],
        $loaded : function() {
            return new Promise((resolve:any, reject) => {
                if(this.$resolved){
                    resolve(this)
                } else {
                    this.resolvePromises.push(resolve)
                }
            })
        },
        destroy : function() {
            this.ref.off()
            this.val = null
            this.$resolved = false
        }
    }
    object.ref.once('value').then((snapshot : firebase.database.DataSnapshot) => {
        object.val = snapshot.val()
        object.$resolved = true
        object.resolvePromises.forEach((resolve:any) => {
            resolve(object)
        })
        object.resolvePromises = []
        object.ref.on('value', (snap : firebase.database.DataSnapshot | null) => {
            object.val = snap ? snap.val() : null
        })
    })
    return object
}

const callFunction = (functionName:string, data:Object) => {
    const refresher = functions.httpsCallable(functionName)
    return refresher(data)
}

const unlogUser = () => {
    reinitRefs()
    return auth.signOut()
}

const logUser = (email:string, password:string) => {
    return auth.signInWithEmailAndPassword(email,password)
}

const setUser = (user:any) => {
    if(user){
      getUserData()
    } 
}

const getCurrentUser = () => {
    return auth.currentUser
}

const getCurrentUserId = () => {
    return auth.currentUser ? auth.currentUser.uid : null
}


const getUserData = () => {
    return new Promise((resolve, reject) => {
        if(!userData){
            userData = getObjectRef(`customersSpaces/${getCurrentUserId()}`)
            refs.push(userData)
        }
        userData.$loaded().then(resolve)
    })
}

const sendEmailVerification = () =>{
    return new Promise((resolve, reject) => {
        if(auth.currentUser){
            const location = window.location;
            const settings = {url : `${location .protocol}//${location.host}/home`}
            auth.currentUser.sendEmailVerification(settings).then(() => {resolve()}).catch(reject)
        } else {
            reject('NO_USER')
        }
    })
}

const createSpace = (uid:String, hiboutikId:Number) => {
    const userRecord = {
        id : hiboutikId,
        creationDate : Date.now()
    }
    return getRef(`customersSpaces/${uid}`).set(userRecord)
}

const resetPassword = (email:string) => {
    return new Promise((resolve, reject) => {
        const location = window.location;
        const settings = {url : `${location .protocol}//${location.host}/login`}
        auth.sendPasswordResetEmail(email, settings).then(() => {resolve()}).catch(reject)
    })
}



auth.onAuthStateChanged(setUser);

export default {
    auth,
    getRef,
    callFunction,
    getCurrentUser,
    getCurrentUserId,
    getUserData,
    unlogUser,
    logUser,
    getObjectRef,
    sendEmailVerification,
    createSpace,
    resetPassword,
    createAccount : (email:string, password:string, hiboutikId : Number) => {
        return new Promise((resolve, reject) => {
            auth.createUserWithEmailAndPassword(email,password).then((userCredentials:firebase.auth.UserCredential) => {
                if(userCredentials && userCredentials.user){
                    Promise.all([createSpace(userCredentials.user.uid, hiboutikId), sendEmailVerification()]).then(() => {resolve()}).catch(reject)
                } else {
                    reject() 
                }
            }).catch(reject)
        })
    }
}