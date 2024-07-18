// src/redux/localStorage.ts
export const loadState = () => {
  try {
    console.log("Loading state from localStorage");
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      console.log("No state found in localStorage");
      return undefined;
    }
    console.log("Loaded state:", JSON.parse(serializedState));
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Could not load state", err);
    return undefined;
  }
};

export const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
    console.log("Saved state to localStorage:", state);
  } catch (err) {
    console.error("Could not save state", err);
  }
};
