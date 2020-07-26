export default (context) => {
  const cookie = context.$cookies.get('vuetify-dark-theme') || false
  context.$vuetify.theme.dark = cookie
}
