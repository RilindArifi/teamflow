<template>
    <div class="text-center 2xl:mb-10 mb-5">
      <h4 class="font-medium">Sign up</h4>
      <div class="text-slate-500 dark:text-slate-400 text-base">
        Create an account to start using Dashcode
      </div>
    </div>
    <form @submit.prevent="onSubmit" class="space-y-4">
      <Textinput
          label="Company name"
          type="text"
          placeholder="Company Name"
          name="name"
          v-model="company_name"
          :error="companyNameError"
          classInput="h-[48px]"
      />
      <Textinput
          label="Email"
          type="email"
          placeholder="Type your email"
          name="emil"
          v-model="email"
          :error="emailError"
          classInput="h-[48px]"
      />
      <Textinput
          label="Password"
          type="password"
          placeholder="8+ characters, 1 capitat letter "
          name="password"
          v-model="password"
          :error="passwordError"
          hasicon
          classInput="h-[48px]"
      />

      <label class="cursor-pointer flex items-start">
        <input
            type="checkbox"
            class="hidden"
            @change="() => (checkbox = !checkbox)"
        />
        <span
            class="h-4 w-4 border rounded inline-flex mr-3 relative flex-none top-1 transition-all duration-150"
            :class="
  checkbox
    ? 'ring-2 ring-black-500 dark:ring-offset-slate-600 dark:ring-slate-900  dark:bg-slate-900 ring-offset-2 bg-slate-900'
    : 'bg-slate-100 dark:bg-slate-600 border-slate-100 dark:border-slate-600 '
"
        >
<img
    src="@/assets/images/icon/ck-white.svg"
    alt=""
    class="h-[10px] w-[10px] block m-auto"
    v-if="checkbox"
/>
</span>
        <span class="text-slate-500 dark:text-slate-400 text-sm leading-6"
        >You accept our Terms and Conditions and Privacy Policy</span
        >
      </label>

      <Button :is-loading="store.isLoading" text="Dark" btnClass=" btn-dark" type="submit" class="btn btn-dark block w-full text-center">
        Create an account
      </Button>
    </form>
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
          :to="{name: 'login'}"
          class="text-slate-900 dark:text-white font-medium hover:underline"
      >
        Sign In</router-link
      >
    </div>
</template>

<script setup>
import Social from "@/views/Auth/Components/Social.vue";
import Textinput from "@/components/Textinput/index.vue";
import Button from "@/components/Button/index.vue";
import {useAuthStore} from "@/store/auth";
import {ref} from "vue";
import * as yup from "yup";
import {useField, useForm} from "vee-validate";

const
    store = useAuthStore(),

    checkbox = ref(false),

    schema = yup.object({
      company_name: yup.string().required(),
      email: yup.string().required().email(),
      password: yup.string().required().min(8),
    }),

    { handleSubmit } = useForm({
      validationSchema: schema,
      initialValues: {
        company_name: "",
        email: "",
        password: "",
      },
    }),

    { value: email, errorMessage: emailError }       = useField("email"),
    { value: password, errorMessage: passwordError } = useField("password"),
    { value: company_name, errorMessage: companyNameError}          = useField("company_name"),

    onSubmit = handleSubmit((values) => {
      store.register(values)
    });
</script>

<style scoped lang="scss">

</style>