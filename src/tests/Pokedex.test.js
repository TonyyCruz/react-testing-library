import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import RenderWithRouter from './RenderWithRouter';
import pokemons from '../data';

describe('Testa o componente <Pokedex.js />', () => {
  it('Testa se a página contém um heading h2 com o texto Encountered pokémons', () => {
    const { getByRole } = RenderWithRouter(<App />);
    const heading = getByRole('heading', { level: 2, name: /Encountered pokémons/i });

    expect(heading).toBeInTheDocument();
  });

  it('Testa se o botão "Próximo pokémon" tem o comportamento esperado', () => {
    const { getByTestId, getByText, getAllByTestId } = RenderWithRouter(<App />);

    const proximoPokemon = getByTestId('next-pokemon');
    const pokemonCard = getByTestId('pokemon-name');
    const allPokemonCard = getAllByTestId('pokemon-name');

    expect(allPokemonCard).toHaveLength(1);
    expect(proximoPokemon).toBeInTheDocument();
    expect(proximoPokemon).toHaveTextContent('Próximo pokémon');
    expect(pokemonCard).toBeInTheDocument();

    pokemons.forEach(({ name }) => {
      const displayedPokemon = getByText(name);
      expect(displayedPokemon).toBeInTheDocument();
      userEvent.click(proximoPokemon);
    });

    const displayedPokemon = getByText(/pikachu/i);
    expect(displayedPokemon).toBeInTheDocument();
  });

  it('Testa se a Pokédex tem os botões de filtro.', () => {
    const { getByText, getAllByTestId,
      getByRole } = RenderWithRouter(<App />);

    const seven = 7;
    const typeButton = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic',
      'Normal', 'Dragon'];
    const buttons = getAllByTestId('pokemon-type-button');
    const buttonAll = getByRole('button', { name: 'All' });
    const buttonNext = getByRole('button', { name: /Próximo pokémon/i });

    buttons.forEach((button, index) => {
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent(typeButton[index]);
      expect(buttonAll).toBeInTheDocument();
      userEvent.click(button);

      pokemons.filter((pok) => pok.type === typeButton[index])
        .forEach((p, i) => {
          if (i > 1) {
            userEvent.click(buttonNext);
            const pokeType = getByText(p.name);
            expect(pokeType).toBeInTheDocument();
            expect(buttonAll).toBeInTheDocument();
          }
          if (i === 0) {
            const pokeType = getByText(p.name);
            expect(pokeType).toBeInTheDocument();
            expect(buttonAll).toBeInTheDocument();
          }
        });
    });

    expect(buttons).toHaveLength(seven);
    expect(buttonAll).toBeInTheDocument();
  });

  it('Testa se a Pokédex contém um botão para resetar o filtro', () => {
    const { getByRole, getByText } = RenderWithRouter(<App />);

    const buttonAll = getByRole('button', { name: 'All' });
    const buttonNext = getByRole('button', { name: /Próximo pokémon/i });

    userEvent.click(buttonNext);
    let displayedPokemon = getByText(/Charmander/i);
    expect(displayedPokemon).toBeInTheDocument();

    userEvent.click(buttonAll);
    displayedPokemon = getByText(/Pikachu/i);
    expect(displayedPokemon).toBeInTheDocument();
  });
});
