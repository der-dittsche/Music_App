<template>
  <div>
    <li>{{ song.name }}<button>play</button></li>
  </div>
</template>
<script>
export default {
  props: ['song'],
};
</script>
