import { ref, computed, watch } from "vue";
import allCountriesAndCitiesJson from "all-countries-and-cities-json";

export const useCities = (country) => {
  const cities = ref([]);
  const city = ref(null);
  const setCity = (newValue) => (city.value = newValue);
  const isCityDisabled = computed(() => !country.value);

  const filterCities = (searchText, update) => {
    const CURRENT_CITIES = allCountriesAndCitiesJson[country.value];
    if (searchText === "") return update(() => (cities.value = CURRENT_CITIES));
    update(() => {
      cities.value = CURRENT_CITIES.filter((currentCity) =>
        currentCity.toLowerCase().includes(searchText.toLowerCase())
      );
    });
  };

  watch(country, () => {
    if (country.value) {
      cities.value = allCountriesAndCitiesJson[country.value];
      return;
    }
    city.value = null;
    cities.value = [];
  });

  return { city, setCity, cities, filterCities, isCityDisabled };
};
