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
    <LogInView v-if="!register" /><RegisterView v-if="register" />
  </div>
</template>
<script>
import { ref, computed } from 'vue';
import LogInView from '../components/LogInView.vue';
import RegisterView from '../components/RegisterView.vue';

export default {
  data() {
    const register = ref(false);
    const formTitle = computed(() => {
      return register.value ? 'Register' : 'Login';
    });

    return {
      register,
      formTitle,
    };
  },
  props: {
    callMe: {
      type: Function,
    },
  },
  components: {
    LogInView,
    RegisterView,
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
