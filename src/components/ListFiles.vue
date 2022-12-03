<template>
  <div v-show="!showForm" class="input_form">
    {{ song.original_name }}
    <button @click.prevent="showForm = !showForm">edit</button
    ><button>delete</button>
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
export default {
  data() {
    return {
      showForm: false,
    };
  },
  props: {
    song: {
      type: Object,
      required: true,
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
