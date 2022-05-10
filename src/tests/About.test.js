import React from 'react';
// import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import RenderWithRouter from '../services/RenderWithRouter';
import About from '../components/About';

describe('Teste se o componente <About /> tem o comportamento esperado', () => {
  it('Testa se a página contém as informações sobre a Pokédex', () => {
    const { getByText, getByRole, getByAltText } = RenderWithRouter(<About />);
    const about = getByText(/This application simulates a Pokédex/i);
    const heading = getByRole('heading', { level: 2, name: /About Pokédex/i });
    const image = getByAltText('Pokédex');
    // console.log('===>>>', image.src);

    expect(about).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
