import {getCategoriesWithCardCount, getCategoryById, getQuestionById, getQuestionsByCategory, mockCategories, mockQuestions} from './mockData';

test('mockData - getCategoriesWithCardCount works', () => {
  const mockCategories = getCategoriesWithCardCount();
  
  expect(mockCategories.length).toBeGreaterThan(1);
});

test('mockData - getQuestionsByCategory works', () => {
  const mockQuestions = getQuestionsByCategory('cat1');
  
  expect(mockQuestions.length).toBeGreaterThanOrEqual(1);
});

test('mockData - getQuestionsByCategory returns zero for non existing category', () => {
  const mockQuestions = getQuestionsByCategory('cat_non_existing');
  
  expect(mockQuestions).toHaveLength(0);
});

test('mockData - getQuestionById works', () => {
  const mockQuestions = getQuestionById('q1');
  
  expect(mockQuestions).toBeDefined();
});

test('mockData - getQuestionById returns undefined for non existing question', () => {
  const mockQuestions = getQuestionById('q_non_existing');
  
  expect(mockQuestions).toBeUndefined();
});

test('mockData - getCategoryById works', () => {
  const mockQuestions = getCategoryById('cat1');
  
  expect(mockQuestions).toBeDefined();
});

test('mockData - getCategoryById returns undefined for non existing question', () => {
  const mockQuestions = getCategoryById('cat_non_existing');
  
  expect(mockQuestions).toBeUndefined();
});