import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import RenderWithRouter from './RenderWithRouter';

describe('Teste o componente <PokemonDetails.js />', () => {
  it('Teste se detalhadas do pokémon selecionado são mostradas na tela', () => {
    const { history, getByRole, getByText } = RenderWithRouter(<App />);
    const paragraph = /This intelligent Pokémon roasts hard berries with electricity/i;

    const pokeInfoButton = getByRole('link', { name: /More details/i });
    userEvent.click(pokeInfoButton);
    expect(pokeInfoButton).not.toBeInTheDocument();

    expect(getByRole('heading', {
      level: 2, name: 'Pikachu Details' })).toBeInTheDocument();
    expect(getByRole('heading', {
      level: 2, name: 'Summary' })).toBeInTheDocument();
    expect(getByRole('heading', {
      level: 2, name: 'Game Locations of Pikachu' })).toBeInTheDocument();
    expect(getByText(paragraph)).toBeInTheDocument();

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  it('Teste se existe na página os mapas contendo as localizações do pokémon', () => {
    const { getByRole, getAllByRole, getByText,
      getByLabelText } = RenderWithRouter(<App />);

    userEvent.click(getByRole('link', { name: /More details/i }));

    expect(getByLabelText(/Pokémon favoritado?/i)).toBeInTheDocument();
    expect(getByText(/Kanto Viridian Forest/i)).toBeInTheDocument();
    expect(getByText(/Kanto Power Plant/i)).toBeInTheDocument();

    const PikachuLocat = getAllByRole('img', { name: 'Pikachu location' });
    expect(PikachuLocat[0]).toBeInTheDocument();
    expect(PikachuLocat[1]).toBeInTheDocument();
    expect(PikachuLocat[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(PikachuLocat[1].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });
});
