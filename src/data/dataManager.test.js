import { render } from '@testing-library/react';
import App from '../App';
import dataManager from './dataManager';

test('Datamanager - load mock categories works', () => {
  // render(<App />);
  const mockCategories = dataManager.loadMockCategories();
  
  expect(mockCategories).toHaveLength(6);
});

test('Datamanager - load mock questions works', () => {
  // render(<App />);
  const mockQuestions = dataManager.loadMockQuestions();
  
  expect(mockQuestions).toHaveLength(86);
});

test('Datamanager - initialized after render', () => {
  render(<App />);
  const mockCategories = dataManager.getAllCategories();
  const mockCards = dataManager.getAllCards();
  
  expect(mockCategories.length).toBeGreaterThan(1);
  expect(mockCards.length).toBeGreaterThan(1);
});