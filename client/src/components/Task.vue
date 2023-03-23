<script>
export default {
  data() {
    return {
      isEdit: false,
      isHidden: false,
      updatedTask: {task:this.task.task, endDate:this.task.endDate.slice(0, 10), status:this.task.status}
    };
  },
  props: ["task", "deleteTask", "taskId", "updateTask"],
  methods: {},
  name: "Task",
};
</script>

<template>
  <div v-if="!isHidden">
    <div
      v-if="isEdit === true"
      class="w-full grid grid-cols-5 py-2 mx-2 border-t bg-white px-4 mt-2 rounded-md"
    >
      <div class="col-span-2 flex items-center">
        <input v-model="updatedTask.task" type="text" class="bg-sky-50 rounded-md" />
      </div>
      <div class="flex items-center">
        <input v-model="updatedTask.endDate" type="date" class="bg-sky-50 rounded-md"/>
      </div>
      <div>
        <select v-model="updatedTask.status" name="" id="" class="bg-sky-50 rounded-md">
          <option value="0">Pending</option>
          <option value="1">In Progress</option>
          <option value="2">Complete</option>
        </select>
      </div>
      <div class="flex items-center">
        <button>
          <span @click="updateTask(this.task.id, updatedTask)" class="material-icons mr-2"> done </span></button
        ><button @click="isEdit = false">
          <span class="material-icons"> close </span>
        </button>
      </div>
    </div>

    <div
      v-else
      class="w-full grid grid-cols-5 py-2 mx-2 border-t bg-white px-4 mt-2 rounded-md"
    >
      <div class="col-span-2">{{ this.task.task }}</div>
      <div>{{ this.task.endDate.slice(0, 10) }}</div>
      <div v-if="this.task.status === 0">
        <button class="rounded-md btn">Pending</button>
      </div>
      <div v-else-if="this.task.status === 1">In Progress</div>
      <div v-else>Complete</div>
      <div class="flex items-center">
        <div class="flex items-center">
          <button
            @click="deleteTask(this.task.id), isHidden == true"
            class="flex items-center hover:bg-rose-600 hover:text-white p-1 mr-1 rounded-md"
          >
            <span class="material-icons"> delete </span></button
          ><button class="flex items-center hover:bg-gray-200 p-1 rounded-md">
            <span @click="isEdit = true" class="material-icons"> edit </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
