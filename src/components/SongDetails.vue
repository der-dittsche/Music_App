<template>
  <div>
    <h1>Your choosen Song</h1>
    <PlayerApp />
    <div v-for="detail in filterSong" :key="detail.id">
      <p>{{ detail.modified_name }}</p>
      <button @click.prevent="newSong(detail)">play</button>
    </div>
  </div>
</template>

<script>
import { useStoreUser } from '@/stores/storeUser';
import PlayerApp from '../components/PlayerApp.vue';
import { mapActions } from 'pinia';
import usePlayerStore from '@/stores/player';
export default {
  data() {
    const storeUser = useStoreUser();
    return {
      storeUser,
    };
  },
  components: {
    PlayerApp,
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
  methods: {
    ...mapActions(usePlayerStore, ['newSong']),
  },
};
</script>
