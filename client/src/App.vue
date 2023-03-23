<script setup>
import NavBar from "./components/NavBar.vue";
import TaskView from "./components/TaskView.vue";
</script>

<template>
  <div class="grid grid-cols-6 h-[100vh]">
    <NavBar class="col-span-1" />
    <TaskView class="col-span-5" />
  </div>
</template>
