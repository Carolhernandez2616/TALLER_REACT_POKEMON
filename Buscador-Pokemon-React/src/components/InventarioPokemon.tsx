import React from 'react';
import { usePokemon } from '../context/pokemonContext';

export const InventarioPokemon: React.FC = () => {
    const { entrenadorActivo , eliminarPokemonDeMochila, actualizarFavorito, mochilaActual} = usePokemon();
    

    if(!entrenadorActivo){
        return(
        <div className="form-container">
            <h3> NO HAY ENTRENADORES</h3>
            <p> Por favor asigne <strong>entrenador activo</strong> o registre un entrenador </p>
        </div>
        );

    }


return (
<div className='form-container'>

    <header>
        <h2>Mochila de {entrenadorActivo.nombreCompleto}</h2>
    </header>
    {mochilaActual.length > 0 ? (
        <div className="grid-mochila">
            {mochilaActual.map( (poke , index) => (
                <div key ={poke.id} className={`tarjeta-item ${poke.esFavorito ? 'tarjeta-favorita' :''}`}>

                    <span>
                        #{index + 1} de {mochilaActual.length}
                    </span>

                    <img src={poke.image} />
                    <h4>{poke.name}</h4>
                    <p>{poke.type}</p>

                    <div className="panel-botones">
                        <button className={`btn-fav ${poke.esFavorito ? 'fav-activo' : ''}`}
                        onClick={() => actualizarFavorito(poke.id)}>
                            {poke.esFavorito ? ' 🌟⭐Favorito' : ' 🌟Marcar'}
                        </button>
                        <button type="button" className='btn-eliminar'
                        onClick={() => eliminarPokemonDeMochila(poke.id)}>Liberar o Soltar</button> 
                    </div>
                </div>
            ))}
        </div>
    ) : (
            <div>
                <p> Tu mochila esta vacia actualmente.</p>
                <p> ¡Vaya y capture pokemon, papi! </p>

            </div>
    )}
    
</div>
);
};





