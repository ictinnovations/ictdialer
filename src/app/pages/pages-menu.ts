import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    link: '/pages/dashboard',
    icon: 'home-outline',
    home: true,
  },
  {
    title: 'FEATURES',
    group: true,
  },
  {
    title: 'Campaigns',
    link: '/pages/campaigns/campaigns',
    icon: 'radio-outline'
  },
  {
    title: 'Transmissions',
    link: '/pages/transmission/transmissions',
    icon: 'shake-outline'
  },
  {
    title: 'IVR',
    link: '/pages/ivr/ivr',
    icon: 'trending-up-outline'
  },
  {
    title: 'Contacts',
    icon: 'person-outline',
    children: [
      {
        title: 'Contacts',
        link: '/pages/contact/contacts',
        icon: 'person-add-outline'
      },
      {
        title: 'Groups',
        link: '/pages/contact/group',
        icon: 'people-outline'
      },
    ],
  },
  {
    title: 'Resources',
    icon: 'keypad-outline',
    children: [
  {
    title: 'Voice Recordings',
    link: '/pages/message/recording',
    icon: 'mic-outline'
  },
  {
    title: 'Fax Documents',
    link: '/pages/message/document',
    icon: 'file-text-outline'
  },
  {
    title: 'Email Templates',
    link: '/pages/message/template',
    icon: 'email-outline'
  },
  {
    title: 'Text Messages',
    link: '/pages/message/text',
    icon: 'message-circle-outline'
  },
],
  },
  {
    title: 'Administration',
    icon: 'settings-2-outline',
    children: [
  {
    title: 'Provider / Trunks',
    link: '/pages/provider/provider',
    icon: 'shuffle-2-outline',
  },
  {
    title: 'User Management',
    link: '/pages/user/user',
    icon: 'person-done-outline'
  },
  {
    title: 'Extensions',
    link: '/pages/extension/extension',
    icon: 'hash-outline'
  },
  {
    title: 'CRM Settings',
    link: '/pages/crmsettings',
    icon: 'file-text-outline'
  }
 ],
},
];

export const userMenuItems: NbMenuItem[] = [
  {
    title: 'Dashboard',
    link: '/pages/dashboard',
    icon: 'home-outline',
    home: true,
  },
  {
    title: 'FEATURES',
    group: true,
  },
  {
    title: 'Campaigns',
    link: '/pages/campaigns/campaigns',
    icon: 'radio-outline'
  },
  {
    title: 'Transmissions',
    link: '/pages/transmission/transmissions',
    icon: 'shake-outline'
  },
  {
    title: 'IVR',
    link: '/pages/ivr/ivr',
    icon: 'trending-up-outline'
  },
  {
    title: 'Contacts',
    icon: 'person-outline',
    children: [
      {
        title: 'Contacts',
        link: '/pages/contact/contacts',
        icon: 'person-add-outline'
      },
      {
        title: 'Groups',
        link: '/pages/contact/group',
        icon: 'people-outline'
      },
    ],
  },
  {
    title: 'Resources',
    icon: 'keypad-outline',
    children: [
  {
    title: 'Voice Recordings',
    link: '/pages/message/recording',
    icon: 'mic-outline'
  },
  {
    title: 'Fax Documents',
    link: '/pages/message/document',
    icon: 'file-text-outline'
  },
  {
    title: 'Email Templates',
    link: '/pages/message/template',
    icon: 'email-outline'
  },
  {
    title: 'Text Messages',
    link: '/pages/message/text',
    icon: 'message-circle-outline'
  },
],
  },
  {
    title: 'Administration',
    icon: 'settings-2-outline',
    children: [
  {
    title: 'Extensions',
    link: '/pages/extension/extension',
    icon: 'hash-outline'
  },
  {
    title: 'CRM Settings',
    link: '/pages/crmsettings',
    icon: 'file-text-outline'
  }
 ],
},
];