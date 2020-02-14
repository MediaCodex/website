<template>
  <mdb-navbar-nav>
    <mdb-nav-item href="#" active>Home</mdb-nav-item>
  </mdb-navbar-nav>
</template>

<script>
import {
  mdbNavbarNav,
  mdbNavItem
  // mdbDropdown,
  // mdbDropdownMenu,
  // mdbDropdownToggle,
  // mdbDropdownItem,
} from 'mdbvue'
export default {
  name: 'Routes',
  components: {
    mdbNavbarNav,
    mdbNavItem
    // mdbDropdown,
    // mdbDropdownMenu,
    // mdbDropdownToggle,
    // mdbDropdownItem
  }
}
</script>
