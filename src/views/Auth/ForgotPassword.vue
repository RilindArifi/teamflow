<template>
    <div v-if="!isSubmitted">
      <div class="text-center 2xl:mb-10 mb-5">
        <h4 class="font-medium mb-4">Forgot Your Password?</h4>
        <div class="text-slate-500 dark:text-slate-400 text-base">
          Reset Password with Dashcode.
        </div>
      </div>
      <div
          class="font-normal text-base text-slate-500 dark:text-slate-400 text-center px-2 bg-slate-100 dark:bg-slate-600 rounded py-3 mb-4 mt-10"
      >
        Enter your Email and instructions will be sent to you!
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

        <Button
            type="submit"
            class="w-full text-center"
            text="Dark"
            btnClass="btn-dark"
            :isLoading="isLoading"
        >
          Send recovery email
        </Button>

      </form>
      <div
          class="md:max-w-[345px] mx-auto font-normal text-slate-500 dark:text-slate-400 2xl:mt-12 mt-8 uppercase text-sm"
      >
        Forget It,
        <router-link
            :to="{name: 'login'}"
            class="text-slate-900 dark:text-white font-medium hover:underline"
        >
          Send me Back
        </router-link>
        to The Sign In
      </div>
    </div>

    <div v-else class="text-center" >
      <h4 class="text-xl font-semibold mb-4">Check your email</h4>
      <img
          src="@/assets/images/auth/email-send.jpg"
          alt="Email Sent"
          class="mx-auto mb-4 w-40 h-40"
      />
      <p class="text-slate-600 dark:text-slate-300">
        Password recovery link has been sent to <strong>{{ emailSentTo }}</strong>.
      </p>
      <p v-if="countdown > 0" class="mt-2 text-sm text-gray-500">
        Request a new link in {{ countdown }} seconds
      </p>
      <Button v-else  text="White" btnClass="bg-white text-blue-600 hover:underline" :isLoading="isLoading" @click.prevent="reSendLink" >Send link again</Button>
    </div>
</template>
<script setup>
import Textinput from "@/components/Textinput/index.vue";
import Button from "@/components/Button/index.vue";
import {useToast} from "vue-toastification";
import {useAuthStore} from "@/store/auth";
import * as yup from "yup";
import {useField, useForm} from "vee-validate";
import {ref} from "vue";

const
    toast = useToast(),
    isLoading = ref(false),
    isSubmitted = ref(false),
    countdown = ref(60),
    emailSentTo = ref(""),
    store = useAuthStore(),
    schema = yup.object({
      email: yup.string().required().email(),
    }),

    { handleSubmit } = useForm({
      validationSchema: schema,
    }),
    { value: email, errorMessage: emailError } = useField("email"),

    startCountdown = () => {
      const timer = setInterval(() => {
        countdown.value--;
        if (countdown.value <= 0) clearInterval(timer);
      }, 1000);
    },

    reSendLink = () => {
      email.value = emailSentTo.value
      onSubmit()
    },


    onSubmit = handleSubmit(async (values) => {
      isLoading.value = true;
      try {
          await store.forgetPassword(values);
          emailSentTo.value = values.email;
          email.value = "";
          isSubmitted.value = true;
          countdown.value = 60
          startCountdown();
          toast.success('Reset instructions sent to your email.')
      } catch (error) {}
      finally { isLoading.value = false}
    });
</script>
<style lang="scss"></style>
