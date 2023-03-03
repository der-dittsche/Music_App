<template>
  <div class="song__tabs">
    <div class="play-button" @click.prevent="toggleAudio">
      <i
        class="bx"
        :class="{ 'bx-play-circle': !playing }"
        @click.prevent="isOpenPlayer = true"
      ></i>
      <i
        class="bx"
        :class="{ 'bx-pause': playing }"
        @click.prevent="isOpenPlayer = flase"
      ></i>
    </div>

    <div class="vol-btn" @click.prevent="isOpenVol = !isOpenVol">
      <i class="bx bx-volume-full"></i>
    </div>
    <div
      class="song__title"
      v-if="current_song.modified_name"
      @click.prevent="isOpenPlayer = !isOpenPlayer"
    >
      <span class="song__title-name">{{ current_song.modified_name }}</span>
      uploaded by
      <span class="song__title-artist">{{ current_song.display_name }}</span>
    </div>
  </div>
  <div class="player__controll" :class="hiddenClassPlayer">
    <div class="time-current">{{ seek }}</div>
    <div class="time-bar" @click.prevent="updateSeek">
      <div class="time-bar-line">
        <div
          class="time-bar-line-progress"
          :style="{ width: playerProgress }"
        ></div>
      </div>
    </div>
    <div class="time-duration">{{ duration }}</div>
  </div>
  <div class="vol-controll" :class="hiddenClassVol">
    <div class="time-current"><i class="bx bx-volume-low"></i></div>
    <div class="vol-controll-bar" @click.prevent="updateVolume">
      <div class="vol-controll-bar-line">
        <div
          class="vol-controll-bar-line-progress"
          :style="{ width: volumeWidth }"
        ></div>
      </div>
    </div>
    <div class="time-duration"><i class="bx bx-volume-full"></i></div>
  </div>
</template>
<script>
import { mapActions, mapState, mapWritableState } from "pinia";
import { usePlayerStore } from "@/stores/player";
import useModalStore from "@/stores/modal";

export default {
  computed: {
    ...mapState(useModalStore, ["hiddenClassVol", "hiddenClassPlayer"]),
    ...mapWritableState(useModalStore, ["isOpenVol", "isOpenPlayer"]),
    ...mapState(usePlayerStore, [
      "playing",
      "duration",
      "seek",
      "playerProgress",
      "current_song",
      "volume",
      "volumeWidth",
    ]),
  },
  methods: {
    ...mapActions(usePlayerStore, [
      "toggleAudio",
      "updateSeek",
      "updateVolume",
    ]),
  },
};
</script>
<style>
.play-button {
  cursor: pointer;
}
</style>
