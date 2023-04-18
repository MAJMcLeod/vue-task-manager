<script>
import Task from "./Task.vue";

export default {
  data() {
    return {
      userId: null,
      tasks: null,
      isCreate: false,
      newTask: {
        task: "",
        endDate: "",
        status: 0,
        userid: this.$store.state.auth.userDetails.id,
      },
      editTask: {
        task: "",
        endDate: "",
        status: 0,
        userid: this.$store.state.auth.userDetails.id,
      },
    };
  },
  methods: {
    // Get user specific tasks
    async getTasksByUserId(id) {
      console.log(this.editTask);
      try {
        const { data } = await this.$api.get(`http://localhost:3000/tasks/${id}`);
        this.tasks = data;
      } catch (error) {
        console.error(error);
      }
    },
    async createTask() {
      try {
        const { task, endDate, status, userid } = this.newTask;
        await this.$api.post("http://localhost:3000/tasks", {
          task,
          endDate,
          status,
          userid
        });
        this.tasks.push({ task, endDate, status, userid });
        this.isCreate = false;
        this.newTask = { task: "", endDate: "", status: 0, userid };
      } catch (error) {
        console.log(error);
      }
    },
    async deleteTask(id) {
      try {
        await this.$api.delete(`http://localhost:3000/tasks/${id}`);
        this.tasks = this.tasks.filter((task) => task.id !== id);
      } catch (error) {
        console.log(error);
      }
    },
    async updateTask(id, updtTask) {
      const index = this.tasks.findIndex((x) => x.id == id);
      console.log(id);
      try {
        const { task, endDate, status, userid } = updtTask;
        await this.$api.put(`http://localhost:3000/tasks/${id}`, {
          task,
          endDate,
          status,
          userid
        });
        this.tasks[index] = { id, task, endDate, status };
      } catch (error) {
        console.log(error);
      }
    },
    async getRefreshToken() {
      try {
        const response = await this.$api.get(`http://localhost:3000/revalidate-login`);
console.log(response)
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.getTasksByUserId(this.$store.state.auth.userDetails.id);
  },
  name: "TaskView",
  components: {
    Task,
  },
};
</script>

<template>
  <div id="taskContainer" class="bg-sky-50 h-full">
    <!-- <router-link to="/login">GO TO LOGIN</router-link>
    <button @click="getRefreshToken">RENEW ACCESS TOKEN</button> -->
    <div class="mx-auto container">
      <div class="py-4 h-full">
        <div class="py-2 mt-2 mx-2">
          <button
          @click="isCreate = true"
          class="flex bg-emerald-500 items-center p-2 rounded-md hover:bg-emerald-600 active:bg-emerald-700 text-white"
        >
          <span class="material-icons"> add </span>Add New Task
        </button>
        </div>
        <div
          class="w-full grid grid-cols-5 py-2 mx-2 font-medium px-4 mt-2 rounded-md"
        >
          <div class="col-span-2">Task</div>
          <div>End Date</div>
          <div>Status</div>
        </div>
        <div
          v-if="isCreate"
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
  </div>
</template>
