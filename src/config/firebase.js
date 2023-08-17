import { initializeApp } from "firebase/app";
import { getAuth, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword,
    signOut } from "firebase/auth";
import { getFirestore, doc, setDoc, updateDoc } from "firebase/firestore";
import {
    getDownloadURL,
    getStorage, ref, uploadBytes,
} from "firebase/storage";
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);


export const login=({email, password})=>{
    return signInWithEmailAndPassword(auth,email,password);
}

export const registered =({email, password})=>{
    return createUserWithEmailAndPassword(auth,email,password);
}

export const logout=()=>{
    return signOut(auth);
}

export const SubmitDataRegister = async (email, password, nombre, grupo, escuela, carrera, id)=>{
    await setDoc(doc(db, "Usuarios",id), {
        email, 
        password, 
        nombre, 
        grupo, 
        escuela, 
        carrera,
        id
      });

}

export async function actualizaTodo(datos, file) {
    //console.log(datos);
    const mensaje = datos.mensaje;
    const nombre = datos.nombre
    //console.log(file)
    var url = ""

    if (file) {
        const storageref = ref(storage, "Imagenes de perfil/UID: " + auth.currentUser.uid.toString());
        await uploadBytes(storageref, file)
        url = await getDownloadURL(storageref)
        const update = doc(db, "Usuarios", auth.currentUser.uid.toString());
        const resp = await updateDoc(update, {
            imagen: url,
            mensaje: datos.mensaje,
            nombre: datos.nombre,
            email: datos.email,
            escuela: datos.escuela,
            carrera: datos.carrera,
            grupo: datos.grupo
        });

    } else {
        // console.log("Actualziando mensaje y name")
        const update = doc(db, "Usuarios", auth.currentUser.uid.toString());
        const resp = await updateDoc(update, {
            mensaje: datos.mensaje,
            nombre: datos.nombre,
            email: datos.email,
            escuela: datos.escuela,
            carrera: datos.carrera,
            grupo: datos.grupo
        });
    }
    //console.log("saliendo update")
    return url;

}
