<template>
  <h1>This is an about page</h1>
  <div class="container">
    <div
      class="userdetails"
      v-for="details in storeUser.users"
      :key="details.id"
    >
      <div class="userdetails_topic">E-Mail:</div>
      <div class="userdetails_info">{{ details.email }}</div>
      <div class="userdetails_change">
        <RouterLink :to="`/edituserdetails/${details.id}`">change</RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
import { useStoreUser } from '@/stores/storeUser';

export default {
  data() {
    const storeUser = useStoreUser();

    return {
      storeUser,
    };
  },
  methods: {},
};
</script>

<style>
.userdetails {
  width: 100%;
  display: flex;
}
.userdetails_change,
.userdetails_topic {
  flex: 1;
}
.userdetails_info {
  flex: 2;
}
</style>
