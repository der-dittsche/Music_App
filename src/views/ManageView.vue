<template>
  <h1>Manage your Music</h1>
  <div class="container">
    <div class="upload">
      <UploadFiles />
    </div>
    <div class="manage_music">
      <ul>
        <li>Songname 1 <button>edit</button><button>delete</button></li>
        <li>Songname 2 <button>edit</button><button>delete</button></li>
        <li>Songname 3 <button>edit</button><button>delete</button></li>
        <li>Songname 4 <button>edit</button><button>delete</button></li>
      </ul>
    </div>
  </div>
</template>
<script>
import UploadFiles from '../components/uploadFiles.vue';
export default {
  data() {
    return;
  },
  components: {
    UploadFiles,
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
