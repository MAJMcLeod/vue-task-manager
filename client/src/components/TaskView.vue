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
        const { task, endDate, status } = this.newTask;
        await axios.post("http://localhost:3000/tasks", {
          task,
          endDate,
          status,
        });
        this.tasks.push({ task, endDate, status });
        this.isCreate = false;
        this.newTask = { task: "", endDate: "", status: 0 };
      } catch (error) {
        console.log(error);
      }
    },
    async deleteTask(id) {
      try {
        await axios.delete(`http://localhost:3000/tasks/${id}`);
        this.tasks = this.tasks.filter((task) => task.id !== id);
      } catch (error) {
        console.log(error);
      }
    },
    async updateTask(id, updtTask) {
      const index = this.tasks.findIndex((x) => x.id == id);
      console.log(index);
      console.log(id);
      try {
        const { task, endDate, status } = updtTask;
        await axios.put(`http://localhost:3000/tasks/${id}`, {
          task,
          endDate,
          status,
        });
        this.tasks[index] = { id, task, endDate, status };
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
  <div id="taskContainer" class="bg-sky-50 h-full">
    <div class="w-full bg-white">
      <div class="container mx-auto border-b">
        <div
          class="w-full flex py-4 px-2 items-center justify-between relative"
        >
          <button
            @click="isCreate = true"
            class="flex bg-emerald-500 items-center p-2 rounded-md hover:bg-emerald-600 active:bg-emerald-700 text-white"
          >
            <span class="material-icons"> add </span>Add New Task
          </button>
          <!-- User widget -->
          <button
            class="text-white bg-sky-400 rounded-full p-1 aspect-square h-[40px] flex items-center justify-center"
          >
            <p class=" ">MM</p>
          </button>
          <div
            class="bg-white border rounded-md absolute right-0 top-[72px] border-gray-200 shadow-xl"
          >
            <div class="border-sky-50 border-8 p-3">
              <div class="flex">
                <button
                  class="text-white bg-sky-400 rounded-full p-1 aspect-square h-[60px] flex items-center justify-center mr-3"
                >
                  <p class="text-lg">MM</p>
                </button>
                <div class="flex justify-center flex-col top-[72px]">
                  <p>Max McLeod</p>
                  <p class="text-sm">maxajmcleod@gmail.com</p>
                </div>
              </div>
              <div class="flex mt-4">
                <button class="flex">
                  <span class="material-icons"> logout </span>
                  <p class="ml-4">Logout</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mx-auto container">
      <div class="py-4 h-full">
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
