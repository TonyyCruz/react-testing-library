import React from 'react';
import NotFound from '../components/NotFound';
import RenderWithRouter from './RenderWithRouter';

it('Testa o conteudo da página <NotFound.js />', () => {
  const { getByRole, getByAltText } = RenderWithRouter(<NotFound />);
  const text = getByRole('heading', { level: 2, name: /Page requested not found/i });
  const image = getByAltText(/Pikachu crying because the page/i);

  expect(text).toBeInTheDocument();
  expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
