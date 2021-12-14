export default [
    'admin',
    'staff',
    'student',
    'principal',
    'nss-in-charge',
    'placement-officer',
    'civil-dept-charge',
    'office-dept-charge',
    'workshop-dept-charge',
    'staff-club-in-charge',
    'electrical-dept-charge',
    'mechanical-dept-charge',
    'electronics-dept-charge',
    'boomithrasena-club-in-charge'
]

export const deptPermissionsInverted = {
    'electrical-and-electronics-engineering': 'electrical-dept-charge',
    'mechanical-engineering': 'mechanical-dept-charge',
    'civil-engineering': 'civil-dept-charge',
    'electronics-engineering': 'electronics-dept-charge',
}

export const deptPermissions = {
    "electrical-dept-charge": "electrical-and-electronics-engineering",
    "mechanical-dept-charge": "mechanical-engineering",
    "civil-dept-charge": "civil-engineering",
    "electronics-dept-charge": "electronics-engineering",
  };

export const tagPermissions = {
    'nss-in-charge' : 'nss',
    'placement-officer' : 'placement-cell',
    'boomithrasena-club-in-charge': 'boomithraseena-club',
    'staff-club-in-charge': 'staff-club',
}

export const notificationPermissions = {
    'electrical-dept-charge': 'electrical-and-electronics-engineering',
    'mechanical-dept-charge': 'mechanical-engineering',
    'electronics-dept-charge': 'electronics-engineering',
    'civil-dept-charge': 'civil-engineering',
    'office-dept-charge': 'office-section',
    'workshop-dept-charge': 'workshop-section',
}

export const eventsTags = [
    { name: "electronics-engineering" },
    { name: "electrical-and-electronics-engineering" },
    { name: "civil-engineering" },
    { name: "mechanical-engineering" },
    { name: "general-dept" },
    { name: "office-section" },
    { name: "nss" },
    { name: "placement-cell" },
    { name: "boomithraseena-club" },
    { name: "staff-club" },
  ];

 export const notificationTags = [
    { name: "electronics-engineering" },
    { name: "electrical-and-electronics-engineering" },
    { name: "civil-engineering" },
    { name: "mechanical-engineering" },
    { name: "general-dept" },
    { name: "office-section" },
  ];

  export const filesTags = [
    { name: "design-files" },
    { name: "previous-question-paper" },
    { name: "govt-order" },
    { name: "downloads" },
    { name: "extension-of-approval" },
    { name: "academic-calendar" },
    { name: "college-magazine" },
  ];