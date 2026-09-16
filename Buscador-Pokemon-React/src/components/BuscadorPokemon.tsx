import React, { useState } from 'react';
import { usePokemon, type PokemonTarjeta } from '../context/pokemonContext';

export const BuscadorPokemon: React.FC = () => {
    const { entrenadorActivo, guardarPokemonMochila } = usePokemon();

    const [busqueda, setBusqueda] = useState('');
    const [pokemonActual, setPokemonActual] = useState<PokemonTarjeta | null>(null);
    const [mensajeError, setMensajeError] = useState<string | null>;
    const [cargando, setCargando] = useState(false);



    const eventoSubmit = (e: React.FormEvent) => {
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
                image: datos.sprites.front_default,
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

    if (pokemonActual)  {
        guardarPokemonMochila(pokemonActual);
        alert(`El Pokemon ${pokemonActual} Bichito es guardado en la mochila de ${entrenadorActivo} Jaimito`)
    }

return (
<div>
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

     {
        pokemonActual && (
            <div>
                <h3> {pokemonActual.name}</h3>
                <img src={pokemonActual.image} />
            </div>
        )
    }
</div>
);
};





