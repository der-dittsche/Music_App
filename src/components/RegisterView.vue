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
          placeholder="lassmi_randa_denn_siewillja@madrid.es"
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
      <div class="auth_card_element">
        <label for="auth_password_confirmed" class="auth_card_label"
          >repeat Password:</label
        >
        <input
          v-model="credentials.password_confirmed"
          type="password"
          name="auth_password_confirmed"
          id="auth_password_confirmed"
          class="auth_card_input"
          placeholder="Repeat password"
        />
      </div>
      <div class="auth_card_element">
        <label for="auth_firstname" class="auth_card_label">Firstname:</label>
        <input
          v-model="credentials.firstname"
          type="text"
          name="auth_firstname"
          id="auth_firstname"
          class="auth_card_input"
          placeholder="Lassmi Randa"
        />
      </div>
      <div class="auth_card_element">
        <label for="auth_lastname" class="auth_card_label">Lastname:</label>
        <input
          v-model="credentials.lastname"
          type="text"
          name="auth_lastname"
          id="auth_lastname"
          class="auth_card_input"
          placeholder="Denn Siewillja"
        />
      </div>
      <div class="auth_card_element">
        <label for="auth_birthday" class="auth_card_label">Birthday:</label>
        <input
          v-model="credentials.birthday"
          type="text"
          name="auth_birthday"
          id="auth_birthday"
          class="auth_card_input"
          placeholder="Your Birthday"
        />
      </div>
      <div class="auth_card_element">
        <label for="auth_country" class="auth_card_label">Country:</label>
        <input
          v-model="credentials.country"
          type="text"
          name="auth_country"
          id="auth_country"
          class="auth_card_input"
          placeholder="Enter a password"
        />
      </div>
      <div class="auth_card_element">
        <label for="auth_city" class="auth_card_label">City:</label>
        <input
          v-model="credentials.city"
          type="text"
          name="auth_city"
          id="auth_city"
          class="auth_card_input"
          placeholder="Where are u from"
        />
      </div>
      <div class="auth_card_element">
        <label for="auth_tos" class="auth_card_label">TOS:</label>
        <input
          v-model="credentials.tos"
          type="text"
          name="auth_tos"
          id="auth_tos"
          class="auth_card_input"
          placeholder="Agree TOS"
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
      password_confirmed: '',
      firstname: '',
      lastname: '',
      birthday: '',
      country: '',
      city: '',
      tos: '',
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
