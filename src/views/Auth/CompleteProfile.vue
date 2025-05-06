<template>

  <div class="loginwrapper">
    <div class="lg-inner-column">

      <div class="right-column relative">
        <div
            class="inner-content h-full flex flex-col bg-white dark:bg-slate-800"
        >
          <div class="auth-box h-full flex flex-col justify-center">
            <div class="mobile-logo text-center mb-6 lg:hidden block">
              <router-link to="/">
                <img
                    :src="logo"
                    alt=""
                    class="mx-auto"
                    v-if="!this.$store.themeSettingsStore.isDark"
                />
                <img
                    :src="logoWhite"
                    alt=""
                    class="mx-auto"
                    v-else
                />
              </router-link>
            </div>

            <div class="text-center 2xl:mb-10 mb-4">
              <h4 class="font-semibold text-xl text-slate-800 dark:text-white">Welcome to Teamflow 👋</h4>
              <div class="text-slate-500 text-base">
                Create your team, manage your projects, and scale with ease.
              </div>
            </div>
            <form @submit.prevent="onSubmit" class="space-y-4">
              <Textinput
                  v-if="!member"
                  label="Company Name"
                  type="text"
                  placeholder="Enter your company name"
                  name="company_name"
                  v-model="company_name"
                  classInput="h-[48px]"
                  :error="companyNameError"
              />
              <Textinput
                  label="First Name"
                  type="text"
                  placeholder="Enter your first name"
                  name="first_name"
                  v-model="first_name"
                  classInput="h-[48px]"
                  :error="firstNameError"
              />

              <Textinput
                  label="Last Name"
                  type="text"
                  placeholder="Enter your last name"
                  name="last_name"
                  v-model="last_name"
                  classInput="h-[48px]"
                  :error="lastNameError"
              />
              <Button :is-loading="store.isLoading" type="submit" text="Dark" btnClass=" btn-dark" class="btn btn-dark block w-full text-center">
                Continue
              </Button>
            </form>

          </div>
          <div class="auth-footer text-center">
            &copy; 2025, Teamflow All Rights Reserved.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import Textinput from "@/components/Textinput";
import {useAuthStore} from "@/store/auth";
import Button from "@/components/Button/index.vue";
import {useToast} from "vue-toastification";
import logo from "@/assets/images/logo/logo.svg";
import logoWhite from "@/assets/images/logo/logo-white.svg";
import {ref} from "vue";

const
    store = useAuthStore(),
    toast = useToast(),
    member = ref(store.session.user?.user_metadata.member ?? false),

    schema = yup.object({
      first_name: yup.string().required(),
      last_name: yup.string().required(),
    }),

    { handleSubmit } = useForm({
      validationSchema: schema,
    }),

    { value: company_name,  errorMessage: companyNameError }   = useField("company_name"),
    { value: first_name,    errorMessage: firstNameError }     = useField("first_name"),
    { value: last_name,     errorMessage: lastNameError}       = useField("last_name"),

    onSubmit = handleSubmit(async (values) => {
      member.value ? await store.completeProfileMember(values) : await store.completeProfile(values)
    });

</script>
<style scoped lang="scss">

</style>