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
    addDoc,
    arrayUnion
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

const Procesamiento = () => {

    var user=auth.currentUser.uid.toString();
    const [Historial, setHistorial]=useState();
    const [UserInf, setUserInf]=useState();

    const PublicarCurso = async (Titulo, Materia, Horas, Dias, Presupuesto, descripcion, Preferencias, files) =>{

        const docRef = await addDoc(collection(db, "Usuarios", user, "Trabajos"), {});
        var Imagenes=[];
        var fecha = new Date();
        var Vistafecha = await darFormatoFecha(fecha);

        if (files) {
            for (var i = 0; i < files.length; i++) {
                const storageRef = ref(
                    storage,
                    `Publicaciones/${user}/${docRef.id}/${user+i+'.jpg'}`
                );
                var url = '';
                await uploadBytes(storageRef, files[i])
                url = await getDownloadURL(storageRef)
                Imagenes.push(url);
            }
            // console.log("---------------------------------")
            console.log(Imagenes);
            await updateDoc(docRef, {
                Titulo,
                Materia,
                Horas,
                Dias,
                Presupuesto,
                descripcion,
                Preferencias,
                Imagenes,
                Vistafecha,
                Fecha:serverTimestamp(),
                id:docRef.id,
                Tipo:'Curso',
                idSolicita:user,
            }).then(async (res)=>{
                const path = await getDoc(docRef);
                console.log(path.data());
            });

            return 'Terminado'

        } else {
            //console.log("first")
            await updateDoc(docRef, {
                Titulo,
                Materia,
                Horas,
                Dias,
                Presupuesto,
                descripcion,
                Preferencias,
                Imagenes,
                Vistafecha,
                Fecha:serverTimestamp(),
                id:docRef.id,
                Tipo:'Curso',
                idSolicita:user,
            }).then(async (res)=>{
                const path = await getDoc(docRef);
                console.log(path.data());
            });

            return 'Terminado'
        }

    }

    const PublicarTramite = async (Titulo, Departamento, Presupuesto, descripcion, Preferencias, files) =>{
        var user=auth.currentUser.uid.toString();

        const docRef = await addDoc(collection(db, "Usuarios", user, "Trabajos"), {});
        var Imagenes=[];
        var fecha = new Date();
        var Vistafecha = darFormatoFecha(fecha);

        if (files) {
            for (var i = 0; i < files.length; i++) {
                const storageRef = ref(
                    storage,
                    `Publicaciones/${user}/${docRef.id}/${user+i+'.jpg'}`
                );
                var url = '';
                await uploadBytes(storageRef, files[i])
                url = await getDownloadURL(storageRef)
                Imagenes.push(url);
            }
            // console.log("---------------------------------")
            console.log(Imagenes);
             await updateDoc(docRef, {
                Titulo,
                Departamento,
                Presupuesto,
                descripcion,
                Preferencias,
                Imagenes,
                Vistafecha,
                Fecha:serverTimestamp(),
                id:docRef.id,
                Tipo:'Tramite',
                idSolicita:user,
            }).then(async (res)=>{
                const path = await getDoc(docRef);
                console.log(path.data());
            });

            return 'Terminado'

        } else {
            //console.log("first")
             await updateDoc(docRef, {
                Titulo,
                Departamento,
                Presupuesto,
                descripcion,
                Preferencias,
                Imagenes,
                Vistafecha,
                Fecha:serverTimestamp(),
                id:docRef.id,
                Tipo:'Tramite',
                idSolicita:user,
            }).then(async (res)=>{
                const path = await getDoc(docRef);
                console.log(path.data());
            });

            return 'Terminado'
    
        }
    }

    function darFormatoFecha(today) {
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1; // Months start at 0!
        let dd = today.getDate();
        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
        const formattedToday = dd + '/' + mm + '/' + yyyy;
        return formattedToday;
    }

    const Publicaciones = async () => {
        var tranajos = [];
        const ref = collection(db, 'Usuarios', user, 'Trabajos');
        const date = await getDocs(ref);
        // console.log('buscando pubs',user)
        date.forEach((pubs)=>{
            tranajos.push(pubs.data());
        });

        for (var i = 0; i < tranajos.length; i++) {
            if (tranajos[i].Imagenes) {
                var p = tranajos[i].Imagenes;
                var p2 = darFormatoArrayImg(p);
                // console.log(p2);
                tranajos[i].imagenesFormateadas = p2;
                // console.log(publicaciones[i]);
            }
        }


        setHistorial(tranajos);
    }

    function darFormatoArrayImg(imgs) {
        var arregloDeImagenes = [];
        for (var i = 0; i < imgs.length; i++) {
            var imagen = {
                original: imgs[i],
                thumbnail: imgs[i],
            };
            arregloDeImagenes.push(imagen);
        }
        //console.log(arregloDeImagenes);
        return arregloDeImagenes;
    }

    const Perfil = async () => {
        var tranajos = [];
        const ref = doc(db, 'Usuarios', user);
        const date = await getDoc(ref);
        setUserInf(date.data())
        // console.log('buscando perfil',date.data());
    }

    const Postularme = async (docTrabajo)=>{
        console.log(docTrabajo)
       const WorkRef=doc(db,'Usuarios',docTrabajo.idSolicita,'Trabajos',docTrabajo.id);
       await updateDoc(WorkRef,{
        Postulados:arrayUnion(user)
       });

       return 'Postulado';
    }


  return {
    PublicarCurso,
    PublicarTramite,
    Publicaciones,
    Historial,
    Perfil,
    UserInf,
    Postularme,
  }
}

export default Procesamiento