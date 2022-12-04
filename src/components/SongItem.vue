<template>
  <div>
    <li>
      <div>
        <RouterLink :to="{ name: 'song', params: { id: song.docID } }">{{
          song.name
        }}</RouterLink
        ><button @click.prevent="newSong(song)">play</button>
      </div>
    </li>
  </div>
</template>
<script>
import { mapActions } from 'pinia';
import usePlayerStore from '@/stores/player';
export default {
  props: ['song'],

  methods: {
    ...mapActions(usePlayerStore, ['newSong']),
  },
};
</script>
