<template>
  <div>
    <Listbox v-model="selectLanguage">
      <div class="relative z-[22]">
        <ListboxButton
          class="relative w-full flex items-center cursor-pointer space-x-[6px] rtl:space-x-reverse"
        >
          <span class="inline-block md:h-6 md:w-6 w-4 h-4 rounded-full"
            ><img
              :src="selectLanguage.image"
              alt=""
              class="h-full w-full object-cover rounded-full"
          /></span>
        </ListboxButton>

        <Transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            class="absolute min-w-[100px] ltr:right-0 rtl:left-0 md:top-[50px] top-[38px] w-auto max-h-60 overflow-auto border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-800 mt-1"
          >
            <ListboxOption
              v-slot="{ active }"
              v-for="item in filterLanguage"
              :key="item.name"
              :value="item"
              as="template"
            >
              <li
                :class="[
                  active
                    ? 'bg-slate-100 dark:bg-slate-700 dark:bg-opacity-70 bg-opacity-50 dark:text-white '
                    : 'text-slate-600 dark:text-slate-300',
                  'w-full border-b border-b-gray-500 border-opacity-10 px-2 py-2 last:border-none last:mb-0 cursor-pointer first:rounded-t last:rounded-b',
                ]"
              >
                <div class="flex items-center space-x-2 rtl:space-x-reverse">
                  <span class="flex-none">
                    <span
                      class="lg:w-6 lg:h-6 w-4 h-4 rounded-full inline-block"
                    >
                      <img
                        :src="item.image"
                        alt=""
                        class="w-full h-full object-cover relative top-1 rounded-full"
                      />
                    </span>
                  </span>
                  <span class="flex-1 lg:text-base text-sm capitalize">
                    {{ item.name }}</span
                  >
                </div>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </Transition>
      </div>
    </Listbox>
  </div>
</template>

<script setup>
import langImg1 from "@/assets/images/flags/usa.png"
import langImg2 from "@/assets/images/flags/gn.png"
import langImg3 from "@/assets/images/flags/fr.jpg"
import langImg4 from "@/assets/images/flags/es.png"
import {computed, ref, watch} from "vue";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import {setI18nLanguage} from "@/plugins/i18n";

const languages = [
  { code: "en", name: "English", image: langImg1 },
  { code: "de", name: "German", image: langImg2 },
  { code: "fr", name: "French", image: langImg3 },
  { code: "es", name: "Spanish", image: langImg4 },
];

const locale = localStorage.getItem('lang')
const selectLanguage = ref(languages.find((lang) => lang.code === locale) || languages[0])

const filterLanguage = computed(() =>
    languages.filter((lang) => lang.code !== selectLanguage.value.code)
)

watch(selectLanguage, (newLang) => {
  setI18nLanguage(newLang.code);
});
</script>
