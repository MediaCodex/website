export const types = ['series', 'ova', 'movie', 'special', 'ona']
export const typesDisplay = function() {
  return types.map((type) => ({
    text: this.$t(`anime.types.${type}`),
    value: type
  }))
}
