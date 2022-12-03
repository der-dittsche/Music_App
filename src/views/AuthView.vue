<template>
  <h1>Hallo Auth</h1>
  <div class="container">
    <div class="auth_tab">
      <p class="auth_tab_item">Login</p>
      <p class="auth_tab_item">Registration</p>
    </div>
    <div class="auth">
      <form action="submit" class="auth_card_auth">
        <div class="auth_card_element">
          <label for="auth_email" class="auth_card_label">E-Mail:</label>
          <input
            type="email"
            name="auth_email"
            id="auth_email"
            class="auth_card_input"
          />
        </div>
        <div class="auth_card_element">
          <label for="auth_password" class="auth_card_label">Password:</label>
          <input
            type="password"
            name="auth_password"
            id="auth_password"
            class="auth_card_input"
          />
        </div>
        <button>Login</button>
      </form>
    </div>
    <div class="auth">
      <form action="submit" class="auth_card_auth">
        <div class="auth_card_element">
          <label for="auth_email" class="auth_card_label">E-Mail:</label>
          <input
            type="email"
            name="auth_email"
            id="auth_email"
            class="auth_card_input"
          />
        </div>
        <div class="auth_card_element">
          <label for="auth_password" class="auth_card_label">Password:</label>
          <input
            type="password"
            name="auth_password"
            id="auth_password"
            class="auth_card_input"
          />
        </div>
        <button type="submit" @click="CallMe">Registration</button>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    callMe: {
      type: Function,
    },
  },
  methods: {
    submit() {
      this.callMe('yes');
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
  background-color: cornflowerblue;
  text-align: center;
  width: 10em;
  padding-block: 0.5em;
  border-radius: 0.5em;
}
.auth_tab_item:hover {
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
