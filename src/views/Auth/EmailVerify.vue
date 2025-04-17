<template>
      <div class="text-center 2xl:mb-10 mb-5">
        <h4 class="font-medium mb-4">Confirm Your Code</h4>
        <div class="text-slate-500 dark:text-slate-400 text-base">
          Please enter the code sent to your email to verify your account.
        </div>
      </div>

      <div
          class="font-normal text-base text-slate-500 dark:text-slate-400 text-center px-2 bg-slate-100 dark:bg-slate-600 rounded py-3 mb-4 mt-10"
      >
        Enter the 4-digit verification code below.
      </div>

      <form @submit.prevent="onSubmit" class="space-y-4">
        <!-- Code input -->
        <Textinput
            label="Verification Code"
            type="text"
            placeholder="Enter the code"
            name="code"
            v-model="code"
            :error="codeError"
            classInput="h-[48px]"
        />

        <!-- Buttons -->
        <div class="flex gap-2">
          <Button
              @click.prevent="onSubmit"
              type="button"
              class="btn btn-dark w-1/2 text-center"
              text="Dark"
              btnClass=" btn-dark"
              :isLoading="isLoadingSubmit"
          >
            Confirm code
          </Button>
          <Button
              type="button"
              class="btn btn-outline-dark w-1/2 text-center"
              text="Dark"
              btnClass=" btn-dark"
              @click.prevent="sendRecovery"
              :isLoading="isLoadingSend"
          >
            Send recovery email
          </Button>
        </div>
      </form>
</template>
<script setup>
import Textinput from "@/components/Textinput/index.vue";
import Button from "@/components/Button/index.vue";
import {useToast} from "vue-toastification";
import {useRouter} from "vue-router";
import * as yup from "yup";
import {useField, useForm} from "vee-validate";
import {ref} from "vue";
import axiosClient from "@/axios";


const
    toast = useToast(),
    router = useRouter(),
    schema = yup.object({
      code: yup.string().required().min(4),
    }),

    { handleSubmit } = useForm({
      validationSchema: schema,
    }),
    isLoadingSubmit = ref(false),
    isLoadingSend = ref(false),

    { value: code, errorMessage: codeError } = useField("code"),

    onSubmit = handleSubmit(async values => {
      isLoadingSubmit.value = true;

      try {
        const response = await axiosClient.post("email/verify-code", values);
        toast.success(response.data.message);
        await router.push({name: "dashboard"});
      } catch (error) {
        isLoadingSend.value = false;
      } finally {
        isLoadingSubmit.value = false;
      }
    }),
    sendRecovery = async () => {
      isLoadingSend.value = true;

      try {
        const response = await axiosClient.post("email/send-code");
        toast.success(response.data.message);
      } catch (error) {
        isLoadingSend.value = false;
      } finally {
        isLoadingSend.value = false;
      }
    };
</script>
<style lang="scss"></style>
