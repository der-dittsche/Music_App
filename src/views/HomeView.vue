<template>
  <h1>List of Music</h1>
  <div class="container">
    <p>Listen to you music</p>
    <ul>
      <SongItem v-for="song in songs" :key="song.docID" :song="song" />
    </ul>
  </div>
</template>
<script>
import { useStoreUser } from '@/stores/storeUser';
import SongItem from '@/components/SongItem.vue';
export default {
  data() {
    const storeUser = useStoreUser();
    return {
      storeUser,
      songs: [],
    };
  },
  components: {
    SongItem,
  },
  created() {
    this.getSong();
  },

  methods: {
    getSong() {
      const storeUser = useStoreUser();
      const snapshot = storeUser.songs;
      snapshot.forEach(document => {
        this.songs.push({
          docID: document.id,
          name: document.original_name,
          url: document.url,
          modified_name: document.modified_name,
          comment_count: document.comment_count,
        });
      });
    },
  },
};
</script>
