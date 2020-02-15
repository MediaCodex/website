<template>
  <!-- Avatar -->
  <mdb-dropdown
    v-if="$store.state.auth.authenticated"
    tag="li"
    class="nav-item"
    end
  >
    <mdb-dropdown-toggle slot="toggle" tag="a" nav-link waves-fixed>
      <mdb-avatar class="mx-auto white">
        <img
          src="https://static-cdn.jtvnw.net/jtv_user_pictures/cd6701140ae14505-profile_image-70x70.png"
          class="rounded-circle img-fluid"
        />
      </mdb-avatar>
    </mdb-dropdown-toggle>
    <mdb-dropdown-menu>
      <mdb-dropdown-item>
        {{ $t('navbar.logout') }}
      </mdb-dropdown-item>
    </mdb-dropdown-menu>
  </mdb-dropdown>

  <!-- signin/register -->
  <div v-else>
    <mdb-dropdown-toggle
      tag="a"
      nav-link
      waves-fixed
      icon="user"
      @click.native="showAuth"
    >
      {{ $t('navbar.login') }}
    </mdb-dropdown-toggle>
    <auth :show="authVisible" @close="hideAuth" />
  </div>
</template>

<script>
import {
  mdbDropdown,
  mdbDropdownMenu,
  mdbDropdownToggle,
  mdbDropdownItem
} from 'mdbvue'
import Auth from '../auth'
export default {
  name: 'NavProfile',
  components: {
    Auth,
    mdbDropdown,
    mdbDropdownMenu,
    mdbDropdownToggle,
    mdbDropdownItem
  },
  data() {
    return {
      authVisible: true
    }
  },
  methods: {
    showAuth() {
      this.authVisible = true
    },
    hideAuth() {
      this.authVisible = false
    }
  }
}
</script>
