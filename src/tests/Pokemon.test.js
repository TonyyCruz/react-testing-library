import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import RenderWithRouter from './RenderWithRouter';

describe('Testa o componente <Pokemon.js />', () => {
  it('Testa se é renderizado um card com as informações do pokémon', () => {
    const { getByRole, getByTestId } = RenderWithRouter(<App />);

    const pokeInfo = getByRole('link', { name: /More details/i });
    expect(pokeInfo).toBeInTheDocument();

    expect(getByTestId('pokemon-name')).toHaveTextContent(/Pikachu/i);
    expect(getByTestId('pokemon-type')).toHaveTextContent(/Electric/i);
    expect(getByTestId('pokemon-weight')).toHaveTextContent(
      /Average weight: 6.0 kg/i,
    );
  });

  it('Testa se o pokemon é exibido com as imagens corretas', () => {
    const { getByRole, getByLabelText, history } = RenderWithRouter(<App />);

    userEvent.click(getByRole('link', { name: /More details/i }));
    userEvent.click(getByLabelText(/Pokémon favoritado?/i));

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
    userEvent.click(getByRole('link', { name: /home/i }));

    const pokImage = getByRole('img', { name: 'Pikachu sprite' });
    expect(pokImage).toBeInTheDocument();
    expect(pokImage.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');

    const starImage = getByRole('img', { name: 'Pikachu is marked as favorite' });
    expect(starImage.src).toBe('http://localhost/star-icon.svg');
  });
});
