import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import RenderWithRouter from './RenderWithRouter';

describe('Testa o componente <Pokemon.js />', () => {
  // beforeEach(() => RenderWithRouter(<App />));
  it('Testa se é renderizado um card com as informações do pokémon', () => {
    const { history, getByRole, getByTestId } = RenderWithRouter(<App />);

    const pokeInfo = getByRole('link', { name: /More details/i });
    expect(pokeInfo).toBeInTheDocument();
    userEvent.click(pokeInfo);

    expect(getByRole('heading', {
      level: 2, name: 'Pikachu Details' })).toBeInTheDocument();
    expect(getByTestId('pokemon-name')).toHaveTextContent(/Pikachu/i);
    expect(getByTestId('pokemon-type')).toHaveTextContent(/Electric/i);
    expect(getByTestId('pokemon-weight')).toHaveTextContent(
      /Average weight: 6.0 kg/i,
    );

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  it('Testa se o pokemon é exibido com as imagens corretas', () => {
    const { getByRole, getByLabelText } = RenderWithRouter(<App />);

    userEvent.click(getByRole('link', { name: /More details/i }));
    userEvent.click(getByLabelText(/Pokémon favoritado?/i));

    const pokImage = getByRole('img', { name: 'Pikachu sprite' });
    expect(pokImage).toBeInTheDocument();
    expect(pokImage.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');

    const starImage = getByRole('img', { name: 'Pikachu is marked as favorite' });
    expect(starImage.src).toBe('http://localhost/star-icon.svg');
  });
});
