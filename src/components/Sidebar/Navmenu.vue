<template>
  <ul>
    <li
      v-for="(item, i) in filteredItems"
      :key="i"
      :class="`
      ${item.child ? 'item-has-children' : ''}
      ${activeSubmenu === i ? 'open' : ''}
      ${this.$route.name === item.link ? 'menu-item-active' : ''}
      
      `"
      class="single-sidebar-menu"
    >
      <!-- ?? single menu with no childred !!  -->
        <router-link
            :to="`${item.link}`"
            class="menu-link"
            v-if="!item.child && !item.isHeadr"
        >
        <span class="menu-icon" v-if="item.icon">
          <Icon :icon="item.icon"
          /></span>
          <div class="text-box" v-if="item.title">{{ $t('sidebar.'+ item.title) }}</div>
        </router-link>
        <!-- ?? only for menulabel ??  -->
        <div v-else-if="item.isHeadr && !item.child" class="menulabel">
          {{ $t('sidebar.menu.'+ item.title) }}
        </div>
        <!-- !!sub menu parent li !! -->
        <div
            class="menu-link"
            v-else
            :class="
          activeSubmenu === i ? 'parent_active not-collapsed' : 'collapsed'
        "
            @click="toggleSubmenu(i)"
        >
          <div class="flex-1 flex items-start">
          <span class="menu-icon" v-show="item.icon">
            <Icon :icon="item.icon"
            /></span>
            <div class="text-box" v-if="item.title">{{ $t('sidebar.'+ item.title) }}</div>
          </div>
          <div class="flex-0">
            <div
                class="menu-arrow transform transition-all duration-300"
                :class="
              activeSubmenu === i
                ? ' ltr:rotate-90 rtl:rotate-90'
                : 'rtl:rotate-180'
            "
            >
              <Icon icon="heroicons-outline:chevron-right" />
            </div>
          </div>
        </div>
        <Transition
            enter-active-class="submenu_enter-active"
            leave-active-class="submenu_leave-active"
            @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter"
            @before-leave="beforeLeave"
            @leave="leave"
            @after-leave="afterLeave"
        >
          <!-- !! SubMenu !! -->
          <ul class="sub-menu " v-if="i === activeSubmenu">
            <li
                v-for="(ci, index) in item.child"
                :key="index"
                class="block ltr:pl-4 rtl:pr-4 ltr:pr-1 rtl:-l-1 mb-4 first:mt-4"
            >
              <router-link :to="ci.childlink" v-slot="{ isActive }">
              <span
                  class="text-sm flex space-x-3 rtl:space-x-reverse items-center transition-all duration-150"
                  :class="
                  isActive
                    ? ' text-slate-900 dark:text-white font-medium'
                    : 'text-slate-600 dark:text-slate-300'
                "
              >
                <span
                    class="h-2 w-2 rounded-full border border-slate-600 dark:border-slate-300 inline-block flex-none"
                    :class="
                    isActive
                      ? ' bg-slate-900 dark:bg-slate-300 ring-4 ring-opacity-[15%] ring-black-500 dark:ring-slate-300 dark:ring-opacity-20'
                      : ''
                  "
                ></span>
                <span class="flex-1">
                  {{ $t('sidebar.'+ ci.childtitle) }}
                </span>
              </span>
              </router-link>
            </li>
          </ul>
        </Transition>
    </li>
  </ul>
</template>
<script setup>
import {ref, watch, onMounted, computed} from "vue";
import Icon from "../Icon";
import {useRoute, useRouter} from "vue-router";
import {useThemeSettingsStore} from "@/store/themeSettings";
import {can} from "@/acl";

// Props declaration
const
    props = defineProps({
      title: {
        type: String,
        default: "",
      },
      icon: {
        type: String,
        default: "",
      },
      link: {
        type: String,
        default: "",
      },
      items: {
        type: Array,
        required: true,
      },
      childrenLinks: {
        type: Array,
        default: null,
      },
    })



const filteredItems = computed(() => {
  const filterWithPermission = (items) => {
    return items
        .map(item => {
          const children = item.child
              ? filterWithPermission(item.child)
              : undefined

          const hasPermission = !item.can || can(item.can)
          const hasValidChildren = children && children.length > 0

          if (hasPermission || hasValidChildren) {
            return {
              ...item,
              child: children,
            }
          }

          return null
        })
        .filter(Boolean)
  }
  return filterWithPermission(props.items)
})

// Local state
const activeSubmenu = ref(null);
const store = useThemeSettingsStore()

// Methods
const beforeEnter = (element) => {
  requestAnimationFrame(() => {
    if (!element.style.height) {
      element.style.height = "0px";
    }
    element.style.display = null;
  });
};

const enter = (element) => {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      element.style.height = `${element.scrollHeight}px`;
    });
  });
};

const afterEnter = (element) => {
  element.style.height = null;
};

const beforeLeave = (element) => {
  requestAnimationFrame(() => {
    if (!element.style.height) {
      element.style.height = `${element.offsetHeight}px`;
    }
  });
};

const leave = (element) => {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      element.style.height = "0px";
    });
  });
};

const afterLeave = (element) => {
  element.style.height = null;
};

const toggleSubmenu = (index) => {
  activeSubmenu.value = activeSubmenu.value === index ? null : index;
};

const router = useRouter();
const route = useRoute();

// Watch for route changes
watch(
    () => route,
    () => {
      if (store.mobielSidebar) {
        store.mobielSidebar = false;
      }

      props.items.forEach((item) => {
        if (item.link === route.name) {
          activeSubmenu.value = null;
        }
      });
    }
);

// Set active submenu on mount
onMounted(() => {
  props.items.forEach((item, i) => {
    item.child?.forEach((ci) => {
      if (ci.childlink === route.name) {
        activeSubmenu.value = i;
      }
    });
  });
});
</script>
<style lang="scss">
.submenu_enter-active,
.submenu_leave-active {
  overflow: hidden;
  transition: all 0.34s linear;
}

.not-collapsed .has-icon {
  transition: all 0.34s linear;
}
.not-collapsed .has-icon {
  @apply transform rotate-180;
}

// single sidebar menu css
.single-sidebar-menu {
  @apply relative;
  .menulabel {
    @apply text-slate-800 dark:text-slate-300 text-xs font-semibold uppercase mb-4 mt-4;
  }
  > .menu-link {
    @apply flex text-slate-600 font-medium dark:text-slate-300 text-sm capitalize px-[10px] py-3 rounded-[4px] cursor-pointer;
  }
  .menu-icon {
    @apply icon-box inline-flex items-center text-slate-600 dark:text-slate-300 text-lg ltr:mr-3 rtl:ml-3;
  }
}
// menu item has chilren
.item-has-children {
  .menu-arrow {
    @apply h-5 w-5 text-base text-slate-300 bg-slate-100 dark:bg-[#334155] dark:text-slate-300 rounded-full flex justify-center items-center;
  }
}

// close sidebar css
.close_sidebar .menulabel {
  @apply hidden;
}

.close_sidebar:not(.sidebar-hovered) {
  .menu-arrow {
    @apply hidden;
  }
  .single-sidebar-menu {
    .text-box {
      @apply absolute  left-full ml-5 w-[180px] top-0 px-4 py-3 bg-white shadow-dropdown rounded-[4px] dark:bg-slate-800 z-[999] invisible opacity-0 transition-all duration-150;
    }
    &:hover {
      .text-box {
        @apply visible opacity-100;
      }
    }
  }
  .item-has-children {
    .text-box {
      @apply hidden;
    }

    > ul {
      @apply ml-4 absolute left-full top-0 w-[230px] bg-white shadow-dropdown rounded-[4px] dark:bg-slate-800 z-[999] px-4 pt-3 transition-all duration-150 invisible opacity-0;
      display: block !important;
    }
    &:hover {
      > ul {
        @apply visible opacity-100;
      }
    }
  }
}

// active menu
.item-has-children {
  .parent_active {
    @apply bg-secondary-500 bg-opacity-20;
    .icon-box,
    .menu-icon,
    .text-box {
      @apply text-slate-700 dark:text-slate-200;
    }
    .menu-arrow {
      @apply bg-secondary-500 text-slate-600 text-opacity-70 bg-opacity-30 dark:text-white;
    }
  }
}
.menu-item-active {
  .menu-link {
    @apply bg-slate-800 dark:bg-slate-700;
    .icon-box,
    .menu-icon,
    .text-box {
      @apply text-white dark:text-slate-300;
    }
  }
}
</style>
