import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
// import FavoritePokemons from '../components/FavoritePokemons';
import RenderWithRouter from './RenderWithRouter';

describe('Testa se <FavoritePokemons.js /> tem o comportamento sperado', () => {
  it('Testa se a página exibe o conteudo correto', () => {
    const { queryAllByRole, getByText, getByRole,
    } = RenderWithRouter(<App />);

    const favoritePage = getByRole('link', { name: /Favorite Pokémons/i });
    const homePage = getByRole('link', { name: /home/i });

    userEvent.click(favoritePage);
    let favorites = queryAllByRole('dialog');

    const noFavorites = getByText(/No favorite pokemon found/i);
    if (favorites.length === 0) {
      expect(noFavorites).toBeInTheDocument();
    }

    userEvent.click(homePage);

    const moreDetails = getByRole('link', { name: /More details/i });
    userEvent.click(moreDetails);

    const favorite = getByRole('checkbox', { name: /Pokémon favoritado/i });
    userEvent.click(favorite);
    userEvent.click(favoritePage);
    favorites = queryAllByRole('dialog');

    if (favorites.length > 0) {
      favorites.forEach((pok) => expect(pok).toBeInTheDocument());
      expect(noFavorites).not.toBeInTheDocument();
    }
  });
});
