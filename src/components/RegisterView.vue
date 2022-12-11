<template>
  <div>
    <vee-form
      class="auth_card_auth"
      :validation-schema="schema"
      @submit="onSubmit"
    >
      <div class="auth_title">
        <h1>Register</h1>
      </div>
      <div class="auth_card_element">
        <label for="auth_email" class="auth_card_label">E-Mail:</label>
        <vee-field name="auth_email" :bails="false" v-slot="{ field, errors }">
          <input
            v-model="credentials.email"
            type="email"
            id="auth_email"
            class="auth_card_input"
            placeholder="lassmi_randa_denn_siewillja@madrid.es"
            v-bind="field"
          />
          <div v-for="error in errors" :key="error">{{ error }}</div>
        </vee-field>
      </div>
      <div class="auth_card_element">
        <label for="auth_password" class="auth_card_label">Password:</label>
        <vee-field
          v-model="credentials.password"
          type="password"
          name="auth_password"
          id="auth_password"
          class="auth_card_input"
          placeholder="Enter a password"
        /><ErrorMessage name="auth_password" />
      </div>
      <div class="auth_card_element">
        <label for="auth_password_confirmed" class="auth_card_label"
          >repeat Password:</label
        >
        <vee-field
          v-model="credentials.password_confirmed"
          type="password"
          name="auth_password_confirmed"
          id="auth_password_confirmed"
          class="auth_card_input"
          placeholder="Repeat password"
        /><ErrorMessage name="auth_password_confirmed" />
      </div>
      <div class="auth_card_element">
        <label for="auth_firstname" class="auth_card_label">Firstname:</label>
        <vee-field
          v-model="credentials.firstname"
          type="text"
          name="auth_firstname"
          id="auth_firstname"
          class="auth_card_input"
          placeholder="Lassmi Randa"
        /><ErrorMessage name="auth_firstname" />
      </div>
      <div class="auth_card_element">
        <label for="auth_lastname" class="auth_card_label">Lastname:</label>
        <vee-field
          v-model="credentials.lastname"
          type="text"
          name="auth_lastname"
          id="auth_lastname"
          class="auth_card_input"
          placeholder="Denn Siewillja"
        /><ErrorMessage name="auth_lastname" />
      </div>
      <div class="auth_card_element">
        <label for="auth_birthday" class="auth_card_label">Birthday:</label>
        <vee-field
          v-model="credentials.birthday"
          type="date"
          name="auth_birthday"
          id="auth_birthday"
          class="auth_card_input"
        /><ErrorMessage name="auth_birthday" />
      </div>
      <div class="auth_card_element">
        <label for="auth_country" class="auth_card_label">Country:</label>
        <vee-field
          v-model="credentials.country"
          as="select"
          name="auth_country"
          id="auth_country"
          class="auth_card_input"
        >
          <option value="Deutschland">Deutschland</option>
          <option value="Östereich">Östereich</option>
          <option value="Schweiz">Schweiz</option></vee-field
        >
        <ErrorMessage name="auth_country" />
      </div>
      <div class="auth_card_element">
        <label for="auth_city" class="auth_card_label">City:</label>
        <vee-field
          v-model="credentials.city"
          type="text"
          name="auth_city"
          id="auth_city"
          class="auth_card_input"
          placeholder="Where are u from"
        /><ErrorMessage name="auth_city" />
      </div>
      <div class="auth_card_element">
        <label for="auth_tos" class="auth_card_label">TOS:</label>
        <vee-field
          v-model="credentials.tos"
          type="checkbox"
          name="auth_tos"
          id="auth_tos"
          class="auth_card_input"
          value="true"
        /><ErrorMessage name="auth_tos" />
      </div>
      <button type="submit">Register</button>
    </vee-form>
  </div>
</template>

<script>
import { reactive } from 'vue';
import { useStoreUser } from '@/stores/storeUser';
export default {
  data() {
    const credentials = reactive({
      email: '',
      password_confirmed: '',
      firstname: '',
      lastname: '',
      birthday: '',
      country: '',
      city: '',
      tos: false,
    });
    const storeUser = useStoreUser();

    return {
      credentials,
      storeUser,
      schema: {
        auth_email: 'required|min:3|max:100|email',
        auth_password: 'required|min:8|max:100|excluded:password',
        auth_password_confirmed: 'pw_missmatch:@auth_password',
        auth_firstname: 'required|min:3|max:100|alphaSpaces',
        auth_lastname: 'required|min:3|max:100|alphaSpaces',
        auth_birthday: 'required',
        auth_country: 'required',
        auth_city: 'required',
        auth_tos: 'tos',
      },
    };
  },
  methods: {
    onSubmit() {
      this.storeUser.registerUser(this.credentials);
    },
  },
};
</script>

<style></style>
