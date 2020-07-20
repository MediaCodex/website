<template>
  <v-list-item-group>
    <edit-profile />
    <logout />
  </v-list-item-group>
</template>

<script>
import Logout from '../../auth/logout'
import EditProfile from './editProfile'
export default {
  name: 'Actions',
  components: { Logout, EditProfile }
}
</script>
