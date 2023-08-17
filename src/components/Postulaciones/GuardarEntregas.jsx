import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db, storage, auth } from '../../config/firebase';
import { useState } from "react";

const GuardarEntregas = () => {

  const [resetEntregas,setResetEntregas]=useState(false);
    const userMio = auth.currentUser.displayName;
    //filtro para documentos ----------
    async function guardar(doc, file, cont,text){
    
        // console.log(file)

        var documento='';
        var nombreDocumento="";
        var imagen=[];
        var video='';
        var obj={
            descripcion:"",    
            documento: "",
            entregado:"",
            imagenes:"",
            nombreDocumento:"",
            video:"",
          };   
          
          // console.log('elements ', file);
            
            if(file==null){
              // console.log("file")
              return obj=
              {
                descripcion:text,    
                documento: "",
                entregado:"",
                imagenes:"",
                nombreDocumento:"",
                video:"",
              };
              
            }
          
          for(var i= 0; i<file.length; i++){
            // console.log(file[i].name);
            // console.log(i, ' => ', file.length);
            if (/\.(jpe?g|png|jpg||)$/i.test(file[i].name)){
                
              const storageRef = ref(
              storage,
              `Trabajos/${doc.idSolicita}/${doc.id}/${cont}/${file[i].name}`
              );
            await  uploadBytes(storageRef, file[i]).then(async (snapshot) => {
              await getDownloadURL(snapshot.ref).then((downloadURL)=> {
                  imagen.push(downloadURL);
                  // console.log(imagen);
              });
            });
              
          }else
          if(/\.(pdf||)$/i.test(file[i].name)){
  
              nombreDocumento=file[i].name
              const storageRef = ref(
              storage,
              `Trabajos/${doc.idSolicita}/${doc.id}/${cont}/${file[i].name}`
              );
            await  uploadBytes(storageRef, file[i]).then(async (snapshot) => {
              await getDownloadURL(snapshot.ref).then((downloadURL)=> {
                  documento=downloadURL;
                  // console.log(documento);
              });
            });
       
          }
          else if(/\.(mp4||)$/i.test(file[i].name)){
   
              const storageRef = ref(
              storage,
              `Trabajos/${doc.idSolicita}/${doc.id}/${cont}/${file[i].name}`
              );
            await  uploadBytes(storageRef, file[i]).then(async (snapshot) => {
              await getDownloadURL(snapshot.ref).then((downloadURL)=> {
                  video=downloadURL;
              });
            });
      
          }
          else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Extencion de archivo no permitido, Intenta con; pdf, mp4, jpeg, jpg, png',
            })
          }
        }
    
         obj={
            descripcion:text,    
            documento: documento,
            entregado:false,
            imagenes:imagen,
            nombreDocumento:nombreDocumento,
            video:video,
          };
          // console.log(obj, ' desde la funcion guardar')
        return obj;
    }
    //filtro para documentos ----------

    async function SavedAentregas(ref){
      const docRef  = doc(db, "Usuarios", ref.idSolicita, "Trabajos", ref.id);
      const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
        var entregas=docSnap.data()['aentregas'];
        return entregas;
        } 
    }

    //guardar en base de datos
    const guardarEntregables=async (Ref, img, text)=>{
        // console.log(user,' => ',contenido)
        console.log('corriendo entregables', Ref, img, text);

    //    console.log(img, 'en funcion')
    
       var EntregasAnteriores=[];
       var numentrega;
       var cont = await SavedAentregas(Ref);
       if(cont==undefined){
        numentrega=1;
       } else {
        numentrega=cont.length+1;
        cont.map((unidad)=>{
            EntregasAnteriores.push(unidad);
        });
       }

    
        var res = await guardar(Ref, img, numentrega, text);
        EntregasAnteriores.push(res);

         console.log(res, ' result');
         console.log(EntregasAnteriores, ' anteriores');


        const querySnapshot = doc(db, "Usuarios", Ref.idSolicita, "Trabajos", Ref.id);
        await updateDoc(querySnapshot,{ 
            
            aentregas:EntregasAnteriores,

        }).catch(e=>console.log(e))  
        
        return 'guardado';
    }


  return {
    guardarEntregables,
    resetEntregas,
    }

}

export default GuardarEntregas