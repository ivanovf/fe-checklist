<template>
  <div v-if="$route.name === 'reservation-delete'">
    <h2>¿Esta seguro de eliminar esta reserva?</h2>
    <button
      v-on:click="deleteItem"
      class="bg-red-600 text-white font-bold py-2 px-4 rounded"
    >
      Eliminar
    </button>
    <router-link :to="{ name: 'items' }"> Cancelar </router-link>
  </div>
  <div v-else>
    <h1 class="mt-4 p-2 text-xl font-bold">Reserva</h1>

    <div
      :class="{
        'rounded-lg': true,
        'p-2': true,
        'bg-red-50': errors?.date,
        'border-red-500': errors?.date,
      }"
    >
      <VueDatePicker
        v-model="reservation.date"
        range
        format="Y-m-d"
      ></VueDatePicker>
      <p
        v-if="errors?.date"
        class="mt-2 text-sm text-red-600 dark:text-red-500"
      >
        {{ errors.date.text }}
      </p>
    </div>

    <text-area-field
      inputId="contact"
      name="contact"
      label="Información de Contacto"
      v-model="reservation.contact"
    ></text-area-field>

    <div class="text-left my-4">
      <label for="quantity" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Número de personas
      </label>
      <select
        name="quantity"
        id="quantity"
        v-model="reservation.quantity"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 mb-4 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option
          v-for="i in 8"
          :value="i"
          :key="i"
          :selected="reservation.quantity === i"
        >
          {{ i < 10 ? `0${i}` : i }}
        </option>
      </select>
    </div>

    <CurrencyField
      name="cost"
      label="Pago"
      v-model="reservation.cost"
      inputId="cost"
      :options="{ currency: 'COP', narrowSymbol: true, code: 'co', symbol: '$' }"
    />

    <div
      :class="{
        'rounded-lg': true,
        'p-4': true,
        'mb-4': true,
        'bg-red-50': this.errors?.type,
        'border-red-500': this.errors?.type,
      }"
    >
      <div class="text-left my-4">
        <input
          type="radio"
          name="role"
          id="user-status-1"
          class="mr-2"
          value="airbnb"
          v-model="reservation.type"
        />
        <label for="user-status-1" class="font-bold w-full mr-2">AirBnB</label>
      </div>
      <div class="text-left my-4">
        <input
          type="radio"
          name="role"
          id="user-status-2"
          class="mr-2"
          value="booking"
          v-model="reservation.type"
        />
        <label for="user-status-2" class="font-bold w-full">Booking</label>
      </div>
      <p
        v-if="errors?.type"
        class="mt-2 text-sm text-red-600 dark:text-red-500"
      >
        {{ errors.type.text }}
      </p>
    </div>

    <div>
      ¿Agregar clave?
      <user-number-lock
        :active="true"
        v-model="reservation.userLock"
      ></user-number-lock>
    </div>

    <ul class="grid grid-cols-3 gap-2 mb-4 items-center">
      <li
        class="p-2 rounded-md border text-xs"
        v-for="item in reservation.items"
        v-bind:key="item._id"
      >
        {{ item.label }}
      </li>
    </ul>
    <button
      v-on:click="save"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Guardar
    </button>
    <router-link
      v-if="id"
      :to="{ name: 'reservation-delete', id: reservation.id }"
      class="ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
    >
      Eliminar
    </router-link>
  </div>
</template>
<script>
import TextAreaField from "@/components/fields/TextAreaField";
import VueDatePicker from "@vuepic/vue-datepicker";
import UserNumberLock from "@/components/atoms/UserNumberLock.vue";
import CurrencyField from "@/components/fields/CurrencyField.vue";
import "@vuepic/vue-datepicker/dist/main.css";

export default {
  components: { TextAreaField, CurrencyField, VueDatePicker, UserNumberLock },
  props: ["id"],
  data() {
    return {
      reservation: {
        items: {},
        date: [],
        cost: 0,
      },
      errors: {},
      validations: [
        {
          field: "date",
          rules: [{ required: true }],
        },
        {
          field: "type",
          rules: [
            {
              required: true,
              rewriteMsg: "Debes seleccionar una",
            },
          ],
        },
      ],
    };
  },
  computed: {
    dateRange() {
      return [this.reservation.dateIni, this.reservation.dateEnd];
    },
  },
  methods: {
    async save() {
      this.errors = this.validateForm(this.validations, this.reservation);
      if (Object.keys(this.errors).length > 0) {
        return false;
      }

      this.reservation.dateIni = this.reservation.date[0];
      this.reservation.dateEnd = this.reservation.date[1];
      delete this.reservation.date;

      this.reservation.validated = false;

      if (this.$route.name === "reservation-edit") {
        try {
          const { error } = await this.callEndpoints(
            this.axios,
            "put",
            `/reservations/${this.id}`,
            localStorage.token,
            this.reservation
          );

          if (error) {
            console.log(error);
          } else {
            this.$router.push({ name: "reservations" });
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        const { error } = await this.callEndpoints(
          this.axios,
          "post",
          "/reservations/",
          localStorage.token,
          this.reservation
        );

        if (error) {
          console.log(error);
        } else {
          this.$router.push({ name: "reservations" });
        }
      }
    },
    async deleteItem() {
      const response = await this.callEndpoints(
        this.axios,
        "delete",
        `/reservations/${this.id}`,
        localStorage.token
      );

      if (response?.error) {
        this.message = {
          text: response.error.displayMsg,
          type: response.error.type,
          show: true,
        };
      } else {
        this.message = {
          text:
            response?.data?.deleted === true
              ? "Item eliminado correctamente."
              : "Ocurrio un error",
          type: "success",
          show: true,
        };
      }

      this.$router.push({ name: "reservations" });
    },
  },
  async mounted() {
    if (this.$route.name === "reservation-new") {
      try {
        const response = await this.callEndpoints(
          this.axios,
          "get",
          "/items/all?limit=10&offset=0",
          localStorage.token
        );

        if (response.error) {
          console.log(response);
        } else {
          this.reservation.items = response.data;
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await this.callEndpoints(
          this.axios,
          "get",
          `/reservations/${this.id}`,
          localStorage.token
        );

        if (response.error) {
          console.log(response);
        } else {
          this.reservation = response.data;
          this.reservation.date = [
            this.reservation.dateIni,
            this.reservation.dateEnd,
          ];
        }
      } catch (error) {
        console.log(error);
      }
    }
  },
};
</script>
