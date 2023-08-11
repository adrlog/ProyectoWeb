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

const Procesamiento = () => {

    var user=auth.currentUser.uid.toString();

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
                Tipo:'Curso'
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
                Tipo:'Curso'
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
                Tipo:'Tramite'
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
                Horas,
                Dias,
                Presupuesto,
                descripcion,
                Preferencias,
                Imagenes,
                Vistafecha,
                Fecha:serverTimestamp(),
                id:docRef.id,
                Tipo:'Tramite'
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

  return {
    PublicarCurso,
    PublicarTramite,
  }
}

export default Procesamiento