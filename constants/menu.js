export const menu =  [
  {
    title: "Contents",
    items: [
      {
        title: "Events",
        icon: "fa-calendar-alt",
        link: "/admin/events/",
        roles: ["admin"],
      },
      {
        title: "Notificaitons",
        icon: "fa-bell",
        link: "/admin/notifications",
        roles: ["admin"],
      },
      {
        title: "News",
        icon: "fa-newspaper",
        link: "/admin/news",
        roles: ["admin"],
      },
      {
        title: "Images",
        icon: "fa-images",
        link: "/admin/images",
        roles: ["admin"],
      },
      {
        title: "Files",
        icon: "fa-file",
        link: "/admin/files",
        roles: ["admin"],
      },
    ],
  },
  {
    title: "Pages",
    items: [
      {
        title: "Edit Dept Page",
        icon: "fa-building",
        link: "/admin/departments/edit/civil-engineering",
        roles: ["civil-dept-charge"],
      },
      {
        title: "Edit Dept Page",
        icon: "fa-building",
        link: "/admin/departments/edit/mechanical-engineering",
        roles: ["mechanical-dept-charge"],
      },
      {
        title: "Edit Dept Page",
        icon: "fa-building",
        link: "/admin/departments/edit/electronics-engineering",
        roles: ["electronics-dept-charge"],
      },
      {
        title: "Edit Dept Page",
        icon: "fa-building",
        link: "/admin/departments/edit/electrical-and-electronics-engineering",
        roles: ["electrical-dept-charge"],
      }, 
      {
        title: "Facilities",
        icon: "fa-building",
        link: "/admin/facilities",
        roles: ["admin"],
      },
      {
        title: "Campus",
        icon: "fa-map-marked-alt",
        link: "/admin/campus",
        roles: ["admin"],
      },
      {
        title: "Departments",
        icon: "fa-building",
        link: "/admin/departments",
        roles: ["admin"],
      },
      {
        title: "Dept Facilites",
        icon: "fa-building",
        link: "/admin/dept-facility",
        roles: ["admin"],
      },
      // {
      //   title: "Custom Pages",
      //   icon: "fa-file",
      //   link: "/admin/custom-pages",
      //   roles: ["admin"],
      // },
    ],
  },
  {
    title: "Other Details",
    items: [
      {
        title: "Committees",
        icon: "fa-users",
        link: "/admin/committees",
        roles: ["admin"],
      },
      {
        title: "Highlighted Event",
        icon: "fa-calendar-alt",
        link: "/admin/highlighted-event",
        roles: ["admin"],
      },
      // {
      //   title: "hero Images",
      //   icon: "fa-images",
      //   link: "/admin/hero-images",
      //   roles: ["admin"],
      // },
    ],
  },
  {
    title: "People",
    items: [
      {
        title: "All Users",
        icon: "fa-users",
        link: "/admin/users/all",
        roles: ["admin"],
      },

      {
        title: "My profile",
        icon: "fa-user",
        link: "/admin/users/me",
        roles: ["admin", "staff"],
      },
      {
        title: "Logout",
        icon: "fa-sign-out-alt",
        link: "/auth/logout",
      },
    ],
  },
];
