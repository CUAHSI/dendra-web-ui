function queryIs(is) {
  if (is === true || is === 'true') return true
  if (is === false || is === 'false') return false

  return null
}

export default {
  computed: {
    hasQuery() {
      const { query } = this.$route

      return (
        query.annotationId ||
        query.datastreamId ||
        query.stationId ||
        query.isEnabled !== undefined ||
        query.isHidden !== undefined
      )
    },

    queryAnnotationId() {
      return this.$route.query.annotationId
    },

    queryDatastreamId() {
      return this.$route.query.datastreamId
    },

    queryFaceted() {
      return queryIs(this.$route.query.faceted)
    },

    queryIsEnabled() {
      return queryIs(this.$route.query.isEnabled)
    },

    queryIsHidden() {
      return queryIs(this.$route.query.isHidden)
    },

    queryScheme() {
      return this.$route.query.scheme
    },

    queryStationId() {
      return this.$route.query.stationId
    }
  }
}
