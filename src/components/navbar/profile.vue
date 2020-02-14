<template>
  <mdb-dropdown tag="li" class="nav-item">
    <mdb-dropdown-toggle slot="toggle" tag="a" nav-link waves-fixed>
      <mdbIcon icon="user" />
    </mdb-dropdown-toggle>
    <mdb-dropdown-menu>
      <mdb-dropdown-item>Action</mdb-dropdown-item>
      <mdb-dropdown-item>Another action</mdb-dropdown-item>
      <mdb-dropdown-item>Something else here</mdb-dropdown-item>
    </mdb-dropdown-menu>
  </mdb-dropdown>
</template>

<script>
import {
  mdbDropdown,
  mdbDropdownMenu,
  mdbDropdownToggle,
  mdbDropdownItem,
  mdbIcon
} from 'mdbvue'
export default {
  name: 'NavProfile',
  components: {
    mdbDropdown,
    mdbDropdownMenu,
    mdbDropdownToggle,
    mdbDropdownItem,
    mdbIcon
  }
}
</script>
