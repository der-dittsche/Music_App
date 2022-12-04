<template>
  <h1>List of Music</h1>
  <div class="container">
    <p>Listen to you music</p>
    <ul>
      <SongItem v-for="song in songs" :key="song.id" :song="song" />
    </ul>
  </div>
</template>
<script>
import { useStoreUser } from '@/stores/storeUser';
import SongItem from '@/components/SongItem.vue';
export default {
  data() {
    return {
      songs: [],
      maxPerPage: 3,
    };
  },
  components: {
    SongItem,
  },
  created() {
    this.getSong();
  },

  methods: {
    async getSong() {
      const storeUser = useStoreUser();
      const snapshot = await storeUser.songs;
      snapshot.forEach(document => {
        this.songs.push({
          docID: document.id,
          name: document.original_name,
        });
      });
    },
  },
};
</script>
