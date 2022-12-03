<template>
  <h1>Manage your Music</h1>
  <div class="container">
    <div class="upload">
      <UploadFiles ref="upload" />
    </div>
    <div class="manage_music">
      <ListFiles v-for="song in storeUser.songs" :key="song.id" :song="song" />
    </div>
  </div>
</template>
<script>
import UploadFiles from '../components/uploadFiles.vue';
import ListFiles from '../components/ListFiles.vue';
import { useStoreUser } from '@/stores/storeUser';
export default {
  data() {
    const storeUser = useStoreUser();
    return {
      storeUser,
    };
  },
  components: {
    UploadFiles,
    ListFiles,
  },
  beforeRouteLeave(to, from, next) {
    this.$refs.upload.cancelUploads();
    next();
  },
};
</script>
<style scoped>
.container {
  display: flex;
}

.upload {
  flex: 2;
}

.manage_music {
  flex: 3;
}
</style>
