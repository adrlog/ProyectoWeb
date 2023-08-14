import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db, storage } from '../../config/firebase';
import { PanelContext } from "../../context/PanelTrabajosProvider";




export const SaveComent = () => {

// console.log(data.id, 'data')

    //filtro para documentos ----------
    async function guardar(ids, IDdoc, img, pdf){
        var documento="";
        var documentoNombre="";
        var gif="";
        var imagen="";
        var nombre="";
        var video=""
        var obj={
            documento:'',
            documentoNombre:'',
            gif:'',
            imagen:'',
            nombre:'',
            video:'',
        };
       
    
        var file = img;
        
         if(file.name=='' && pdf.name==''){
                console.log("file")
                return obj=
                {
                documento:'',
                documentoNombre:'',
                gif:'',
                imagen:'',
                nombre:'',
                video:'',
                };
          }
    
        if (/\.(jpe?g|png|jpg||)$/i.test(file.name)){
            
            nombre=file.name
            const storageRef = ref(
            storage,
            `Trabajos/${IDdoc.Trabajador}/${IDdoc.id}/Imagenes/${ids}`
            );
          await  uploadBytes(storageRef, file).then(async (snapshot) => {
            await getDownloadURL(snapshot.ref).then((downloadURL)=> {
                imagen=downloadURL;
                console.log(imagen);
            });
          });
            
        }else
        if(/\.(pdf||)$/i.test(pdf.name)){
            console.log(pdf.name)
            documentoNombre=pdf.name
            const storageRef = ref(
            storage,
            `Trabajos/${IDdoc.Trabajador}/${IDdoc.id}/Doc/${ids}`
            );
          await  uploadBytes(storageRef, pdf).then(async (snapshot) => {
            await getDownloadURL(snapshot.ref).then((downloadURL)=> {
                documento=downloadURL;
                console.log(documento);
            });
          });
     
        }
        else if(/\.(mp4||)$/i.test(file.name)){
            console.log(file.name) 
            nombre=file.name
            const storageRef = ref(
            storage,
            `Trabajos/${IDdoc.Trabajador}/${IDdoc.id}/Vid/${ids}`
          );
          await  uploadBytes(storageRef, file).then(async (snapshot) => {
            await getDownloadURL(snapshot.ref).then((downloadURL)=> {
                video=downloadURL;
            });
          });
    
        }
        else{
            console.log("Extencion de archivo no permitido", "Intenta con un archivo valido", "warning");
        }
    
          var obj={
            documento: documento,
            documentoNombre:documentoNombre,
            gif:'',
            imagen:imagen,
            nombre:nombre,
            video:video,
        };
        return obj;
    }
    //filtro para documentos ----------

    //guardar en base de sdstos
    const guardarMensaje=async (docc, img, pdf, mensaje)=>{
        // console.log(user,' => ',contenido)
        var id=docc.idTrabajador;
        const Today = new Date();  
        const date=Today.toISOString('en-US', { hour12: false })     
        var fecha = date.substr(0, 10);
        var segundos = date.substr(13, 10);
        var contadores = date.substr(11, 2);
        let nuevo=Number(contadores-6);
        let formato1=`${fecha} ${nuevo}${segundos}`;
        
         var res= await guardar(formato1, docc, img, pdf);

        const querySnapshot = doc(db, "Usuarios", id, "Trabajos", docc.id, "Comentarios", formato1);
        await setDoc(querySnapshot,{ 
            
            documento: res.documento,
            documentoNombre:res.documentoNombre,
            envia: data.id,
            fecha: serverTimestamp(),
            gif:'',
            id:formato1,
            imagen:res.imagen,
            mensaje:mensaje,
            nombre:res.nombre,
            video:res.video,

        }) 
    }

    


  return {
    guardarMensaje,
    }
}

