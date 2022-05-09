import React from 'react';
// import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RenderWithRouter from '../services/RenderWithRouter';
import App from '../App';

//
describe('Teste se o componente <App /> tem o comportamento esperado', () => {
  it('Testa se o link "Home" está configurado corretamente', () => {
    const { getAllByRole, history } = RenderWithRouter(<App />);
    const links = getAllByRole('link', { name: 'Home' });

    expect(links[0]).toBeInTheDocument();
    expect(links[0]).toHaveTextContent('Home');

    userEvent.click(links[0]);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Testa se o link "About" está configurado corretamente', () => {
    const { getAllByRole, history } = RenderWithRouter(<App />);
    const links = getAllByRole('link');

    expect(links[1]).toBeInTheDocument();
    expect(links[1]).toHaveTextContent(/About/i);

    userEvent.click(links[1]);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Testa se o link "Favorite Pokémons" está configurado corretamente', () => {
    const { getAllByRole, history } = RenderWithRouter(<App />);
    const links = getAllByRole('link');

    expect(links[2]).toBeInTheDocument();
    expect(links[2]).toHaveTextContent(/Favorite Pokémons/i);

    userEvent.click(links[2]);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('Testa se acessar uma URL invalida é direcionado para "Not Found"', () => {
    const { getByRole, history } = RenderWithRouter(<App />);

    history.push('/invalida');
    const notFound = getByRole('heading', { level: 2, name: /not found/i });
    expect(notFound).toBeInTheDocument();
  });
});
