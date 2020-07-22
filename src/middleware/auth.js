export default ({ store, error }) => {
  if (!store.getters['auth/isLoggedIn']) {
    error({
      message: 'You are not signed in',
      statusCode: 403
    })
  }
}
