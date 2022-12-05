<template>
  <div>
    <h1>Your choosen Song</h1>
    <div v-for="detail in filterSong" :key="detail.id">
      <p>{{ detail.modified_name }}</p>
    </div>
  </div>
</template>

<script>
import { useStoreUser } from '@/stores/storeUser';
export default {
  data() {
    const storeUser = useStoreUser();
    return {
      storeUser,
    };
  },
  computed: {
    filterSong() {
      let filterSongs = this.storeUser.songs;
      filterSongs = filterSongs.filter(item => {
        return item.id === this.$route.params.id;
      });
      return filterSongs;
    },
  },
};
</script>
