import auth from './auth'
import anime from './anime'
import people from './people'
import profile from './profile'
import companies from './companies'
export default {
  submit: 'Submit',
  cancel: 'Cancel',
  save: 'Save',
  clear: 'Clear inputs',
  confirmation: 'Are you sure about that?',
  navbar: {
    search: 'Search...',
    login: 'Sign in',
    logout: 'Logout',
    home: 'Home',
    misc: 'Misc'
  },
  settings: {
    darkmode: 'Dark mode'
  },
  actions: {
    refresh: 'Reload data',
    clear: 'Clear fields',
    create: 'Create new record',
    edit: 'Edit Record',
    permalink: 'Copy permalink'
  },
  create: {
    title: 'Title',
    slug: 'Slug',
    synopsis: 'Synopsis',
    premiered: 'Premiered',
    airedFrom: 'Started Airing',
    airedTo: 'Ended Airing',
    schedule: {
      title: 'Airing Schedule',
      monthly: 'Monthly',
      time: 'Time',
      weekday: 'Weekday',
      monthday: 'Date'
    }
  },
  auth,
  anime,
  people,
  profile,
  companies
}
