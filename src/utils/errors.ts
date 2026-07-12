export const debugPanic = (error: Error) => {
  if (import.meta.env.DEV) throw error;
  console.error(`${error.name}: ${error.message}`);
};
