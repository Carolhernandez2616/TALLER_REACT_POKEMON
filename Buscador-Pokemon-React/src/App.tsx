import { useEffect, useState } from 'react'
import './App.css'

interface PokemonOption {
  name: string
  url: string
}

interface PokemonDetails {
  name: string
  image: string
  types: string[]
}

function App() {
  const [pokemonList, setPokemonList] = useState<PokemonOption[]>([])
  const [query, setQuery] = useState('')
  const [highlightedIndex, setHighlightedIndex] = useState(0)
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetails | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=1302')
      .then((response) => {
        if (!response.ok) throw new Error('No se pudo cargar la lista')
        return response.json() as Promise<{ results: PokemonOption[] }>
      })
      .then((data) => setPokemonList(data.results))
      .catch(() => setError('No se pudo cargar el autocompletado.'))
      .finally(() => setIsLoading(false))
  }, [])

  const suggestions = query.trim().length < 2
    ? []
    : pokemonList
        .filter((pokemon) => pokemon.name.startsWith(query.trim().toLowerCase()))
        .slice(0, 8)

  const choosePokemon = (pokemon: PokemonOption) => {
    setQuery(pokemon.name)
    setHighlightedIndex(0)
    setSelectedPokemon(null)
    fetch(pokemon.url)
      .then((response) => response.json())
      .then((data: { name: string; sprites: { front_default: string }; types: { type: { name: string } }[] }) => {
        setSelectedPokemon({
          name: data.name,
          image: data.sprites.front_default,
          types: data.types.map(({ type }) => type.name),
        })
      })
      .catch(() => setError('No se pudo cargar ese Pokémon.'))
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!suggestions.length) return

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setHighlightedIndex((index) => (index + 1) % suggestions.length)
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      setHighlightedIndex((index) => (index - 1 + suggestions.length) % suggestions.length)
    }
    if (event.key === 'Enter') {
      event.preventDefault()
      choosePokemon(suggestions[highlightedIndex])
    }
    if (event.key === 'Escape') {
      setQuery('')
      setSelectedPokemon(null)
    }
  }

  return (
    <main className="app-shell">
      <section className="search-panel">
        <p className="eyebrow">Pokedex</p>
        <h1>Encuentra tu Pokemon</h1>
        <p className="subtitle">Escribe un nombre y elige una sugerencia.</p>
        <div className="search-box">
          <input
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setHighlightedIndex(0)
              setSelectedPokemon(null)
              setError('')
            }}
            onKeyDown={handleKeyDown}
            placeholder="Busca, por ejemplo, pikachu"
            role="combobox"
            aria-autocomplete="list"
            aria-expanded={suggestions.length > 0}
            aria-controls="pokemon-suggestions"
            aria-activedescendant={suggestions[highlightedIndex] ? `pokemon-${suggestions[highlightedIndex].name}` : undefined}
          />
          <span className="search-icon" aria-hidden="true">⌕</span>
          {suggestions.length > 0 && (
            <ul id="pokemon-suggestions" className="suggestions" role="listbox">
              {suggestions.map((pokemon, index) => (
                <li
                  key={pokemon.name}
                  id={`pokemon-${pokemon.name}`}
                  className={index === highlightedIndex ? 'active' : ''}
                  role="option"
                  aria-selected={index === highlightedIndex}
                  onMouseDown={() => choosePokemon(pokemon)}
                >
                  <span>{pokemon.name}</span>
                  <span className="suggestion-arrow">↗</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        {isLoading && <p className="status">Cargando Pokemon...</p>}
        {error && <p className="status error">{error}</p>}
      </section>

      {selectedPokemon && (
        <article className="pokemon-card">
          <img src={selectedPokemon.image} alt={selectedPokemon.name} />
          <div>
            <p className="card-label">Seleccionado</p>
            <h2>{selectedPokemon.name}</h2>
            <div className="types">
              {selectedPokemon.types.map((type) => <span key={type}>{type}</span>)}
            </div>
          </div>
        </article>
      )}
    </main>
  )
}

export default App
