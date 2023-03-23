<script>
import axios from "axios";
import Task from "./Task.vue";

export default {
  data() {
    return {
      tasks: null,
      isCreate: false,
      newTask: { task: "", endDate: "", status: 0 },
      editTask: { task: "", endDate: "", status: 0 },
    };
  },
  methods: {
    async getTask() {
      try {
        const { data } = await axios.get("http://localhost:3000/tasks");
        this.tasks = data;
      } catch (error) {
        console.error(error);
      }
    },
    async createTask() {
      try {
        await axios.post("http://localhost:3000/tasks", {
          task: `${this.newTask.task}`,
          endDate: `${this.newTask.endDate}`,
          status: this.newTask.status,
        });
        this.getTask();
        this.isCreate = false;
        this.newTask = { task: "", endDate: "", status: 0 };
      } catch (error) {
        console.log(error);
      }
    },
    async deleteTask(id) {
      try {
        await axios.delete(`http://localhost:3000/tasks/${id}`);
        this.getTask();
      } catch (error) {
        console.log(error);
      }
    },
    async updateTask(id, updtTask) {
       try {
         await axios.put(`http://localhost:3000/tasks/${id}`, {
           task: updtTask.task,
           endDate: updtTask.endDate,
           status: updtTask.status,
         });
         this.getTask();
       } catch (error) {
         console.log(error);
       }
    },
  },
  mounted() {
    this.getTask();
  },
  name: "TaskView",
  components: {
    Task,
  },
};
</script>

<template>
  <div id="taskContainer">
    <div class="w-full px-6 border-b">
      <div class="w-full grid grid-cols-5 py-2 mx-2">
        <div class="col-span-2">Task</div>
        <div>End Date</div>
        <div>Status</div>
      </div>
    </div>
    <div class="px-6 py-4 bg-sky-50 h-full">
      <div class="w-full">
        <div class="w-full flex py-2 mx-2 items-center">
          <button
            @click="isCreate = true"
            class="flex bg-emerald-500 items-center p-2 rounded-md hover:bg-emerald-600 active:bg-emerald-700 text-white"
          >
            <span class="material-icons"> add </span>Add New Task
          </button>
        </div>
      </div>
      <div
        v-if="isCreate === true"
        class="w-full grid grid-cols-5 py-2 mx-2 border-t bg-white px-4 mt-2 rounded-md"
      >
        <div class="col-span-2 flex items-center">
          <input
            type="text"
            v-model="newTask.task"
            class="bg-sky-50 rounded-md"
          />
        </div>
        <div class="flex items-center">
          <input
            type="date"
            v-model="newTask.endDate"
            class="bg-sky-50 rounded-md"
          />
        </div>
        <div></div>
        <div class="flex items-center">
          <button @click="createTask">
            <span class="material-icons mr-2"> done </span></button
          ><button @click="isCreate = false">
            <span class="material-icons"> close </span>
          </button>
        </div>
      </div>

      <div v-if="tasks">
        <Task
          class="w-full"
          v-for="task in tasks"
          :key="task"
          :task="task"
          :deleteTask="deleteTask"
          :updateTask="updateTask"
        />
      </div>
    </div>
  </div>
</template>
