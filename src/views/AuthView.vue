<template>
  <div class="container">
    <div class="auth_tab">
      <div
        class="auth_tab_item"
        :class="{ is_active: !register }"
        @click.prevent="register = false"
      >
        Login
      </div>
      <div
        class="auth_tab_item"
        :class="{ is_active: register }"
        @click.prevent="register = true"
      >
        Registration
      </div>
    </div>
    <div class="auth">
      <form action="submit" class="auth_card_auth" @submit.prevent="onSubmit">
        <div class="auth_title">
          <h1>{{ formTitle }}</h1>
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
        <button type="submit">{{ formTitle }}</button>
      </form>
    </div>
  </div>
</template>
<script>
import { ref, computed, reactive } from 'vue';
import { useStoreUser } from '@/stores/storeUser';

export default {
  data() {
    const register = ref(false);
    const formTitle = computed(() => {
      return register.value ? 'Register' : 'Login';
    });
    const credentials = reactive({
      email: '',
      password: '',
    });
    const storeUser = useStoreUser();

    return {
      register,
      formTitle,
      credentials,
      storeUser,
    };
  },
  props: {
    callMe: {
      type: Function,
    },
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
<style>
.auth {
  padding-block: 1em;
}
.auth_tab {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 2em;
}
.auth_tab_item {
  cursor: pointer;
  background-color: cornflowerblue;
  text-align: center;
  width: 10em;
  padding-block: 0.5em;
  border-radius: 0.5em;
}
.auth_tab_item:hover {
  background-color: rgb(157, 185, 236);
}
.is_active {
  background-color: rgb(157, 185, 236);
}
.auth_card_auth {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.auth_card_element {
  width: 60%;
  display: flex;
  justify-content: center;
}

.auth_card_label {
  flex: 1;
}

.auth_card_input {
  flex: 5;
  margin-bottom: 1em;
}
</style>
