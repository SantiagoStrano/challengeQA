import React, { useEffect, useState } from 'react';
import mongoose from 'mongoose';

const OutModal = ({ registries, isOpen, onClose }) => {

    const [fechaUsuario, setFechaUsuario] = useState('');
	  const [horaUsuario, setHoraUsuario] = useState('');
	  const [selectedOption, setSelectedOption] = useState();
    const [selectedEmployeeId, setSelectedEmployeeId] = useState();

    const handleChangeFecha = (event) => {
		setFechaUsuario(event.target.value);
	};

	const handleChangeHora = (event) => {
		setHoraUsuario(event.target.value);
	};

    useEffect(()=>{
        if(!isOpen){
            setFechaUsuario('');
            setHoraUsuario('');
            setSelectedOption('');
            setSelectedEmployeeId('');
                }
    },[onClose])


	const handleSelectChange = (event) => {
		setSelectedOption(event.target.value)
        const selectedRegistry = registries.find(registry => registry.name === event.target.value);
        if (selectedRegistry) {
            setSelectedEmployeeId(selectedRegistry.id);
        } 
	};


    const calcularDiferencia = () => {
		const nombreSeleccionado = selectedOption;

		const registroSeleccionado = registries.find(
			(registry) => registry.name === nombreSeleccionado
		);

		if (!registroSeleccionado) {
			console.log(
				`No se encontró ningún registro para el nombre seleccionado: ${nombreSeleccionado}`
			);
			return;
		}

		const fechaHoraUsuario = new Date(`${fechaUsuario}T${horaUsuario}`);
		const startDate = new Date(registroSeleccionado.startDate);

    if (fechaHoraUsuario < startDate) {
      alert("La fecha seleccionada es menor a la de ingreso");
      return false;
  }else {
		const diferenciaEnMilisegundos = fechaHoraUsuario - startDate;
		if (!isNaN(diferenciaEnMilisegundos)) {
			const horas = Math.floor(diferenciaEnMilisegundos / (1000 * 60 * 60));
			const minutos = Math.floor(
				(diferenciaEnMilisegundos % (1000 * 60 * 60)) / (1000 * 60)
			);

			alert(`El empleado trabajó ${horas} horas y ${minutos} minutos.`);            
            return true;            
		} else {
			console.log('Ha ocurrido un error al calcular la diferencia.');
		}
	};
  
}


	const manejarEgreso = () => {
		    if (calcularDiferencia())
          handleUpdateRegistry();
	  };

    

    const handleUpdateRegistry = async () => {
        try {
            const payload  = {
                name: selectedOption,
                isActive: false,
                startDate: null,
                };
          const response = await fetch(`/api/registries/${selectedEmployeeId}`, {
            method: "PUT",
            body: JSON.stringify(payload),
            headers: {
                "Content-type": "application/json",
              },
          });
      
          const data = await response.json();
          console.log("payload", JSON.stringify(payload));
          console.log("Update successful:", data); // Log the updated registry data
          location.reload();
        } catch (error) {
          console.error("Update failed:", error);
        }
      };

    return (
      <div
        className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center ${
          isOpen ? "" : "hidden"
        }`}
      >
        <div className="bg-white p-8 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Egreso</h2>
          <div className="mb-4">
            <label htmlFor="nombre" className="block mb-2">
              Nombre:
            </label>
            <select
              id="nombre"
              name="nombre"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={selectedOption}
              onChange={handleSelectChange}
            >
              <option selected value={""}>
                Seleccione Empleado
              </option>
              {registries.map((registry) => (
                <option key={registry.name} value={registry.name}>
                  {registry.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="fecha" className="block mb-2">
              Fecha:
            </label>
            <input
              type="date"
              id="fecha"
              name="fecha"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={fechaUsuario}
              onChange={handleChangeFecha}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="hora" className="block mb-2">
              Hora:
            </label>
            <input
              type="time"
              id="hora"
              name="hora"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={horaUsuario}
              onChange={handleChangeHora}
            />
          </div>
          <div className="flex justify-end">
            <button
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 ${
                selectedOption === "" ? "pointer-events-none opacity-50" : ""
              }`}
              onClick={manejarEgreso}
              disabled={selectedOption === ""}
            >
              Egreso
            </button>
            <button
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );
};


export default OutModal;