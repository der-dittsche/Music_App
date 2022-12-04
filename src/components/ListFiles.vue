<template>
  <div v-show="!showForm" class="input_form">
    {{ song.original_name }}
    <button @click.prevent="showForm = !showForm">edit</button
    ><button @click.prevent="deleteSong">delete</button>
  </div>
  <div v-show="showForm" class="input_form">
    <form action="">
      <label for="song_title"></label>
      <input
        type="text"
        name="song_title"
        id="song_title"
        :placeholder="`${song.original_name}`"
      />
      <button @click.prevent="showForm = !showForm">cancel</button>
    </form>
  </div>
</template>

<script>
import { storage } from '@/stores/firebase';
import { useStoreUser } from '@/stores/storeUser';
import { ref, deleteObject } from 'firebase/storage';
export default {
  data() {
    const storeUser = useStoreUser();
    return {
      showForm: false,
      storeUser,
    };
  },
  props: {
    song: {
      type: Object,
      required: true,
    },
  },
  methods: {
    deleteSong() {
      const songtodelete = this.song.id;
      this.storeUser.deleteSongs(songtodelete);
      const storageRef = ref(storage);
      const songsRef = ref(storageRef, `songs/${this.song.original_name}`);
      deleteObject(songsRef)
        .then(() => {})
        .catch(error => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
.input_form {
  border: 1px solid black;
  height: 100px;
  width: 100%;
}
</style>
