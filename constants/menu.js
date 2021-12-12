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
        title: "Custom Pages",
        icon: "fa-file",
        link: "/admin/custom-pages",
        roles: ["admin"],
      },
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
      {
        title: "hero Images",
        icon: "fa-images",
        link: "/admin/hero-images",
        roles: ["admin"],
      },
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
      },
      {
        title: "Logout",
        icon: "fa-sign-out-alt",
        link: "/auth/logout",
      },
    ],
  },
];
