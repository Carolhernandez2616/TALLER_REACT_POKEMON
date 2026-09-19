import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePokemon, type PokemonTarjeta } from '../context/pokemonContext';

export const BuscadorPokemon: React.FC = () => {
    const { entrenadorActivo, guardarPokemonMochila, mochilaActual } = usePokemon();

    const [busqueda, setBusqueda] = useState('');
    const [pokemonActual, setPokemonActual] = useState<PokemonTarjeta | null>(null);
    const [mensajeError, setMensajeError] = useState<string | null>(null);
    const [cargando, setCargando] = useState(false);
    const navigate = useNavigate();
    const primerFavorito = mochilaActual.find((pokemon) => pokemon.esFavorito);




    const buscarPokemon = async (e: React.FormEvent) => {
        e.preventDefault();


        const query = busqueda.trim().toLowerCase();

        if (!query) {
            return;
        }

        setCargando(true);
        setMensajeError(null);

        try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
            if (!res.ok) throw new Error('Auxilio, Socorro, no hay Pokemon');

            const datos = await res.json();
            setPokemonActual({
                id: datos.id,
                name: datos.name,
                image: datos.sprites.other?.['official-artwork']?.front_default ?? datos.sprites.front_default,
                type: datos.types[0].type.name,
                baseExperience: datos.base_experience,
                esFavorito: false

            });
        } catch (error: any) {
            setPokemonActual(null);
            setMensajeError(error.message);
        } finally {
            setCargando(false);
        }

    };

    const clickGuardar =  ()  => {

        if (!entrenadorActivo) {
            alert('Debes seleccionar o registrar un entrenador')
        }
        if (pokemonActual)  {
        guardarPokemonMochila(pokemonActual);
        alert(`El Pokemon ${pokemonActual.name}  es guardado en la mochila de ${entrenadorActivo?.nombreCompleto}`)
    }
        
        navigate('/inventario');

    }


return (
<div className='form-container'>
    <div>
        {entrenadorActivo ? (
            <p>Mochila Activa de: <strong>{entrenadorActivo.nombreCompleto}</strong></p>
        ) : (
            <p> No hay Entrenador Activo. Ve al formulario de registro para activarlo, socio.</p>
        )}
    </div>

     <form onSubmit={buscarPokemon}>
        <div>
            <label>Buscar Pokemon</label>
            <input type='text' value={busqueda} onChange={(e) => setBusqueda(e.target.value)} placeholder="Ej: Pikachu, Charmander, Snorlax" />
        </div>
        <button type="submit" disabled={cargando}>
            {cargando ? 'Escaneando...' : 'Buscar'}

        </button>
     </form>

      {mensajeError && <p className="search-error" role="alert">{mensajeError}</p>}

     {
        pokemonActual && (
            <div>
                <h3> {pokemonActual.name}</h3>
                <img src={pokemonActual.image}/>
                <p>
                    Elemento: {' '}
                    <span style={{
                        backgroundColor:
                        pokemonActual.type === 'fire' ? '#f80b0b':
                        pokemonActual.type === 'water' ? '#024aff':
                        pokemonActual.type === 'grass' ? '#14f539':
                        pokemonActual.type === 'electric' ? '#e2e60c': '#55080c',
                    color: 'white',
                    padding: '3px 8px',
                    borderRadius: '10px',
                    border: '2px solid #000000'
                    }}>
                    {pokemonActual.type.toUpperCase()}
                    </span>
                </p>
                <p>
                    Experiencias Base: <strong>{pokemonActual.baseExperience}</strong>
                    <button type="button" className="btn-capturar" onClick={clickGuardar}  disabled= {!entrenadorActivo}>
                        Guardar en la Mochila
                    </button>
                </p>
            </div>
        )
    }

    {primerFavorito && (
        <aside className="favorito-destacado">
            <div className="favorito-destacado__cabecera">
                <span className="favorito-destacado__estrella" aria-hidden="true">★</span>
                <span className="favorito-destacado__etiqueta">PRIMER LUGAR</span>
            </div>
            <div className="favorito-destacado__contenido">
                <img src={primerFavorito.image} alt={primerFavorito.name} />
                <div>
                    <h3>{primerFavorito.name}</h3>
                    <p className={`tipo-pokemon tipo-${primerFavorito.type}`}>
                        {primerFavorito.type.toUpperCase()}
                    </p>
                </div>
            </div>
        </aside>
    )}
</div>
);
};





