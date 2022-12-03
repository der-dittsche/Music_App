<template>
  <div class="container">
    <div v-for="detail in storeUser.users" :key="detail.id">
      <textarea
        v-model="editEmail"
        :placeholder="` ${detail.email} `"
      ></textarea>
      <button @click="editMail" :disabled="!editEmail">
        Add your new E-Mail here
      </button>
    </div>
  </div>
</template>

<script>
import { useStoreUser } from '@/stores/storeUser';
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';

export default {
  data() {
    const storeUser = useStoreUser();
    const route = useRoute();
    const router = useRouter();
    const editEmail = ref('');
    const uid = ref('');
    return {
      storeUser,
      route,
      router,
      editEmail,
      uid,
    };
  },
  methods: {
    editMail() {
      let info = {
        id: this.route.params.id,
        email: this.editEmail,
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
