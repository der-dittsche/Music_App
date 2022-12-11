<template>
  <div>
    <vee-form
      action="submit"
      class="auth_card_auth"
      @submit="onSubmit"
      :validation-schema="schema_login"
    >
      <div class="auth_title">
        <h1>Login</h1>
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
          name="auth_password"
          :bails="false"
          v-slot="{ field, errors }"
          ><input
            v-model="credentials.password"
            type="password"
            id="auth_password"
            class="auth_card_input"
            placeholder="Enter a password"
            v-bind="field"
          />
          <div v-for="error in errors" :key="error">{{ error }}</div>
        </vee-field>
      </div>
      <button type="submit">Login</button>
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
      password: '',
    });
    const storeUser = useStoreUser();

    return {
      credentials,
      storeUser,
      schema_login: {
        auth_email: 'required|min:3|max:100|email',
        auth_password: 'required|min:8|max:100|excluded:password',
      },
    };
  },
  methods: {
    onSubmit() {
      if (!this.credentials.email || !this.credentials.password) {
        console.log('wrong entry');
      } else {
        if (this.register) {
          this.storeUser.registerUser(this.credentials);
        } else {
          this.storeUser.loginUser(this.credentials);
        }
      }
    },
  },
};
</script>

<style></style>
