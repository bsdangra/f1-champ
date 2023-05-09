const BASE_URL = "https://ergast.com/api/f1/";

export const driverStandings = () => {
  const url = `${BASE_URL}driverStandings/1.json?limit=100`;
  return fetch(url).then((res) => res.json());
};

export const winnerInfo = (season) => {
  const url = `${BASE_URL}${season}/results/1.json`;
  return fetch(url).then((res) => res.json()).catch((err) => console.log('TEST ', err));
};
