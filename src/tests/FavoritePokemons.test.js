import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import RenderWithRouter from './RenderWithRouter';

describe('Testa se <FavoritePokemons.js /> tem o comportamento sperado', () => {
  it('Testa se a página exibe o conteudo correto', () => {
    const { getByText, getByRole, getAllByRole,
    } = RenderWithRouter(<App />);

    const favoritePage = getByRole('link', { name: /Favorite Pokémons/i });
    const homePage = getByRole('link', { name: /home/i });

    userEvent.click(favoritePage);

    const favoriteNotFound = getByText(/No favorite pokemon found/i);
    expect(favoriteNotFound).toBeInTheDocument();

    userEvent.click(homePage);
    userEvent.click(getByRole('link', { name: /More details/i }));

    userEvent.click(getByRole('checkbox', { name: /Pokémon favoritado/i }));
    userEvent.click(favoritePage);

    expect(favoriteNotFound).not.toBeInTheDocument();
    expect(getByText(/Pikachu/i)).toBeInTheDocument();

    userEvent.click(homePage);
    userEvent.click(getByRole('button', { name: /Próximo pokémon/i }));
    userEvent.click(getByRole('link', { name: /More details/i }));
    userEvent.click(getByRole('checkbox', { name: /Pokémon favoritado/i }));
    userEvent.click(favoritePage);

    expect(favoriteNotFound).not.toBeInTheDocument();
    expect(getAllByRole('link', { name: /More details/i })).toHaveLength(2);
  });
});
