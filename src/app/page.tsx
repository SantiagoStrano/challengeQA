"use client";
import Image from "next/image";
import React, { useEffect, useState } from 'react';
import InModal from "../app/components/inModal";
import OutModal  from "../app/components/OutModal";




export default function Home() {
  const [isInModalOpen, setIsInModalOpen] = useState(false);
  const [isOutModalOpen, setIsOutModalOpen] = useState(false);
  const [registries, setRegistries] = useState([]);
  const [activeEmployees, setActiveEmployees] = useState([]);
  const [offEmployees, setOffEmployees] = useState([]);

  const handleOpenInModal = () => {
      setIsInModalOpen(true);
    };

  const handleCloseInModal = () => {
      setIsInModalOpen(false);
      fetchRegistries()
    };

  const handleOpenOutModal = () => {
      setIsOutModalOpen(true);
    };

  const handleCloseOutModal = () => {
      setIsOutModalOpen(false);
      fetchRegistries();
    };

  const fetchRegistries = async () => {
		await fetch('/api/registries')
			.then((res) => res.json())
            .then((data) => {
                setRegistries(data.data);
                const activeEmployees = data.data.filter((registry:any) => registry.isActive);
                setActiveEmployees(activeEmployees);
                const offEmployees = data.data.filter((registry:any) => !registry.isActive);
                setOffEmployees(offEmployees);
                console.log(activeEmployees)
            })               
    };
    useEffect(() => {
		fetchRegistries()
	}, []);
  return (
      <div className="flex items-center justify-center h-screen">
          <div className="text-center">
              <h1 className="text-3xl font-bold mb-4">Bienvenido</h1>
              <div className="flex justify-center">
                  <button onClick={handleOpenInModal} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">Ingreso</button>
                  <button onClick={handleOpenOutModal} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Egreso</button>
              </div>
          </div>
          

        <InModal registries={offEmployees} isOpen={isInModalOpen} onClose={handleCloseInModal} />

        <OutModal registries={activeEmployees} isOpen={isOutModalOpen} onClose={handleCloseOutModal} /> 
          
      </div>

  );
}