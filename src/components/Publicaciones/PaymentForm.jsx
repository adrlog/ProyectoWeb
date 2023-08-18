import { useContext, useEffect, useRef, useState } from 'react'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { Alert, Button } from 'react-bootstrap';
import { PubsContext } from '../../context/PanelPubsProvider'
import Procesamiento from './Procesamiento';
import { db, auth } from '../../config/firebase';
import { Timestamp, doc, getDoc, updateDoc} from "firebase/firestore";
import PagoPorEntrega from './PagoPorEntrega';

const PaymentForm = () => {
  const {Detalles, Pagado, setPagado, metodosPago}=useContext(PubsContext);
  const {GuardarMetodoPago, solicitarMetodos, 
    guardarIntencionPago} = Procesamiento();
  
  const {StateCancel}=PagoPorEntrega()

  const KEYS = import.meta.env.VITE_STRIPPE_PRIVATE_KEY;
  const user = auth.currentUser.uid.toString();

  const elements =useElements();
  const stripe= useStripe();
  const [message, setMessage] = useState('');
  const [oculto, setOculto] = useState(false);
  const form = useRef(null);



  const handleSubmit = async (e)=>{
    e.preventDefault();
    
    setOculto(true);
    const data = new FormData(form.current);
    const dataObject = Object.fromEntries([...data.entries()]);
    // console.log(dataObject);
    var presupuesto;

    if (!stripe || !elements) {
      return;
    }

    if (Detalles) {
      presupuesto = Detalles.Presupuesto + "00";
    }

    if(dataObject.target){
    //   var status=await Intent(presupuesto, acount.customer_id, dataObject.target,Detalles.id);
     console.log('Pagar con tarjeta existente');
    //   if (status=='proccess'){
    //     setMessage('procesando pago');
    //   }
      
      // console.log(dataObject.target, 'holitas');
      return
    }else{

      // crear intento de pago en el servidor
      setMessage('creando intento de pago');

      const {error:backendError ,clientSecret,infpay} = await fetch('https://stripe-3fpavoswiq-uc.a.run.app/create-payment-intent',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: presupuesto,
          PaymentMethodType: 'card',
          currency: 'mxn',
          customer: 'cus_NLmfQEIUwTDblL',
          transfer_group:Detalles.id,
        }),
      }).then(r=>r.json());

      if(backendError){
        setOculto(false);
        setMessage(backendError.message);
        return;
      }
      
      setMessage('intento de pago creado')
    
      // console.log(metodos)
      // confirmar el pagp en el cliente

      const {error: stripeError, paymentIntent}=await stripe.confirmCardPayment(
        clientSecret,{
          payment_method:{
            type:"card",
            card:elements.getElement(CardElement),
          }
        }
      );

      if(stripeError){
        setOculto(false);
        setMessage(stripeError.message);
        return;
      }
      setMessage(`PaymentIntent Status: ${paymentIntent.status}`);
      var refe=await guardarIntencionPago(infpay);
      // console.log(infpay);
      // console.log(paymentIntent);
      // console.log(refe, 'referencia para actualizar');

      if(paymentIntent.status==='succeeded'){
        // console.log(docForPay, 'docforpay')
        
        if(dataObject.aceptar){

          const files={
            customer:'cus_NLmfQEIUwTDblL'
          }

          $.ajax({
            type:'POST',
            url:`https://api.stripe.com/v1/payment_methods/${paymentIntent.payment_method}/attach`,
            headers:{
              Authorization: `Bearer ${KEYS}`
            },
            data:files,
            beforeSend:function(){
                setMessage('solicitando metodo de pago....');
            },
            success: function(response){
              setMessage('Guardando metodo de pago');
            },
            error: function(){
                setMessage('a ocurrido un error');
                setOculto(false);
            },
            timeout: 2500,
              }).then(async (value)=>{
                setMessage('Metodo guardado, redirigiendo a solicitudes');
              await GuardarMetodoPago(value).then(r=>location.reload())
            });

        }
        Detalles.aentregas[0].entregado=true;
        var entrega=Detalles.aentregas[0];

        StateCancel(Detalles, 'Finalizado', entrega);

        setPagado(true);

        const querySnapshot = doc(db, "Stripe-Custom", Detalles.Postulados[0].id);
        const Capital=await getDoc(querySnapshot);
        var total = parseInt(Capital.data()['Balance'])+parseInt(Detalles.Presupuesto);
        // console.log(Capital.Balance, 'total')
        await updateDoc(
          querySnapshot, 
          {
            "Balance": total,
          }
        )
      }
    }

  }

  return (
    <>
    <form onSubmit={handleSubmit} ref={form}>
        <CardElement />
        <div className="form-check mt-2">
          <input className="form-check-input" type="checkbox" name="aceptar" />
          <label className="form-check-label" htmlFor="flexCheckIndeterminate">
            Guardar metodo de pago
          </label>
      </div>
      {
        metodosPago&&metodosPago.map((pay, i)=>(
          <div key={i}>
              <input type="checkbox" className="btn-check" 
              name='target'
              value={pay.id}
              id="btn-check-outlined"/>
              <label className="btn btn-outline-primary" 
                htmlFor="btn-check-outlined">
                {`${pay.card.brand}/**** ${pay.card.last4}`}
              </label>
          </div>
        ))
      }
      {
        oculto?(''):(
          <div className="d-grid gap-2 mt-3">
            <Button type="submit" variant="outline-success" size="lg">
              <i className="fa-brands fa-shopify"></i> Pay
            </Button>
          </div>
        )}
      </form>
      {!message ? (
        ""
      ) : (
        <Alert variant="warning" className="mt-2">
          {message}
        </Alert>
      )}
    </>
  )
}

export default PaymentForm