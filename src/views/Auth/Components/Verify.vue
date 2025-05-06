<template>
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
import Textinput from "@/components/Textinput";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import axiosClient from "@/plugins/axios";
import {useToast} from "vue-toastification";
import {useRouter} from "vue-router";
import Button from "@/components/Button/index.vue";
import {ref} from "vue";

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