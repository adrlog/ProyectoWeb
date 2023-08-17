import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react'
import { db } from '../../config/firebase';

const PagoPorEntrega = () => {

  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');


  const CalcularMontoPago = async (documento) => {

    var mensaje;

    var monto = documento.presupuesto;
    var Divisor = documento.aentregas.length;
    var CapitalNeto = monto - (monto * 5) / 100;
    var pagables = CapitalNeto / Divisor;
    // console.log(pagables.toFixed(2), ' pagables');
    var apagar = pagables.toFixed(2);
    var string = apagar.toString();

    if (string.includes(".0") === true) {
      // console.log(string, ' es punto 0');
      const position = string.length - 3;
      const entero = string.substr(0, position);
      const stripePay = entero + '00';
      // console.log(stripePay);

      const { error: backendError, transfer } = await fetch('https://stripe-3fpavoswiq-uc.a.run.app/create-transfer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: stripePay,
          currency: 'mxn',
          destination: documento.accountTrabajador,
          transfer_group: documento.id,
        }),
      }).then(r => r.json());

      if (backendError) {
        setMessage(backendError.message);
        return;
      }

      setMessage(`Transfer to Worker 
        (${transfer.id})`);

      if (transfer.balance_transaction) {
        mensaje = 'ssucceded';
      }

      // console.log(transfer);

    } else {
      // console.log('tiene despues del punto algo direfente a cero');
      const position = string.length - 3;
      // console.log(position);
      const entero = string.substr(0, position);
      const decimales = string.substr(position + 1, position + 1)
      const stripePay = entero + decimales;

      const { error: backendError, transfer } = await fetch('https://stripe-3fpavoswiq-uc.a.run.app/create-transfer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: stripePay,
          currency: 'mxn',
          destination: documento.accountTrabajador,
          transfer_group: documento.id,
        }),
      }).then(r => r.json());

      if (backendError) {
        setMessage(backendError.message);
        return;
      }

      setMessage(`Transfer to Worker 
        (${transfer.id})`);

      if (transfer.balance_transaction) {
        mensaje = 'ssucceded';
      }
      // console.log(transfer);
    }

    return mensaje;

  }

  const StateCancel = async (docRefer, estado, entrega) =>{
    const SetStateWork = doc(db, "Usuarios", docRefer.idSolicita, 'Trabajos', docRefer.id);

    if(estado=='Finalizado'){
      updateDoc(
        SetStateWork, 
        {
          "Estado": estado,
          "aentregas":arrayUnion(entrega)
        }
      );
    } else {
      updateDoc(
        SetStateWork, 
        {
          "estado": estado,
        }
      );
    }
  }

  return {

    CalcularMontoPago,
    message,
    status,
    StateCancel
  }

}

export default PagoPorEntrega