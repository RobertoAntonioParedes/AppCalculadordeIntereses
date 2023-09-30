import { useState, useEffect } from "react";
import Header from "../components/Header.jsx";
import Button from "../components/Button.jsx";
import {formatearDinero, totalPagar} from "../helpers/index.js";

function App(){
  let [cantidad, setCantidad] = useState(10000);
  let [meses, setMeses] = useState(6);
  const [total, setTotal] = useState(totalPagar(cantidad, meses));
  const [pago, setPago] = useState(0);

  useEffect(()=>{
    const resultadoTotalPagar = totalPagar(cantidad, meses);
    setTotal(resultadoTotalPagar);
  }, [cantidad, meses, total]);

  useEffect(()=>{
    setPago(total/meses);
  }, [total])

  const MIN = 0;
  const MAX = 20000;
  const step = 100;

  function handleChange(e){
    setCantidad(+e.target .value)
  }

  function handleClickDecremento(){
    const valor = cantidad -step
    if(valor < MIN){
      alert('Cantidad no valida')
      return;
    }
    
    setCantidad(valor);
  }

  function handleClickIncremento(){
    const valor = cantidad + step
    if(valor > MAX){
      alert('Cantidad no valida')
      return;
    }
    
    setCantidad(valor);
  }
  return(
    <div className="bg-white my-20 shadow mx-auto max-w-lg p-10">
      <Header />
      <div className="flex justify-between my-8">
        <Button 
          operador= '-'
          fn={handleClickDecremento}
        />
        <Button 
          operador= '+'
          fn={handleClickIncremento}
        />  
      </div>
      <input 
        type="range"
        className="w-full h-6 bg-gray-200 accent-lime-500 hover:accent-lime-600"
        onChange={handleChange}
        min={MIN}
        max={MAX}
        step={step}
        value={cantidad}
        />
        <p className="text-center my-10 text-5xl font-extrabold text-indigo-600">
          {formatearDinero(cantidad)}
        </p>
        <h2 className="font-extrabold text-2xl text-center text-gray-500">Elige un <span className="text-indigo-600">Plazo</span> a pagar
        </h2>
        <select className="mt-5 p-2 w-full bg-white border border-gray-300 rounded-lg text-center text-xl font-bold text-gray-500"
        value={meses}
        onChange={e => setMeses(e.target.value)}>
          <option value={6}>6 Meses</option>
          <option value={12}>12 Meses</option>
          <option value={18}>18 Meses</option>
        </select>
        <div className="my-5 space-y-3 bg-gray-50 p-5">
          <h2 className="font-extrabold text-2xl text-center text-gray-500">Resumen <span className="text-indigo-600">de pagos</span></h2>
          <p className="text-xl text-gray-500 text-center font-bold">{meses} Meses</p>
          <p className="text-xl text-gray-500 text-center font-bold">{formatearDinero(total)} Total a pagar</p>
          <p className="text-xl text-gray-500 text-center font-bold">{formatearDinero(pago)} Mensuales</p>
        </div>
        
    </div>
    
  )
};

export default App;