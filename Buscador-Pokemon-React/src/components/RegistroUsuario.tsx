import React, { useState }  from 'react';
import { useNavigate } from 'react-router-dom'; 
import { usePokemon, type Usuario } from '../context/pokemonContext';
 
export const RegistroUsuario: React.FC = () => {
    const {entrenadores,entrenadorActivo, registrarEntrenador, seleccionarEntrenador } = usePokemon();
    const navigate = useNavigate();

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [tipoDocumento, setTipo_de_documento] = useState('CC');
    const [dni, setdni] = useState('CC');
    const [fechaNacimiento, setFecha_de_nacimiento] = useState('');
    const [genero, setGenero] = useState('');
    const [correo, setCorreo_electronico] = useState('');
    const [telefono, setNumero_de_telefono] = useState('');
    const [pais, setPais_de_domicilio] = useState('');
    const [ciudad, setCiudad_de_domicilio] = useState('');
    const [tratamientoDatos, setTratamiento_de_datos] = useState('');

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
        fecha_Nacimiento : fechaNacimiento,
        Genero : genero,
        Correo_electronico : correo,
        Numero_de_telefono : telefono ,
        domicilio : {
            Pais_de_domicilio : pais,
            Ciudad_de_domicilio : ciudad
        },
        tratamiento_de_datos :tratamientoDatos,
    };
    
    registrarEntrenador(nuevo);
    navigate('/pokemon');
   };

    return (

            <div>
                <p>Continuamos el Lunes</p>
            </div>
            )
        };
   
};




