<template>
  <main>
    <p v-if="!reservations">
      No hay reservas pendientes por revisar
    </p>
    <p v-else>
      Reservas pendientes por revisar
    </p>
    <h1 v-for="r in reservations" v-bind:key="r._id">
      {{ dateFormat(r.dateEnd) }}
      <div class="action">
        <router-link :to="{ name: 'validate-checklist', params: {id: r._id } }" class="button">Validar Reserva</router-link>
      </div>
    </h1>
  </main>
</template>

<script>

export default {
  name: 'HomeView',
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
      return `${date.getDate()} de ${month.charAt(0).toUpperCase() + lastPart }`;
    }
  },
  async mounted() {
    const response = await this.callEndpoints(this.axios, 'get', '/reservations/all?sort=asc&old=true', localStorage.token);
    if (response?.error?.status === 401) {
      this.$router.push({ name: 'home' });
    }
    else {
      this.reservations = response.data;
    }
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
.button {
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
