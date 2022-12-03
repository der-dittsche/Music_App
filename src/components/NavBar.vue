<template>
  <nav>
    <div class="navbar">
      <RouterLink to="/" class="nav_item">Home</RouterLink>
      <RouterLink to="/manage" class="nav_item">Manage</RouterLink>
      <RouterLink to="/user" class="nav_item">User</RouterLink>
      <RouterLink to="/auth" class="nav_item">Auth</RouterLink>
    </div>
  </nav>
</template>
<style>
.navbar {
  display: flex;
  flex-direction: row;
  width: 100vw;
  justify-content: space-around;
}
.nav_item {
  all: unset;
  cursor: pointer;
  background-color: cornflowerblue;
  width: 100%;
  font-size: 1.25em;
  text-align: center;
  padding-block: 1.25em;
}
.nav_item:hover {
  background-color: rgb(157, 185, 236);
}
</style>
