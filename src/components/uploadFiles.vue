<template>
  <div
    class="upload_box"
    :class="{ is_active: is_dragover }"
    @drag.prevent.stop=""
    @dragstart.prevent.stop=""
    @dragend.prevent.stop="is_dragover = false"
    @dragover.prevent.stop="is_dragover = true"
    @dragemter.prevent.stop="is_dragover = true"
    @dragleave.prevent.stop="is_dragover = false"
    @drop.prevent.stop="upload($event)"
  >
    <div>Drop your music here</div>
  </div>
  <div class="upload_input">
    <label for="upload_music_file"></label>
    <input
      type="file"
      name="upload_music_file"
      multiple
      @change="upload($event)"
    />
  </div>
  <ul v-for="upload in uploads" :key="upload.name">
    <li>
      <div>{{ upload.name }}</div>
      <div class="progressbar">
        <div
          class="progress"
          :style="{ width: upload.current_progress + '%' }"
        ></div>
      </div>
    </li>
  </ul>
</template>

<script>
import { storage } from '@/stores/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useStoreUser } from '@/stores/storeUser';
export default {
  setup() {
    return {};
  },
  data() {
    const storeUser = useStoreUser();
    return {
      is_dragover: false,
      uploads: [],
      song: [],
      storeUser,
    };
  },
  methods: {
    upload($event) {
      this.is_dragover = false;
      const files = $event.dataTransfer
        ? [...$event.dataTransfer.files]
        : [...$event.target.files];
      files.forEach(file => {
        if (file.type !== 'audio/mpeg') {
          return;
        }
        const storageRef = ref(storage);
        const songsRef = ref(storageRef, `songs/${file.name}`);
        const task = uploadBytesResumable(songsRef, file);
        const uploadIndex =
          this.uploads.push({
            task,
            current_progress: 0,
            name: file.name,
          }) - 1;
        task.on(
          'state_changed',
          snapshot => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            this.uploads[uploadIndex].current_progress = progress;
          },
          error => {
            console.log(error);
          },
          async () => {
            const song = {
              uid: this.storeUser.user.id,
              display_name: this.storeUser.user.email,
              original_name: task.snapshot.ref.name,
              modified_name: task.snapshot.ref.name,
              genre: '',
              comment_count: 0,
            };
            song.url = await getDownloadURL(task.snapshot.ref);
            const storeUser = useStoreUser();
            storeUser.addSong(song);
          },
        );
      });
    },
  },
  beforeUnmount() {
    this.uploads.forEach(upload => {
      upload.task.cancel();
    });
  },
};
</script>

<style>
.upload_box {
  width: 250px;
  border: 1px solid black;
  border-radius: 0.5em;
  text-align: center;
  padding-block: 3em;
}
.is_active {
  background-color: cornflowerblue;
}
.upload_input {
  padding-block: 1em;
}
.progressbar {
  width: 100%;
  height: 1em;
  border: 1px solid red;
}
.progress {
  background-color: cornflowerblue;
  height: 100%;
}
</style>
