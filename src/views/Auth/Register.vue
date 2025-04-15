<script setup>

import Social from "@/views/Auth/Components/Social.vue";
import Signup from "@/views/Auth/Components/Signup.vue";
</script>

<template>
  <div class="loginwrapper">
    <div class="lg-inner-column">
      <div class="right-column relative bg-white dark:bg-slate-800">
        <div
            class="inner-content h-full flex flex-col bg-white dark:bg-slate-800"
        >
          <div class="auth-box h-full flex flex-col justify-center">
            <div class="mobile-logo text-center mb-6 lg:hidden block">
              <router-link to="/"
              ><img
                  src="@/assets/images/logo/logo.svg"
                  alt=""
                  class="mx-auto"
              /></router-link>
            </div>
            <div class="text-center 2xl:mb-10 mb-5">
              <h4 class="font-medium">Sign up</h4>
              <div class="text-slate-500 dark:text-slate-400 text-base">
                Create an account to start using Dashcode
              </div>
            </div>
            <Signup />
            <div
                class="relative border-b-[#9AA2AF] border-opacity-[16%] border-b pt-6"
            >
              <div
                  class="absolute inline-block bg-white dark:bg-slate-800 left-1/2 top-1/2 transform -translate-x-1/2 px-4 min-w-max text-sm text-slate-500 dark:text-slate-400font-normal"
              >
                Or continue with
              </div>
            </div>
            <div class="max-w-[242px] mx-auto mt-8 w-full">
              <Social />
            </div>
            <div
                class="max-w-[215px] mx-auto font-normal text-slate-500 dark:text-slate-400 2xl:mt-12 mt-6 uppercase text-sm"
            >
              Already registered?
              <router-link
                  to="/"
                  class="text-slate-900 dark:text-white font-medium hover:underline"
              >
                Sign In</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>