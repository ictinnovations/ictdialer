import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Campaigns',
    link: '/pages/campaigns/campaigns',
    icon: 'fa fa-bars',
  },
  {
    title: 'Transmissions',
    icon: 'fa fa-volume-control-phone',
    link: '/pages/transmission/transmissions',
  },
  {
    title: 'Contacts',
    icon: 'nb-phone',
    children: [
      {
        title: 'Contacts',
        link: '/pages/contact/contacts',
        icon: 'nb-person',
      },
      {
        title: 'Groups',
        link: '/pages/contact/group',
        icon: 'fa fa-users',
      },
    ],
  },
  {
    title: 'Resources',
    icon: 'ion-android-apps',
    children: [
  {
    title: 'Voice Recordings',
    link: '/pages/message/recording',
    icon: 'ion-mic-a',
  },
  {
    title: 'Fax Documents',
    link: '/pages/message/document',
    icon: 'fa fa-file',
  },
  {
    title: 'Email Templates',
    link: '/pages/message/template',
    icon: 'ion-email',
  },
  {
    title: 'Text Messages',
    link: '/pages/message/text',
    icon: 'ion-android-textsms',
  },
],
  },
  {
    title: 'Administartion',
    icon: 'ion-person',
    children: [
  {
    title: 'Provider / Trunks',
    link: '/pages/provider/provider',
    icon: 'fa fa-user-circle-o',
  },
  {
    title: 'User Management',
    link: '/pages/user/user',
    icon: 'ion-person',
  },
  {
    title: 'Extensions',
    link: '/pages/extension/extension',
    icon: 'fa fa-phone-square',
  },
 ],
},
];
