<script>
export default {
  name: "Login",
  methods: {
    async login() {
      try {
        // Check if user details are valid
        const { data, headers } = await this.$api.post(
          "http://localhost:3000/login",
          this.loginDetails
        );
        this.user = data;
        this.userIsValid = true;
        // If user details are valid, change global state, log in
        this.$store.commit("auth/setUserDetails", this.user);
        this.$store.commit("auth/setIsAuthenticated", true);

        this.$router.push({ path: "/" });
      } catch (error) {
        // If credentials are invalid fail and reflect on frontend
        this.userIsValid = false;
        console.log(error);
      }
    },
  },
  data() {
    return {
      loginDetails: {
        email: null,
        password: null,
      },
      user: null,
      userIsValid: null,
    };
  },
};
</script>

<template>
  <div
    class="w-full h-full flex items-center justify-center text-center bg-sky-50"
  >
    <div class="flex flex-col bg-white rounded-md p-8">
      <img src="../assets/images/logo.svg" alt="" class="h-[40px]" />
      <p>Welcome!</p>
      <input
        v-model="loginDetails.email"
        class="mt-7 bg-sky-50 p-2"
        type="text"
        placeholder="Email"
      />
      <input
        v-model="loginDetails.password"
        class="mt-2 bg-sky-50 p-2 mb-3"
        type="text"
        placeholder="Password"
      />
      <p v-if="!userIsValid && userIsValid !== null" class="text-red-500 mb-3">
        Email or password is incorrect.
      </p>
      <div v-else class="my-3"></div>
      <div class="flex items-center">
        <a href="" class="text-sky-500 hover:text-sky-400 font-medium mr-6"
          >Create Account</a
        >
        <button
          @click="login"
          class="flex bg-emerald-500 items-center py-1 px-6 rounded-md hover:bg-emerald-600 active:bg-emerald-700 text-white"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>
