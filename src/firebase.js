import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signInWithPopup, PhoneAuthProvider, signOut } from "firebase/auth"
import {getFirestore, enableIndexedDbPersistence, getDocs, collection, setDoc, doc} from 'firebase/firestore'

const CONFIG = {}
initializeApp(CONFIG);

const AUTH = getAuth()
export const listenUser = (callback) => onAuthStateChanged(AUTH, callback)
export const signIn = () => {return signInWithPopup(AUTH, new PhoneAuthProvider())}
export const logOut = () => {return signOut(AUTH)}

const FIRESTORE = getFirestore()
enableIndexedDbPersistence(FIRESTORE).catch(e => console.log(e.code  === 'failed-precondition' ? 'Multiple Tabs Open' : 'Cant Cache ', e))

export const getData = (path, callback) => {
    return getDocs(collection(FIRESTORE, path)).then(snapshot => {

        console.log("Received", snapshot.size, "documents")
        let docs = {}
        snapshot.docs.forEach(doc => docs[doc.id] = doc.data())

        callback(docs)

    }).catch(console.error)
}

export const saveDoc = (path, data, callback) => {
    return setDoc(doc(FIRESTORE, path), data).then(() => callback("saved")).catch(console.error)
}