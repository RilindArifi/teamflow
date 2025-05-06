<template>
  <div>
    <Card noborder>
      <div class="md:flex pb-6 items-center">
        <h6 class="flex-1 md:mb-0 mb-3">Roles</h6>
        <div
            class="md:flex md:space-x-3 items-center flex-none rtl:space-x-reverse"
            :class="window.width < 768 ? 'space-x-rb' : ''"
        >
          <InputGroup
              v-model="state.search"
              placeholder="Search"
              type="text"
              prependIcon="heroicons-outline:search"
              merged
          />
          <Button
              icon="heroicons-outline:plus-sm"
              text="Add Role"
              btnClass=" btn-dark font-normal btn-sm "
              iconClass="text-lg"
              link="invoice-add"
          />
        </div>
      </div>
      <div class="-mx-6">
        <vue-good-table
            :is-loading="store.isLoading"
            :columns="columns"
            styleClass=" vgt-table centered lesspadding2 table-head "
            :rows="store.data"
            :sort-options="{
            enabled: false,
          }"
            :pagination-options="{
            enabled: true,
          }"
            :search-options="{
            enabled: true,
            externalQuery: state.search,
          }"
            :select-options="{
            enabled: true,
            selectOnCheckboxOnly: true,
            selectioninfoClass: 'custom-class',
            selectionText: 'rows selected',
            clearSelectionText: 'clear',
            disableSelectinfo: true,
            selectAllByGroup: true,
          }"
        >
          <template v-slot:table-row="props">
            <span v-if="props.column.field == 'customer'"
                class="flex items-center"
            >
              <span class="w-7 h-7 rounded-full ltr:mr-3 rtl:ml-3 flex-none">
                <img
                    :src="props.row.customer.image"
                    :alt="props.row.customer.name"
                    class="object-cover w-full h-full rounded-full"
                />
              </span>
              <span
                  class="text-sm text-slate-600 dark:text-slate-300 capitalize font-medium"
              >{{ props.row.customer.name }}</span
              >
            </span>
            <span v-if="props.column.field == 'order'" class="font-medium">
              {{ "#" + props.row.order }}
            </span>
            <span v-if="props.column.field == 'date'"
                class="text-slate-500 dark:text-slate-400"
            >
              {{ props.row.date }}
            </span>
            <span v-if="props.column.field == 'status'" class="block w-full">
              <span
                  class="inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25"
                  :class="`${
                  props.row.status === 'paid'
                    ? 'text-success-500 bg-success-500'
                    : ''
                }
            ${
              props.row.status === 'due'
                ? 'text-warning-500 bg-warning-500'
                : ''
            }
            ${
              props.row.status === 'cancled'
                ? 'text-danger-500 bg-danger-500'
                : ''
            }
             `"
              >
                {{ props.row.status }}
              </span>
            </span>
            <span v-if="props.column.field == 'action'">
              <div class="flex space-x-3 justify-center">
                <Tooltip placement="top" arrow theme="dark">
                  <template #button>
                    <div class="action-btn">
                      <Icon icon="heroicons:pencil-square" />
                    </div>
                  </template>
                  <span> Permissions</span>
                </Tooltip>
                <Tooltip placement="top" arrow theme="danger-500">
                  <template #button>
                    <div class="action-btn">
                      <Icon icon="heroicons:trash" />
                    </div>
                  </template>
                  <span>Delete</span>
                </Tooltip>
              </div>
            </span>
          </template>
          <template #pagination-bottom="props">
            <div class="py-4 px-3">
              <Pagination
                  :total="store.total"
                  :current="state.current"
                  :per-page="state.perPage"
                  :pageRange="state.pageRange"
                  @page-changed="state.current = $event"
                  :perPageChanged="val => state.perPage = val.currentPerPage"
                  enableSearch
                  enableSelect
                  :options="state.options"
              >
              </Pagination>
            </div>
          </template>
        </vue-good-table>
      </div>
    </Card>
  </div>
</template>
<script setup>
import { reactive, ref, watch} from 'vue'
import Dropdown from "@/components/Dropdown"
import Button from "@/components/Button"
import Card from "@/components/Card"
import Tooltip from "@/components/Tooltip";
import Icon from "@/components/Icon"
import InputGroup from "@/components/InputGroup"
import Pagination from "@/components/Pagination"
import { MenuItem } from "@headlessui/vue"
import window from "@/mixins/window"
import { useRouter } from 'vue-router'
import {useRoleStore} from "@/store/roles";

window

const
    store = useRoleStore(),
    state = reactive({
      search: '',
      current: 1,
      perPage: 3,
      pageRange: 1,
      options: [
        { value: 5, label: "5/page" },
        { value: 10, label: "10/page" },
        { value: 50, label: "50/page" },
        { value: 100, label: "100/page" }
      ]
    }),
    router = useRouter()

const columns = ref([
  { label: "Name", field: "name" },
  { label: "Company", field: "company.name" },
  { label: "Action", field: "action" },
])

const actions = ref([
  {
    name: "edit",
    icon: "heroicons:pencil-square",
    doit: () => router.push("/app/invoice-edit")
  },
  {
    name: "delete",
    icon: "heroicons-outline:trash",
    doit: () => {
      // delete logic here
    }
  }
])

watch(state,() => store.getRoles(state),{ immediate: true })
</script>
<style lang="scss" scoped>
.action-btn {
  @apply h-6 w-6 flex flex-col items-center justify-center border border-slate-200 dark:border-slate-700 rounded;
}
</style>
