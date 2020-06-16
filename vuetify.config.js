export default {
  theme: {
    options: {
      themeCache: {
        get: (key) => localStorage.getItem(key),
        set: (key, value) => localStorage.setItem(key, value)
      }
    }
  },
  icons: {
    iconfont: 'mdi'
  }
}
