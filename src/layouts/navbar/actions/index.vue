<template>
  <v-list-item-group>
    <edit-profile />
    <logout />
  </v-list-item-group>
</template>

<script>
import EditProfile from './editProfile'
import Logout from '~/components/auth/logout'
export default {
  name: 'Actions',
  components: { Logout, EditProfile }
}
</script>
