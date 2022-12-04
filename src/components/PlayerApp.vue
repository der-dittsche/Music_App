<template>
  <div class="container">
    <div class="song_title" v-if="current_song.modified_name">
      {{ current_song.modified_name }}
    </div>
    <div class="player_bar">
      <div
        class="play_btn"
        @click.prevent="toggleAudio"
        :class="{ play_btn_start: !playing, play_btn_stop: playing }"
      >
        Play
      </div>
      <div class="play_time">{{ seek }}</div>
      <div class="play_progress" @click.prevent="updateSeek">
        <div
          class="play_progress_status"
          :style="{ width: playerProgress }"
        ></div>
      </div>
      <div class="play_time_complete">{{ duration }}</div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import usePlayerStore from '@/stores/player';

export default {
  setup() {
    return {};
  },
  methods: {
    ...mapActions(usePlayerStore, ['toggleAudio', 'updateSeek']),
  },
  computed: {
    ...mapState(usePlayerStore, [
      'playing',
      'duration',
      'seek',
      'playerProgress',
      'current_song',
    ]),
  },
};
</script>

<style>
.player_bar {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 90%;
  background-color: white;
  border-radius: 0.5em;
  overflow: hidden;
}
.play_btn {
  padding: 1em;
  cursor: pointer;
  background-color: cornflowerblue;
}
.play_btn_start {
  font-weight: 800;
  color: darkgreen;
}
.play_btn_stop {
  font-weight: 800;
  color: darkred;
}
.play_time {
  padding: 1em;
}
.play_progress {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 2em;
  border: 1px solid cornflowerblue;
  border-radius: 0.5em;
  overflow: hidden;
}
.play_progress_status {
  height: 60%;
  padding: 0.2em;
  background-color: rgb(167, 192, 238);
}
.play_time_complete {
  padding: 1em;
}
</style>
