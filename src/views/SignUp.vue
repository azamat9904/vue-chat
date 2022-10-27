<template>
  <div class="main">
    <div class="sign-up">
      <q-form class="sign-up__form q-pa-sm">
        <p class="sign-up__title">Форма регистрации</p>
        <div class="q-gutter-sm">
          <q-input
            v-model="v$.form.email.$model"
            :error="v$.form.email.$error"
            bottom-slots
            dense
            label="Email"
            lazy-rules
            outlined
            shadow-text
            type="email"
          />

          <q-input
            v-model="v$.form.password.$model"
            :error="v$.form.password.$error"
            dense
            label="Пароль"
            lazy-rules
            outlined
            shadow-text
            type="password"
          />

          <q-input
            v-model="v$.form.repeatPassword.$model"
            :error="v$.form.repeatPassword.$error"
            dense
            label="Повторите пароль"
            lazy-rules
            outlined
            shadow-text
            type="password"
          />

          <q-input
            v-model="v$.form.firstname.$model"
            :error="v$.form.firstname.$error"
            dense
            label="Имя"
            lazy-rules
            outlined
            shadow-text
            type="text"
          />

          <q-input
            v-model="v$.form.lastname.$model"
            :error="v$.form.lastname.$error"
            dense
            label="Фамилия"
            lazy-rules
            outlined
            shadow-text
            type="text"
          />

          <BaseCalendar
            v-model="v$.form.birthday.$model"
            :error="v$.form.birthday.$error"
            dense
            label="Дата рождения"
            lazy-rules
            mask="date"
            outlined
            shadow-text
          />

          <q-select
            :error="v$.country.$error"
            :model-value="country"
            :options="countries"
            dense
            label="Страна"
            outlined
            use-input
            @filter="filterCountries"
            @update:model-value="setCountry"
          />
          <q-select
            :disable="isCityDisabled"
            :error="v$.city.$error"
            :model-value="city"
            :options="cities"
            dense
            label="Город"
            outlined
            use-input
            @filter="filterCities"
            @update:model-value="setCity"
          />

          <q-radio
            v-model="form.gender"
            checked-icon="task_alt"
            label="Мужчина"
            unchecked-icon="panorama_fish_eye"
            val="male"
          />

          <q-radio
            v-model="form.gender"
            checked-icon="task_alt"
            label="Женщина"
            unchecked-icon="panorama_fish_eye"
            val="female"
          />
        </div>
        <q-btn
          class="bg-primary text-white full-width q-mt-sm"
          @click="signupHandler"
        >
          Зарегистрироваться
        </q-btn>
      </q-form>
    </div>
  </div>
</template>
<script>
import { reactive } from "vue";
import { useCities } from "@/composables/useCities";
import { useCountries } from "@/composables/useCountries";
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { isValidDate } from "@/helpers/date";
import BaseCalendar from "@/components/base/BaseCalendar";
import { useQuasar } from "quasar";

export default {
  setup() {
    const form = reactive({
      email: null,
      password: null,
      repeatPassword: null,
      firstname: null,
      lastname: null,
      gender: "male",
      birthday: null,
    });

    const { countries, country, setCountry, filterCountries } = useCountries();
    const { city, setCity, cities, filterCities, isCityDisabled } =
      useCities(country);

    const v$ = useVuelidate(
      {
        form: {
          email: {
            required,
            email,
          },
          password: {
            required,
          },
          repeatPassword: {
            required,
            sameAsPassword: (repeatedPassword) =>
              repeatedPassword === form.password,
          },
          firstname: {
            required,
          },
          lastname: {
            required,
          },
          gender: {
            required,
          },
          birthday: {
            required,
            isValidDate,
          },
        },
        country: {
          required,
        },
        city: {
          required,
        },
      },
      { form, country, city }
    );
    const touchedSetCountry = (country) => {
      setCountry(country);
      v$.value.country.$touch();
      v$.value.city.$reset();
    };
    const touchedSetCity = (city) => {
      setCity(city);
      v$.value.city.$touch();
    };

    return {
      form,
      countries,
      country,
      cities,
      isCityDisabled,
      filterCities,
      filterCountries,
      setCountry: touchedSetCountry,
      setCity: touchedSetCity,
      q$: useQuasar(),
      city,
      v$,
    };
  },
  components: {
    BaseCalendar,
  },
  methods: {
    async signupHandler() {
      const isValid = await this.v$.$validate();
      if (!isValid) {
        this.v$.$touch();
        this.q$.notify({
          type: "negative",
          message: "Корректно заполните все поля",
          timeout: 1000,
          position: "bottom",
        });
        return;
      }
      this.q$.notify({
        type: "positive",
        message: "Вы все заполнили правильно",
        timeout: 1000,
        position: "bottom",
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.main {
  min-height: 100vh;
  padding-top: 50px;
}

.sign-up {
  &__title {
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 25px;
  }

  &__form {
    width: 500px;
    margin: 0 auto;
    min-height: 500px;
    box-shadow: rgba(0, 0, 0, 0.16) 0 1px 4px;
    padding: 20px;
    overflow: hidden;
  }
}

@media screen and (max-width: 600px) {
  .sign-up {
    &__form {
      box-shadow: none;
      width: 100%;
    }
  }
}

.q-field {
  padding-bottom: 0;
}
</style>
