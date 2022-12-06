<template>
  <div>
    <h1>Your choosen Song</h1>
    <PlayerApp />
    <div v-for="detail in filterSong" :key="detail.id">
      <p>{{ detail.modified_name }}</p>
      <button @click.prevent="newSong(detail)">play</button>
      <div class="comments">
        <p class="comments_count">Comment:({{ detail.comment_count }})</p>
        <form
          action="submit"
          class="comments_new"
          @submit.prevent="addComments"
        >
          <label for="comments_new"
            >Write a new comment:<input
              v-model="comment.value"
              type="text"
              name="comments_new"
              id="comments_new"
              class="comments_new_input"
          /></label>

          <button type="submit" class="submit_btn">submit</button>
        </form>
        <div
          class="comments_collection"
          v-for="comment in filterComment"
          :key="comment.id"
        >
          <p>Author</p>
          <p>Timestamp</p>
          <p>
            {{ comment.comment }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStoreUser } from '@/stores/storeUser';
import PlayerApp from '../components/PlayerApp.vue';
import { mapActions } from 'pinia';
import usePlayerStore from '@/stores/player';
import { reactive } from 'vue';
export default {
  data() {
    const storeUser = useStoreUser();
    const comment = reactive({
      value: '',
      songid: this.$route.params.id,
    });
    return {
      storeUser,
      comment,
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
    filterComment() {
      let filterComments = this.storeUser.comments;
      filterComments = filterComments.filter(item => {
        return item.author === this.$route.params.id;
      });
      return filterComments;
    },
  },
  methods: {
    ...mapActions(usePlayerStore, ['newSong']),
    addComments() {
      this.storeUser.addComment(this.comment);
      this.comment.value = '';
    },
  },
};
</script>
<style>
.comments,
.comments_new {
  display: flex;
  width: 100%;
  gap: 1em;
}
.comments {
  flex-direction: column;
}
.comments_new {
  flex-direction: column;
  justify-content: center;
  gap: 1em;
}
.comments_new_input {
  margin-block: 0.5em;
  width: 100%;
}
.submit_btn {
  width: fit-content;
}
.comments_collection {
  width: 100%;
}
</style>
