const URL = 'https://restcountries.eu/rest/v2';
const FIELDS = 'name;capital;flag;population;region;';
const FIELDS_2 =
  'nativeName;subregion;topLevelDomain;currencies;languages;borders';

export const getAllCountries = async () => {
  const response = await fetch(`${URL}/all?fields=${FIELDS}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not fetch countries.');
  }

  return data;
};

export const getCountryByName = async (
  country: string,
  params: string = FIELDS
) => {
  const response = await fetch(`${URL}/name/${country}?fields=${params}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not fetch country.');
  }

  return data;
};

export const getCountryNameByCode = async (
  alpha3code: string,
  params = 'name'
) => {
  const response = await fetch(`${URL}/alpha/${alpha3code}?fields=${params}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not fetch country.');
  }

  return data.name;
};

export const getCountryDetails = async (
  country: string,
  params: string = FIELDS + FIELDS_2
) => {
  const response = await fetch(`${URL}/name/${country}?fields=${params}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not fetch country.');
  }

  return data;
};
