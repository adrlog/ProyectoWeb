import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    setDoc,
    updateDoc,
    where,
    serverTimestamp,
    addDoc
} from "firebase/firestore";
import {
    db,
    auth,
    storage,
} from "../../config/firebase";
import {
    getDownloadURL,
    ref,
    uploadBytes
} from "firebase/storage";
import { useState } from "react";

const ProcesarPagos = () => {
    var user=auth.currentUser.uid.toString();

    const[Account,setAccount]=useState();

    const AceptarContrato=async ()=>{

        const cuenta=await generateRandomString(10);
        const cuentaID=await generarRandom(10);
        // console.log('acc_'+cuenta);
        // console.log("cus_"+cuentaID);
        const account='acc_'+cuenta;
        const  Customer_id="cus_"+cuentaID;
        const Refpay=doc(db, 'Stripe-Custom', user);
        setDoc(Refpay,{
            account,
            Customer_id,
            Estado:'Incompleto',
            date: serverTimestamp(),
        }).then(async res=>{

            setTimeout(async ()=>{
                const refUser=doc(db, 'Usuarios', user);
                updateDoc(refUser,{
                    pagos:true
                })
            },1500);
        });
        return 'Finally'
    }

    async function generateRandomString (num) {
        const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result1= Math.random().toString(36).substring(0,num);

        return result1;
    }

    async function generarRandom(num) {
        let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(''),
          result = "";
        if (num > characters.length) return false;
        for (let i = 0; i < num; i++) {
          result += characters.splice(Math.floor(Math.random() * characters.length), 1)[0];
        }
        return result;
    }

    const CuentaPagos=async ()=>{
        const Refpay=doc(db, 'Stripe-Custom', user);
        const Count=await getDoc(Refpay);
        setAccount(Count.data());
        // console.log(Count.data());
    }

  return {
    AceptarContrato,
    Account,
    CuentaPagos,
  }
}

export default ProcesarPagos