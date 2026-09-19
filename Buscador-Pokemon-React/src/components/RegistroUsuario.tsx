import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePokemon, type Usuario } from '../context/pokemonContext';

export const RegistroUsuario: React.FC = () => {
    const { entrenadores, entrenadorActivo, registrarEntrenador, seleccionarEntrenador } = usePokemon();
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
    const [tratamientoDatos, setTratamientoDatos] = useState(false);

    const eventoSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!tratamientoDatos) {
            alert('Aceptar politica de privacidad');
            return;
        }


    const nuevo: Usuario = {
        id: Date.now(),
        nombreCompleto: `${nombre} ${apellido}`,
        documento: {
            tipo: tipoDocumento,
            numero: dni
        },
        fechaNacimiento: fechaNacimiento,
        genero: genero,
        correoElectronico: correo,
        numeroTelefono: telefono,
        domicilio: {
            paisDomicilio: pais,
            ciudadDomicilio: ciudad
        },
        tratamientoDatos: tratamientoDatos,
    };

        registrarEntrenador(nuevo);
        navigate('/buscador');

    };  

return (
    <>
    <div className="form-container">
        <header>
            <h2>Registro de Entrenadores</h2>
        </header>

        <div>
            <header className="card__header">
                <h1 id="form-title" className="card__title">Formulario de Registro</h1>
                <p className="card__subtitle">Complete sus datos personales para crear su cuenta</p>
            </header>

            <div>
                <form onSubmit={eventoSubmit}>

                    <div className="grid">

                        <div className="field">
                            <label htmlFor="nombre">Nombre <span className="req">*</span></label>
                            <input type="text" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} name="nombre" className="input"
                                placeholder="Ej. Carolina" required  />
                                <span className="hint hint--error">Ingrese un nombre válido (solo letras).</span>
                        </div>

                        <div className="field">
                            <label htmlFor="apellido">Apellido <span className="req">*</span></label>
                            <input type="text" id="apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} name="apellido" className="input"
                                placeholder="Ej. Ramírez" required />
                                <span className="hint hint--error">Ingrese un apellido válido (solo letras).</span>
                        </div>

                        <div className="field">
                            <label htmlFor="tipoDocumento">Tipo de documento <span className="req">*</span></label>
                            <select id="tipoDocumento" value={tipoDocumento} onChange={(e) => setTipoDocumento(e.target.value)} name="tipoDocumento" className="select" required>
                                <option value="" selected disabled>Seleccione…</option>
                                <option value="CC">Cédula de ciudadanía (CC)</option>
                                <option value="TI">Tarjeta de identidad (TI)</option>
                                <option value="CE">Cédula de extranjería (CE)</option>
                                <option value="PA">Pasaporte (PA)</option>
                                <option value="PPT">Permiso por Protección Temporal (PPT)</option>
                            </select>
                            <span className="hint hint--error">Seleccione un tipo de documento.</span>
                        </div>

                        <div className="field">
                            <label htmlFor="dni">Número de documento <span className="req">*</span></label>
                            <input type="text"  id="dni" value={dni} onChange={(e) => setDni(e.target.value)} name="dni" className="input input--mono"
                                placeholder="Ej. 1013456789" required 
                            />
                                <span className="hint hint--error">Ingrese un número de documento válido.</span>
                        </div>

                        <div className="field">
                            <label htmlFor="fechaNacimiento">Fecha de nacimiento <span className="req">*</span></label>
                            <input type="date" id="fechaNacimiento" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} name="fechaNacimiento" className="input" required />
                                <span className="hint hint--error">Ingrese una fecha válida.</span>
                        </div>

                        <div className="field">
                            <label htmlFor="genero">Género <span className="req">*</span></label>
                            <select id="genero" value={genero} onChange={(e) => setGenero(e.target.value)} name="genero" className="select" required >
                                <option value="" selected disabled>Seleccione…</option>
                                <option value="F">Femenino</option>
                                <option value="M">Masculino</option>
                                <option value="O">Otro</option>
                                <option value="N">Prefiero no decir</option>
                            </select>
                            <span className="hint hint--error">Seleccione una opción.</span>
                        </div>

                    </div>

                    <p className="section-label">Contacto</p>

                    <div className="grid">

                        <div className="field">
                            <label htmlFor="correo">Correo electrónico <span className="req">*</span></label>
                            <input type="email" id="correo" value={correo} onChange={(e) => setCorreo(e.target.value)} name="correo" className="input"
                                placeholder="nombre@correo.com" required />
                                <span className="hint hint--error">Ingrese un correo electrónico válido.</span>
                        </div>

                        <div className="field">
                            <label htmlFor="telefono">Número de teléfono <span className="req">*</span></label>
                            <input type="tel"  id="telefono" value={telefono} onChange={(e) => setTelefono(e.target.value)} name="telefono" className="input input--mono"
                                placeholder="Ej. +57 3001234567" required />
                                <span className="hint hint--error">Ingrese un teléfono válido, con indicativo de país.</span>
                        </div>

                        <div className="field">
                            <label htmlFor="pais">País de domicilio <span className="req">*</span></label>
                            <select id="pais" value={pais} onChange={(e) => setPais(e.target.value)} name="pais" className="select" required>
                                <option value="" disabled selected>Seleccione un país…</option>
                                <option value="480">México</option>
                                <option value="169">Colombia</option>
                                <option value="850">Estados Unidos</option>
                            </select>
                            <span className="hint hint--error">Seleccione su país de domicilio.</span>
                        </div>

                        <div className="field">
                            <label htmlFor="ciudad">Ciudad de domicilio <span className="req">*</span></label>
                            <select id="ciudad" value={ciudad} onChange={(e) => setCiudad(e.target.value)} name="ciudad" className="select" required>
                                <option value="" selected disabled>Seleccione una ciudad…</option>

                                <optgroup label="Colombia">
                                    <option value="11001">Bogotá</option>
                                    <option value="05001">Medellín</option>
                                    <option value="76001">Cali</option>
                                    <option value="08001">Barranquilla</option>
                                    <option value="13001">Cartagena</option>
                                </optgroup>

                                <optgroup label="México">
                                    <option value="01000">Ciudad de México</option>
                                    <option value="44000">Guadalajara</option>
                                    <option value="64000">Monterrey</option>
                                    <option value="72000">Puebla</option>
                                    <option value="22000">Tijuana</option>
                                </optgroup>

                                <optgroup label="Estados Unidos">
                                    <option value="10001">Nueva York</option>
                                    <option value="90001">Los Ángeles</option>
                                    <option value="60601">Chicago</option>
                                    <option value="77001">Houston</option>
                                    <option value="19102">Filadelfia</option>
                                </optgroup>
                            </select>
                            <span className="hint hint--error">Seleccione una ciudad.</span>
                        </div>

                    </div>

                    <p className="section-label">Autorización</p>

                    <details className="policy">
                        <summary>Ver política de tratamiento de datos</summary>
                        <p>Los datos personales suministrados en este formulario (nombre, apellido, tipo y número
                            de documento, fecha de nacimiento, correo electrónico, domicilio y teléfono) serán
                            utilizados exclusivamente para fines de identificación, registro y contacto.</p>
                        <p>Usted puede solicitar en cualquier momento el acceso, actualización, rectificación
                            o eliminación de sus datos, escribiendo al canal de atención dispuesto para tal fin.</p>
                    </details>

                    <div className="consent">
                        <label className="checkbox">
                            <input type="checkbox" id="tratamientoDatos" checked={tratamientoDatos} onChange={(e) => setTratamientoDatos(e.target.checked)} name="tratamientoDatos" required />
                                <span className="checkbox__box" aria-hidden="true"></span>
                                <span className="checkbox__text">
                                    Autorizo el <strong>tratamiento de mis datos personales</strong> conforme a la Ley 1581 de 2012
                                    y demás normas aplicables, para los fines descritos en la política de tratamiento de datos.
                                    <span className="req">*</span>
                                </span>
                        </label>
                        <span className="hint hint--error hint--checkbox">Debe aceptar el tratamiento de datos para continuar.</span>
                    </div>

                    <div className="actions">
                        <button type="submit" className="btn btn--primary">Enviar registro <span className="btn__arrow" aria-hidden="true">→</span>
                        </button>
                    </div>
                </form>
            </div>


        </div>

        {entrenadores.length > 0 && (
                <div>
                    <h3> Cambiar Entrenador </h3>
                    <div>
                        {entrenadores.map((user) => (
                            <button key={user.id} type='button' onClick={() => seleccionarEntrenador(user)}
                            style={{
                                backgroundColor: entrenadorActivo?.id === user.id ? '#c212c2' : 'rgb(248, 100, 100)',
                                color :entrenadorActivo?.id === user.id ? 'white' : 'black',
                                padding: '6px 12px',


                            }}> {user.nombreCompleto} </button>
                            
                        ))}
                 
                    </div>
                </div>   
            )}
    </div>
    </>
    );

};




