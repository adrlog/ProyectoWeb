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
    arrayUnion, arrayRemove
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
import { useEffect, useState } from "react";

const Procesamiento = () => {

    var user=auth.currentUser.uid.toString();
    const [Historial, setHistorial]=useState();
    const [UserInf, setUserInf]=useState();
    const [proceso, setproceso]=useState(false);
    const [PostulacionesInf, setPostulacionesInf]=useState();
    const [tarjetas, setTarjetas]=useState();
    // useEffect(()=>{
    //     Postulaciones();
    // },[])

    const PublicarCurso = async (Titulo, Materia, Horas, Dias, Presupuesto, descripcion, Preferencias, files) =>{

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
        var Candidatos=[];

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

            if(tranajos[i].Postulados){
                for(var index=0; index<tranajos[i].Postulados.length; index++){
                   var candidato = tranajos[i].Postulados[index];
                   const refCan = doc(db, 'Usuarios', candidato);
                   const worker = await getDoc(refCan);
                   Candidatos.push(worker.data());

                }
                tranajos[i].Postulados=Candidatos;
                Candidatos=[];
            }
        }
        console.log(tranajos);
        setproceso(!proceso)
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

        const ref = doc(db, 'Usuarios', user);
        const date = await getDoc(ref);
        setUserInf(date.data())
        console.log('buscando perfil',date.data());
    }

    const Postularme = async (docTrabajo)=>{
        console.log(docTrabajo)
       const WorkRef=doc(db,'Usuarios',docTrabajo.idSolicita,'Trabajos',docTrabajo.id);
       await updateDoc(WorkRef,{
        Postulados:arrayUnion(user)
       });

       return 'Postulado';
    }

    const Postulaciones = async ()=>{
        var evidencias=[];

        const querySnapshot = await getDocs(collection(db, "Usuarios"));
        for(var i=0; i<querySnapshot.docs.length; i++){
            var Ref =querySnapshot.docs[i].data()['id'];
            const Snapshot = await getDocs(collection(db, "Usuarios", Ref, 'Trabajos'));
            for(var j=0; j<Snapshot.docs.length; j++){
                if(Snapshot.docs[j].data()['Postulados']){
                    if(Snapshot.docs[j].data()['Postulados'].includes(user)){
                        evidencias.push([Snapshot.docs[j].data(),querySnapshot.docs[i].data()])
                    }
                }
            }
        }

        setPostulacionesInf(evidencias);
    }

    const ActualizarPostulados =async (datos)=>{
        if(datos[1]=='descartar'){
            console.log('borrar usuario', datos);
            const ref=doc(db, 'Usuarios', datos[2].idSolicita, 'Trabajos', datos[2].id);
            await updateDoc(ref,{
                Postulados:arrayRemove(datos[0].id)
            })
        }
        if(datos[1]=='aceptar'){
            console.log('borrar todos los usuarios y cambiar estado', datos);
            const ref=doc(db, 'Usuarios', datos[2].idSolicita, 'Trabajos', datos[2].id);
            await updateDoc(ref,{
                Postulados:[datos[0].id],
                Estado:'En proceso'
            })
        }
    }

    const guardarIntencionPago = async (date)=>{
  
        const docRef = await addDoc(
          collection(db, "Stripe-Custom", user,"payments"), {
      
            amount: date.amount,
            amount_capturable: date.amount_capturable,
            amount_details: date.amount_details,
            amount_received: date.amount_received,
            application:date.application,
            application_fee_amount: date.application_fee_amount,
            automatic_payment_methods: date.automatic_payment_methods,
            canceled_at: date.canceled_at,
            cancellation_reason:date.cancellation_reason,
            capture_method:date.capture_method,
            client_secret: date.client_secret,
            confirmation_method: date.confirmation_method,
            created: date.created,
            currency: date.currency,
            customer: date.customer,
            description: date.description,
            id: date.id,
            invoice: date.invoice,
            last_payment_error: date.last_payment_error,
            latest_charge: date.latest_charge,
            livemode: date.livemode,
            metadata: date.metadata,
            next_action:date.next_action,
            object:date.object,
            on_behalf_of:date.on_behalf_of,
            payment_method: date.payment_method,
            payment_method_options: date.payment_method_options,
            payment_method_types:date.payment_method_types,
            processing: date.processing,
            receipt_email: date.receipt_email,
            review: date.review,
            setup_future_usage: date.setup_future_usage,
            shipping: date.shipping,
            source: date.source,
            statement_descriptor: date.statement_descriptor,
            statement_descriptor_suffix:date.statement_descriptor_suffix,
            status:date.status,
            transfer_data:date.transfer_data,
            transfer_group:date.transfer_group,
      
        });
        // console.log("Document written with ID: ", docRef.id);
        return docRef.id
      }

      const GuardarMetodoPago=async (data)=>{
        const docRef = await addDoc(
          collection(db, "Stripe-Custom", user,"payment_methods"), {
            billing_details:data.billing_details,
            card:data.card,
            created: data.created,
            customer:data.customer,
            id: data.id,
            livemode: data.livemode,
            object: data.object,
            type: data.type 
        });
        // console.log("Document written with ID: ", docRef.id);
      }

      const Tarjetas = async ()=>{
        const q = collection(db, "Stripe-Custom", user,"payment_methods");
        const querySnapshot = await getDocs(q);
    
        if(querySnapshot.docs.length>0){
          const dataDB=querySnapshot.docs.map((doc)=>doc.data());
          setTarjetas(dataDB);
        } else{
          setTarjetas(null);
        }
      }

  return {
    PublicarCurso,
    PublicarTramite,
    Publicaciones,
    Historial,
    Perfil,
    UserInf,
    Postularme,
    Postulaciones,
    PostulacionesInf,
    ActualizarPostulados,
    guardarIntencionPago,
    GuardarMetodoPago,
    tarjetas, Tarjetas,
  }
}

export default Procesamiento