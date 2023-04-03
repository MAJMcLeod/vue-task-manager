<script>
import NavBar from "../components/NavBar.vue";
import TaskView from "../components/TaskView.vue";

export default{
    name:"HomePage",
    components:{
      NavBar, 
      TaskView
    }
}
</script>

<template>
  <div class="h-full">
    <NavBar/>
    <TaskView/>
  </div>
</template>