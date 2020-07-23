const isProd = process.env.FIRE_ENV === 'production'

export default [
  { name: 'google', content: 'notranslate' },
  ...(!isProd && { name: 'robots', content: 'noindex' })
]
