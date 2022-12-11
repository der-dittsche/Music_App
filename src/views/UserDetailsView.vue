<template>
  <h1>This is an about page</h1>
  <div class="container">
    <div class="details" v-for="details in storeUser.users" :key="details.id">
      <div class="userdetails">
        <div class="userdetails_topic">
          <ul>
            <li>E-Mail:</li>
            <li>Firstname:</li>
            <li>Lastname:</li>
            <li>Birthday:</li>
            <li>Country:</li>
            <li>City:</li>
            <li>Username:</li>
          </ul>
        </div>
        <div class="userdetails_info">
          <ul>
            <li>{{ details.email }}</li>
            <li>{{ details.firstname }}</li>
            <li>{{ details.lastname }}</li>
            <li>{{ details.birthday }}</li>
            <li>{{ details.country }}</li>
            <li>{{ details.city }}</li>
            <li>{{ details.username }}</li>
          </ul>
        </div>
      </div>
      <div class="userdetails_change">
        <RouterLink :to="`/edituserdetails/${details.id}`"
          ><div>change</div></RouterLink
        >
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
li {
  list-style: none;
}
.userdetails {
  width: 100%;
  display: flex;
}

.userdetails_topic {
  flex: 1;
}
.userdetails_info {
  flex: 4;
}

.userdetails_change {
  display: flex;
  width: 100%;
  justify-content: center;
  cursor: pointer;
  padding-block: 1rem;
}
</style>
