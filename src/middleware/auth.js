export default ({ store }) => {
  store.dispatch('auth/fetchUser')
}
