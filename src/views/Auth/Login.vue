<template>
    <div class="text-center 2xl:mb-10 mb-4">
      <h4 class="font-medium">Welcome to Teamflow</h4>
      <p class="text-slate-500 text-base">
        Sign in or create an account to get started
      </p>
    </div>
      <form @submit.prevent="onSubmit" class="space-y-4">
        <Textinput
            label="Email"
            type="email"
            placeholder="Type your email"
            name="emil"
            v-model="email"
            :error="emailError"
            classInput="h-[48px]"
        />
        <Button :is-loading="store.isLoading" type="submit" text="Dark" btnClass=" btn-dark" class="btn btn-dark block w-full text-center">
          Sign in
        </Button>
      </form>
      <div
          class="relative border-b-[#9AA2AF] border-opacity-[16%] border-b pt-6"
      >
        <div
            class="absolute inline-block bg-white dark:bg-slate-800 dark:text-slate-400 left-1/2 top-1/2 transform -translate-x-1/2 px-4 min-w-max text-sm text-slate-500 font-normal"
        >
          Or continue with
        </div>
      </div>
      <div class="max-w-[242px] mx-auto mt-8 w-full">
        <Social />
      </div>
</template>
<script setup>
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import Textinput from "@/components/Textinput";
import {useAuthStore} from "@/store/auth";
import Button from "@/components/Button/index.vue";
import Social from "@/views/Auth/Components/Social.vue";

const
    store = useAuthStore(),

    schema = yup.object({
      email: yup.string().required().email(),
    }),

    { handleSubmit } = useForm({
      validationSchema: schema,
      initialValues: {
        email: "",
      },
    }),

    { value: email,    errorMessage: emailError }    = useField("email"),

    onSubmit = handleSubmit(async (values) => {
      await store.signInWithOtp(values.email)
    });

</script>
<style scoped lang="scss">

</style>