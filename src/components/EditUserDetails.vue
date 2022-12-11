<template>
  <div class="container">
    <div v-for="detail in storeUser.users" :key="detail.id">
      <vee-form
        action="submit"
        @submit="editInfo"
        :validation-schema="schema_info"
      >
        <div class="info_card_element">
          <label for="info_username" class="info_card_label">Username:</label>
          <vee-field
            name="info_username"
            :bails="false"
            v-slot="{ field, errors }"
          >
            <input
              v-model="credentials.username"
              type="text"
              id="info_username"
              class="info_card_input"
              :placeholder="` ${detail.username} `"
              v-bind="field"
            />
            <div v-for="error in errors" :key="error">{{ error }}</div>
          </vee-field>
        </div>
        <div class="info_card_element">
          <label for="info_email" class="info_card_label">E-Mail:</label>
          <vee-field
            name="info_email"
            :bails="false"
            v-slot="{ field, errors }"
          >
            <input
              v-model="credentials.email"
              type="email"
              id="info_email"
              class="info_card_input"
              :placeholder="` ${detail.email} `"
              v-bind="field"
            />
            <div v-for="error in errors" :key="error">{{ error }}</div>
          </vee-field>
        </div>
        <div class="info_card_element">
          <label for="info_firstname" class="info_card_label">Firstname:</label>
          <vee-field
            name="info_firstname"
            :bails="false"
            v-slot="{ field, errors }"
            ><input
              v-model="credentials.firstname"
              type="text"
              id="info_firstname"
              class="info_card_input"
              :placeholder="` ${detail.firstname} `"
              v-bind="field"
            />
            <div v-for="error in errors" :key="error">{{ error }}</div>
          </vee-field>
        </div>
        <div class="info_card_element">
          <label for="info_lastname" class="info_card_label">Lastname:</label>
          <vee-field
            name="info_lastname"
            :bails="false"
            v-slot="{ field, errors }"
            ><input
              v-model="credentials.lastname"
              type="text"
              id="info_lastname"
              class="info_card_input"
              :placeholder="` ${detail.lastname} `"
              v-bind="field"
            />
            <div v-for="error in errors" :key="error">{{ error }}</div>
          </vee-field>
        </div>
        <div class="info_card_element">
          <label for="info_country" class="info_card_label">Country:</label>
          <vee-field
            name="info_country"
            :bails="false"
            v-slot="{ field, errors }"
            ><select
              v-model="credentials.country"
              id="info_country"
              class="info_card_input"
              v-bind="field"
            >
              <option value="Deutschland" selected>Deutschland</option>
              <option value="Östereich">Östereich</option>
              <option value="Schweiz">Schweiz</option>
            </select>

            <div v-for="error in errors" :key="error">{{ error }}</div>
          </vee-field>
        </div>
        <div class="info_card_element">
          <label for="info_city" class="info_card_label">City:</label>
          <vee-field name="info_city" :bails="false" v-slot="{ field, errors }"
            ><input
              v-model="credentials.city"
              type="text"
              id="info_city"
              class="info_card_input"
              :placeholder="` ${detail.city} `"
              v-bind="field"
            />
            <div v-for="error in errors" :key="error">{{ error }}</div>
          </vee-field>
        </div>
        <button type="submit">Submit</button>
      </vee-form>
    </div>
  </div>
</template>

<script>
import { useStoreUser } from '@/stores/storeUser';
import { useRoute, useRouter } from 'vue-router';
import { ref, reactive } from 'vue';

export default {
  data() {
    const storeUser = useStoreUser();
    const route = useRoute();
    const router = useRouter();
    const uid = ref('');
    const credentials = reactive({
      email: '',
      firstname: '',
      lastname: '',
      username: '',
      country: '',
      city: '',
    });
    return {
      storeUser,
      route,
      router,
      uid,
      credentials,
      schema_info: {
        info_username: 'required|min:5|max:100',
        info_email: 'required|min:3|max:100|email',
        info_firstname: 'required|min:3|max:100|alphaSpaces',
        info_lastname: 'required|min:3|max:100|alphaSpaces',
        info_country: 'required',
        info_city: 'required',
      },
    };
  },
  methods: {
    editInfo() {
      let info = {
        id: this.route.params.id,
        email: this.credentials.email,
        firstname: this.credentials.firstname,
        lastname: this.credentials.lastname,
        username: this.credentials.username,
        country: this.credentials.country,
        city: this.credentials.city,
      };
      this.storeUser.updateUser(info);
      this.router.push('/user');
    },
  },
};
</script>

<style>
.edit_button {
  cursor: pointer;
  background-color: cornflowerblue;
  text-align: center;
  width: 10em;
  margin-block: 0.5em;
  padding-block: 0.5em;
  border-radius: 0.5em;
}
</style>
