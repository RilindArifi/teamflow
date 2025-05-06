<template>
      <div class="text-center 2xl:mb-10 mb-5">
        <h4 class="font-medium mb-4">Enter verification code</h4>
        <div class="text-slate-500 dark:text-slate-400 text-base">
          We've sent a verification code to
          <p>{{sessionEmail}}</p>
        </div>
      </div>

      <div
          class="font-normal text-base text-slate-500 dark:text-slate-400 text-center px-2 bg-slate-100 dark:bg-slate-600 rounded py-3 mb-4"
      >
        Enter the 6-digit verification code below.
      </div>

      <form @submit.prevent="onSubmit" class="space-y-4">
        <!-- Code input -->
        <Textinput
            label="Verification Code"
            type="number"
            placeholder="00000"
            name="code"
            v-model="code"
            :error="codeError"
            classInput="h-[48px] text-center"
        />

        <!-- Buttons -->
        <div class="flex gap-2">
          <Button
              @click.prevent="onSubmit"
              type="button"
              class="btn btn-dark w-1/2 text-center"
              text="Dark"
              btnClass=" btn-dark"
              :isLoading="store.isLoading"
          >
            Confirm code
          </Button>
          <router-link
              :to="{name: 'login'}"
              class="btn btn-outline-dark w-1/2 text-center"
          >
            Try different email
          </router-link>
        </div>
      </form>
</template>
<script setup>
import Textinput from "@/components/Textinput/index.vue";
import Button from "@/components/Button/index.vue";
import * as yup from "yup";
import {useField, useForm} from "vee-validate";
import {ref} from "vue";
import {useAuthStore} from "@/store/auth";


const
    sessionEmail = ref(sessionStorage.getItem("email") ?? ''),
    store = useAuthStore(),
    schema = yup.object({
      code: yup.string().required().min(4),
    }),

    { handleSubmit } = useForm({
      validationSchema: schema,
    }),

    { value: code, errorMessage: codeError } = useField("code"),

    onSubmit = handleSubmit(async values => {
      await store.verifyOtp(sessionEmail.value , values.code)
    })
</script>
<style lang="scss"></style>
