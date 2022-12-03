<template>
  <h1>Manage your Music</h1>
  <div class="container">
    <div class="upload">
      <div class="upload_box">Drop your music here</div>
      <div class="upload_input">
        <label for="upload_music_file"></label>
        <input
          type="file"
          name="upload_music_file"
          id="upload_music_file"
          placeholder="Search"
        /><button type="submit">Submit</button>
      </div>
      <ul>
        <li>Songname 1</li>
        <li>Songname 2</li>
        <li>Songname 3</li>
        <li>Songname 1</li>
      </ul>
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
<script></script>
<style scoped>
.container {
  display: flex;
}

.upload {
  flex: 2;
}
.upload_box {
  width: 250px;
  border: 1px solid black;
  border-radius: 0.5em;
  text-align: center;
  padding-block: 3em;
}
.upload_input {
  padding-block: 1em;
}

.manage_music {
  flex: 3;
}
</style>
