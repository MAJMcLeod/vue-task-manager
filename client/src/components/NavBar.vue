<script>
export default {
  data() {
    return {
      widgetIsActive: false,
      user: this.$store.state.auth.userDetails,
    };
  },
  methods: {
    async logOut() {
      this.$store.commit("auth/setIsAuthorized", false);
    },
  },
  name: "NavBar",
};
</script>

<template>
  <div class="w-full bg-white">
    <div class="container mx-auto border-b">
      <div class="w-full flex py-4 px-2 items-center justify-between relative">
        <div class="flex items-center">
          <img src="../assets/images/icon.svg" alt="" class="h-[20px] mr-1" />
          <img src="../assets/images/logo.svg" alt="" class="h-[30px]" />
        </div>
        <!-- User widget -->
        <button
          @click="widgetIsActive = !widgetIsActive"
          class="text-white bg-sky-400 rounded-full p-1 aspect-square h-[40px] flex items-center justify-center"
        >
          <p class=" ">MM</p>
        </button>
        <div
          v-if="widgetIsActive"
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
                <p>{{ user.name }} {{ user.surname }}</p>
                <p class="text-sm">{{ user.email }}</p>
              </div>
            </div>
            <div class="flex mt-4 py-2 hover:bg-sky-100 active:bg-sky-200">
              <button class="flex items-center" @click="logOut">
                <span class="material-icons"> logout </span>
                <p class="ml-4">Logout</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
