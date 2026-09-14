import React, { useState }  from 'react';
import { useNavigate } from 'react-router-dom'; 
import { usePokemon, type Usuario } from '../context/pokemonContext';
 
export const RegistroUsuario: React.FC = () => {
    const {entrenadores,entrenadorActivo, registrarEntrenador, seleccionarEntrenador } = usePokemon();
    const navigate = useNavigate();

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [tipoDocumento, setTipoDocumento] = useState('CC');
    const [dni, setDni] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [genero, setGenero] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [pais, setPais] = useState('169');
    const [ciudad, setCiudad] = useState('');
    const [tratamientoDatos, setTratamientoDatos] = useState(true);

    const eventoSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if(!tratamientoDatos) {
            alert('Aceptar politica de privacidad');
            return;
        }
    }

    const nuevo : Usuario = {
        id : Date.now(),
        nombreCompleto : `${nombre} ${apellido}`,
        documento : {
            tipo: tipoDocumento,
            numero: dni
    },
        fechaNacimiento : fechaNacimiento,
        genero : genero,
        correoElectronico : correo,
        numeroTelefono : telefono ,
        domicilio : {
            paisDomicilio : pais,
            ciudadDomicilio : ciudad
        },
        tratamientoDatos :tratamientoDatos,
    };
    
    registrarEntrenador(nuevo);
    navigate('/pokemon');
   };

    return (
    
    <div>
        <p>Continuamos el Lunes</p>
    </div>
            )
        




