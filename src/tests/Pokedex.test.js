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
      expect(getByText(name)).toBeInTheDocument();
      userEvent.click(proximoPokemon);
    });

    expect(getByText(/pikachu/i)).toBeInTheDocument();
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
            expect(pokeType).toBeInTheDocument();
            expect(buttonAll).toBeInTheDocument();
          }
          if (i === 0) {
            expect(getByText(p.name)).toBeInTheDocument();
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
    expect(getByText(/Charmander/i)).toBeInTheDocument();

    userEvent.click(buttonAll);
    expect(getByText(/Pikachu/i)).toBeInTheDocument();
  });
});
