<template>
  <main>
    <p v-if="!reservations">
      No hay reservas pendientes por revisar
    </p>
    <p v-else>
      Reservas pendientes por revisar
    </p>
    <h1 v-for="r in reservations" v-bind:key="r._id">
      {{ dateFormat(r.date) }}
      <div class="action">
        <button>Validar Reserva</button>
      </div>
    </h1>
  </main>
</template>

<script>

export default {
  name: 'HomeView',
  components: {
    
  },
  data() {
    return {
      reservations: [],
    }
  },
  methods: {
    dateFormat(dateFormat) {
      const date = new Date(dateFormat);
      const month = new Intl.DateTimeFormat('es-ES', { month: 'long'}).format(date);
      const lastPart = month.slice(1);
      return `${date.getDay()} de ${month.charAt(0).toUpperCase() + lastPart }`;
    }
  },
  mounted() {
    this.axios.get(
      `${process.env.VUE_APP_BE_HOST}/reservations/all?limit=10&offset=0`,
      { headers: {'Authorization': `Bearer ${ localStorage.token }`} }
    )
    .then(response => {
      this.reservations = response.data;
    })
    .catch(error => {
      console.log(error);
      if (error.response.status === 401) {
        this.error = true;
      }
    });
  }
}
</script>
<style scoped>
main {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
}

h1,
p {
  margin: 0;
  text-align: center;
}

h1 {
  margin-top: 14px;
  color: var(--brand-green);
}
button {
  color: white;
  font-size: 1.25rem;
  background-color: deeppink;
  border: none;
  width: 100%;
  padding: 24px 60px;
  border-radius: 60px;
  box-sizing: border-box;
}
</style>
