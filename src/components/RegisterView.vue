<template>
  <div>
    <form action="submit" class="auth_card_auth" @submit.prevent="onSubmit">
      <div class="auth_title">
        <h1>Register</h1>
      </div>
      <div class="auth_card_element">
        <label for="auth_email" class="auth_card_label">E-Mail:</label>
        <input
          v-model="credentials.email"
          type="email"
          name="auth_email"
          id="auth_email"
          class="auth_card_input"
          placeholder="lassmi_randa_den_siewillja@madrid.es"
        />
      </div>
      <div class="auth_card_element">
        <label for="auth_password" class="auth_card_label">Password:</label>
        <input
          v-model="credentials.password"
          type="password"
          name="auth_password"
          id="auth_password"
          class="auth_card_input"
          placeholder="Enter a password"
        />
      </div>
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import { reactive } from 'vue';
import { useStoreUser } from '@/stores/storeUser';
export default {
  data() {
    const credentials = reactive({
      email: '',
      password: '',
    });
    const storeUser = useStoreUser();

    return {
      credentials,
      storeUser,
    };
  },
  methods: {
    onSubmit() {
      if (!this.credentials.email || !this.credentials.password) {
        console.log('wrong entry');
      } else {
        this.storeUser.registerUser(this.credentials);
      }
    },
  },
};
</script>

<style></style>
