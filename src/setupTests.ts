// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/vitest';

// jsdom does not implement scrollTo; keep test output clean when UI handlers call it.
Object.defineProperty(window, 'scrollTo', {
  value: () => {},
  writable: true,
});
