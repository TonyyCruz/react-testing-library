import React from 'react';
import FavoritePokemons from '../components/FavoritePokemons';
import RenderWithRouter from '../services/RenderWithRouter';

describe('Testa se <FavoritePokemons.js /> tem o comportamento sperado', () => {
  it('Testa se a página exibe o conteudo correto', () => {
    const { queryAllByRole, getByText } = RenderWithRouter(<FavoritePokemons />);
    const favorites = queryAllByRole('dialog');
    const noFavorites = getByText(/No favorite pokemon found/i);

    if (favorites.length === 0) {
      expect(noFavorites).toBeInTheDocument();
    }

    if (favorites.length > 0) {
      favorites.forEach((pok) => expect(pok).toBeInTheDocument());
      expect(noFavorites).not.toBeInTheDocument();
    }
  });
});
