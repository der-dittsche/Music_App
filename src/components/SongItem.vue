<template>
  <div>
    <li>
      <div class="list_item">
        <div class="song_name">
          <RouterLink :to="{ name: 'song', params: { id: song.docID } }">{{
            song.modified_name
          }}</RouterLink>
        </div>
        <span>{{ song.comment_count }} Comments</span>
      </div>
    </li>
  </div>
</template>
<script>
export default {
  props: ['song'],
};
</script>
<style>
.list_item {
  display: flex;
  width: 100%;
  gap: 1em;
}
.song_name {
  flex: 7;
}
button {
  flex: 1;
}
span {
  flex: 1;
}
</style>
