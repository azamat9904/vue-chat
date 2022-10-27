import allCountriesAndCitiesJson from "all-countries-and-cities-json";
import { ref } from "vue";

export const useCountries = () => {
  const COUNTRIES = Object.keys(allCountriesAndCitiesJson);
  const countries = ref(COUNTRIES);

  const country = ref(null);
  const setCountry = (newCountry) => (country.value = newCountry);

  const filterCountries = (searchText, update) => {
    if (searchText === "") return update(() => (countries.value = COUNTRIES));
    update(() => {
      countries.value = COUNTRIES.filter((country) =>
        country.toLowerCase().includes(searchText.toLowerCase())
      );
    });
  };

  return { countries, country, setCountry, filterCountries };
};
