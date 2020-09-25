import exampleState from '../store/exampleState';

const STORAGE_KEY = 'my-tasks-redux';

export const saveState = (state) => {
  try {
    const serialized = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, serialized);
  } catch (e) {
    console.error('Failed to save state!');
    console.error(e);
  }
};

export const retrieveState = () => {
  try {
    const serialized = localStorage.getItem(STORAGE_KEY);
    if (serialized === null) return exampleState;
    return JSON.parse(serialized);
  } catch (e) {
    console.error('Failed to read state from local storage!');
    console.error(e);
  }
};

export const preloadExample = () => saveState(exampleState);
