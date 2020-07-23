/**
 * Default meta tags
 *
 * @constant {Array<Object>} defaultMeta
 */
const defaultMeta = [{ name: 'google', content: 'notranslate' }]

/**
 * Meta tags for development environments
 *
 * @constant {Array<Object>} devMeta
 */
const devMeta = [{ name: 'robots', content: 'noindex' }]

/**
 * Combine the various metas based on env
 *
 * @returns {Array<Object>}
 */
const meta = () => {
  let meta = defaultMeta

  // non-prod meta
  if (process.env.FIRE_ENV !== 'production') {
    meta = meta.concat(devMeta)
  }

  return meta
}

export default meta()
