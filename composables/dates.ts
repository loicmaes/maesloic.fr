export const useCopyrightDates = () => {
  const start = new Date(2025, 5, 6).getFullYear();
  const current = new Date().getFullYear();

  return {
    dates: [
      start,
      current,
    ],
    same: start === current,
  };
};
