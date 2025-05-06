import userImg from "@/assets/images/all-img/user.png";
import user2Img from "@/assets/images/all-img/user2.png";
import user3Img from "@/assets/images/all-img/user3.png";
import user4Img from "@/assets/images/all-img/user4.png";


export const menuItems = [
  {
    isHeadr: true,
    title: "overview",
  },
  {
    title: 'dashboard',
    icon: "heroicons-outline:home",
    link: "/dashboard",
    can: "view dashboard"
  },
  {
    title: 'events',
    icon: "heroicons-outline:calendar",
    link: "/dashboard/events",
  },
  {
    title: "messaging",
    icon: "heroicons-outline:chat",
    link: "/dashboard/chat",
  },
  {
    title: "to_do_list",
    icon: "heroicons-outline:clipboard-check",
    link: "/dashboard/todo",
  },

  {
    isHeadr: true,
    title: "operations",
  },
  {
    title: "projects",
    icon: "heroicons-outline:rectangle-group",
    link: "/dashboard/projects",
    can: "view projects"
  },
  {
    title: "tasks",
    icon: "heroicons-outline:rectangle-stack",
    link: "/dashboard/tasks",
    can: "view tasks"
  },
  {
    title: "leaves",
    icon: "heroicons-outline:calendar-days",
    link: "/dashboard/leaves",
    can: "view leaves"
  },

  {
    isHeadr: true,
    title: "user_management",
  },
  {
    title: "clients",
    icon: "heroicons-outline:users",
    link: "/dashboard/clients",
    can: "view users"
  },
  {
    title: "employees",
    icon: "heroicons-outline:user-group",
    link: "/dashboard/employees",
    can: "view users"
  },
  {
    title: "roles_and_permissions",
    icon: "heroicons-outline:lock-open",
    link: "/dashboard/roles",
    can: "view roles"
  },

  {
    isHeadr: true,
    title: "administration",
  },
  {
    title: "system_tools",
    icon: "heroicons-outline:view-boards",
    link: "#",
    child: [
      {
        childtitle: "activity_logs",
        childlink: "/dashboard/activities",
        can: "manage activities"
      },
      {
        childtitle: "subscription_plans",
        childlink: "/dashboard/packages",
        can: "manage packages"
      },
      {
        childtitle: "help_center",
        childlink: "/dashboard/faq",
        can: "manage faq"
      },
      {
        childtitle: "system_settings",
        childlink: "/dashboard/settings",
        can: "manage settings"
      },
    ],
  },
];
// menuseetins


export const notifications = [
  {
    title: "Your order is placed",
    desc: "Amet minim mollit non deser unt ullamco est sit aliqua.",
    image: userImg,
    link: "#",
  },
  {
    title: "Congratulations Darlene  🎉",
    desc: "Won the monthly best seller badge",
    unread: true,
    image: user2Img,
    link: "#",
  },
  {
    title: "Revised Order 👋",
    desc: "Won the monthly best seller badge",
    image: user3Img,
    link: "#",
  },
  {
    title: "Brooklyn Simmons",
    desc: "Added you to Top Secret Project group...",
    image: user4Img,
    link: "#",
  },
];

export const message = [
  {
    title: "Wade Warren",
    desc: "Hi! How are you doing?.....",
    active: true,
    hasnotifaction: true,
    notification_count: 1,
    image: userImg,
    link: "#",
  },
  {
    title: "Savannah Nguyen",
    desc: "Hi! How are you doing?.....",
    active: false,
    hasnotifaction: false,
    image: user2Img,
    link: "#",
  },
  {
    title: "Ralph Edwards",
    desc: "Hi! How are you doing?.....",
    active: false,
    hasnotifaction: true,
    notification_count: 8,
    image: user3Img,
    link: "#",
  },
  {
    title: "Cody Fisher",
    desc: "Hi! How are you doing?.....",
    active: true,
    hasnotifaction: false,
    image: user4Img,
    link: "#",
  },
  {
    title: "Savannah Nguyen",
    desc: "Hi! How are you doing?.....",
    active: false,
    hasnotifaction: false,
    image: user2Img,
    link: "#",
  },
  {
    title: "Ralph Edwards",
    desc: "Hi! How are you doing?.....",
    active: false,
    hasnotifaction: true,
    notification_count: 8,
    image: user3Img,
    link: "#",
  },
  {
    title: "Cody Fisher",
    desc: "Hi! How are you doing?.....",
    active: true,
    hasnotifaction: false,
    image: user4Img,
    link: "#",
  },
];

export const topMenu = [
  {
    title: "dashboard",
    icon: "heroicons-outline:home",
    link: "/dashboard",
    can: "view dashboard"
  },
  {
    title: "overview",
    icon: "heroicons-outline:chip",
    child: [
      {
        childtitle: "events",
        childicon: "heroicons-outline:calendar",
        childlink: "/dashboard/events",
      },
      {
        childtitle: "messaging",
        childicon: "heroicons-outline:chat",
        childlink: "/dashboard/chat",
      },
      {
        childtitle: "to_do_list",
        childicon: "heroicons-outline:clipboard-check",
        childlink: "/dashboard/todo",
      },
    ],
  },
  {
    title: "operations",
    icon: "heroicons-outline:view-boards",
    child: [
      {
        childtitle: "projects",
        childicon: "heroicons-outline:rectangle-group",
        childlink: "/dashboard/projects",
        can: "view projects"
      },
      {
        childtitle: "tasks",
        childicon: "heroicons-outline:rectangle-stack",
        childlink: "/dashboard/tasks",
        can: "view tasks"
      },
      {
        childtitle: "leaves",
        childicon: "heroicons-outline:calendar-days",
        childlink: "/dashboard/leaves",
        can: "view leaves"
      },
    ],
  },
  {
    title: "user_management",
    icon: "heroicons-outline:view-grid-add",
    child: [
      {
        childtitle: "clients",
        childicon: "heroicons-outline:users",
        childlink: "/dashboard/clients",
        can: "view users"
      },
      {
        childtitle: "employees",
        childicon: "heroicons-outline:user-group",
        childlink: "/dashboard/employees",
        can: "view users"
      },
      {
        childtitle: "roles_and_permissions",
        childicon: "heroicons-outline:lock-open",
        childlink: "/dashboard/roles",
        can: "view roles"
      },
    ],
  },
  {
    title: "administration",
    icon: "heroicons-outline:view-boards",
    child: [
      {
        childtitle: "activity_logs",
        childlink: "/dashboard/activities",
        childicon: "heroicons-outline:list-bullet",
        can: "manage activities"
      },
      {
        childtitle: "subscription_plans",
        childlink: "/dashboard/packages",
        childicon: "heroicons-outline:square-2-stack",
        can: "manage packages"
      },
      {
        childtitle: "help_center",
        childlink: "/dashboard/faq",
        childicon: "heroicons-outline:clipboard-check",
        can: "manage faq"
      },
      {
        childtitle: "system_settings",
        childlink: "/dashboard/settings",
        childicon: "heroicons-outline:wrench-screwdriver",
        can: "manage settings"
      },
    ],
  },
];

export const alertType = [
  {
    type: "dark",
  },
  {
    type: "primary",
  },

  {
    type: "secondary",
  },
  {
    type: "success",
  },
  {
    type: "info",
  },
  {
    type: "danger",
  },
  {
    type: "warning",
  },
];

export const alertType2 = [
  {
    type: "dark-light",
  },
  {
    type: "primary-light",
  },

  {
    type: "secondary-light",
  },
  {
    type: "success-light",
  },
  {
    type: "info-light",
  },
  {
    type: "danger-light",
  },
  {
    type: "warning-light",
  },
];

export const alertType3 = [
  {
    type: "dark",
    icon: "fluent:target-20-regular",
  },
  {
    type: "primary",
    icon: "fluent:target-20-regular",
  },

  {
    type: "secondary",
    icon: "heroicons-outline:support",
  },
  {
    type: "success",
    icon: "akar-icons:double-check",
  },
  {
    type: "t-info",
    icon: "heroicons-outline:information-circle",
  },
  {
    type: "danger",
    icon: "heroicons-outline:exclamation",
  },
  {
    type: "warning",
    icon: "heroicons-outline:ban",
  },
];
export const alertType4 = [
  {
    type: "dark-light",
    icon: "fluent:target-20-regular",
  },
  {
    type: "primary-light",
    icon: "fluent:target-20-regular",
  },

  {
    type: "secondary-light",
    icon: "heroicons-outline:support",
  },
  {
    type: "success-light",
    icon: "akar-icons:double-check",
  },
  {
    type: "info-light",
    icon: "heroicons-outline:information-circle",
  },
  {
    type: "danger-light",
    icon: "heroicons-outline:exclamation",
  },
  {
    type: "warning-light",
    icon: "heroicons-outline:ban",
  },
];
export const alertType5 = [
  {
    type: "dark-outline",
  },
  {
    type: "primary-outline",
  },

  {
    type: "secondary-outline",
  },
  {
    type: "success-outline",
  },
  {
    type: "info-outline",
  },
  {
    type: "danger-outline",
  },
  {
    type: "warning-outline",
  },
];
export const alertType6 = [
  {
    type: "dark-outline",
    icon: "fluent:target-20-regular",
  },
  {
    type: "primary-outline",
    icon: "fluent:target-20-regular",
  },

  {
    type: "secondary-outline",
    icon: "heroicons-outline:support",
  },
  {
    type: "success-outline",
    icon: "akar-icons:double-check",
  },
  {
    type: "info-outline",
    icon: "heroicons-outline:information-circle",
  },
  {
    type: "danger-outline",
    icon: "heroicons-outline:exclamation",
  },
  {
    type: "warning-outline",
    icon: "heroicons-outline:ban",
  },
];

export const trackingParcel = [
  {
    title: "Project start date",
    desc: "This parcel is paid for by the customer. Please contact the customer for any further information.",
    date: "Sep 20, 2021 ",
    time: "12:32 AM",
    status: "ok",
  },
  {
    title: "Project start date",
    date: "Sep 20, 2021 ",
    desc: "This parcel is paid for by the customer. Please contact the customer for any further information.",
    time: "12:32 AM",
    status: "ok",
  },
  {
    title: "Project start date",
    date: "Sep 20, 2021 ",
    desc: "This parcel is paid for by the customer. Please contact the customer for any further information.",
    time: "12:32 AM",
    status: "ok",
  },
  {
    title: "Project start date",
    date: "Sep 20, 2021 ",
    desc: "This parcel is paid for by the customer. Please contact the customer for any further information.",
    time: "12:32 AM",
  },
  {
    title: "Project start date",
    date: "Sep 20, 2021 ",
    desc: "This parcel is paid for by the customer. Please contact the customer for any further information.",
    time: "12:32 AM",
  },
  {
    title: "Project start date",
    date: "Sep 20, 2021 ",
    desc: "This parcel is paid for by the customer. Please contact the customer for any further information.",
    time: "12:32 AM",
  },
  {
    title: "Project start date",
    date: "Sep 20, 2021 ",
    desc: "This parcel is paid for by the customer. Please contact the customer for any further information.",
    time: "12:32 AM",
  },
];

export const TodoList = [
  {
    id: 1,
    image: userImg,
    title: "Amet minim mollit non deserunt ullam.",
    isDone: false,
  },
  {
    id: 2,
    image: user2Img,
    title: "Amet minim mollit non deserunt ullam.",
    isDone: false,
  },
  {
    id: 3,
    image: user3Img,
    title: "Amet minim mollit non deserunt ullam.",
    isDone: false,
  },
  {
    id: 4,
    image: user4Img,
    title: "Amet minim mollit non deserunt ullam.",
    isDone: false,
  },
  {
    id: 5,
    image: user2Img,
    title: "Amet minim mollit non deserunt ullam.",
    isDone: false,
  },
  {
    id: 6,
    image: user3Img,
    title: "Amet minim mollit non deserunt ullam.",
    isDone: false,
  },
];

//  todo fillter
export const fillters = [
  {
    value: "all",
    name: "My Task",
    icon: "uil:image-v",
  },
  {
    value: "fav",
    name: "Starred",
    icon: "heroicons:star",
  },
  {
    value: "done",
    name: "Completed",
    icon: "heroicons:document-check",
  },
  {
    value: "trash",
    name: "Trash",
    icon: "heroicons:trash",
  },
  {
    name: "Team",
    icon: "heroicons:users",
    value: "team",
  },
  {
    name: "low",
    icon: "heroicons:flag",
    value: "low",
  },
  {
    name: "medium",
    icon: "heroicons:flag",
    value: "medium",
  },
  {
    name: "high",
    icon: "heroicons:flag",
    value: "high",
  },
  {
    name: "update",
    icon: "heroicons:refresh",
    value: "update",
  },
];

export const editCatagory = [
  {
    value: "team",
    label: "team",
  },
  {
    value: "low",
    label: "low",
  },
  {
    value: "medium",
    label: "medium",
  },
  {
    value: "high",
    label: "high",
  },
];

export const projectCatagory = [
  {
    value: "team",
    label: "team",
  },
  {
    value: "low",
    label: "low",
  },
  {
    value: "medium",
    label: "medium",
  },
  {
    value: "high",
    label: "high",
  },
];

import avatar1 from "@/assets/images/avatar/av-1.svg";
import avatar2 from "@/assets/images/avatar/av-2.svg";
import avatar3 from "@/assets/images/avatar/av-3.svg";
import avatar4 from "@/assets/images/avatar/av-4.svg";
import avatar5 from "@/assets/images/avatar/av-5.svg";
import avatar6 from "@/assets/images/avatar/av-6.svg";

export const assignOption = [
  {
    title: "Mahedi Amin",
    image: avatar1,
  },
  {
    title: "Sovo Haldar",
    image: avatar2,
  },
  {
    title: "Rakibul Islam",
    image: avatar3,
  },
  {
    title: "Moni Haldar",
    image: avatar4,
  },
  {
    title: "Pritom Miha",
    image: avatar5,
  },
  {
    title: "Simanta Kika",
    image: avatar6,
  },
];
