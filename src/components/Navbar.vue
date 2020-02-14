<template>
  <mdb-navbar color="secondary-color-dark" dark>
    <mdb-navbar-toggler>
      <mdb-navbar-nav>
        <mdb-nav-item href="#" active>Home</mdb-nav-item>
      </mdb-navbar-nav>
      <mdb-form-inline class="ml-auto">
        <mdbIcon icon="search" />
        <mdb-input
          type="text"
          class="text-white"
          :placeholder="$t('navbar.search')"
          :aria-label="$t('navbar.search')"
          label
          nav-input
          disabled
          title="Not available yet"
        />
      </mdb-form-inline>
    </mdb-navbar-toggler>
  </mdb-navbar>
</template>

<script>
import {
  mdbNavbar,
  // mdbNavbarBrand,
  mdbNavbarToggler,
  mdbNavbarNav,
  mdbNavItem,
  // mdbDropdown,
  // mdbDropdownMenu,
  // mdbDropdownToggle,
  mdbInput,
  // mdbDropdownItem,
  mdbIcon,
  mdbFormInline
} from 'mdbvue'
export default {
  name: 'Navbar',
  components: {
    mdbNavbar,
    // mdbNavbarBrand,
    mdbNavbarToggler,
    mdbNavbarNav,
    mdbNavItem,
    // mdbDropdown,
    // mdbDropdownMenu,
    // mdbDropdownToggle,
    // mdbDropdownItem,
    mdbInput,
    mdbIcon,
    mdbFormInline
  }
}
</script>
