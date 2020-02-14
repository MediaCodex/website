<template>
  <mdb-navbar color="elegant" dark class="justify-content-between">
    <mdb-navbar-brand href="#">MediaCodex</mdb-navbar-brand>
    <mdb-navbar-toggler>
      <routes />
      <mdb-navbar-nav right>
        <search />
        <profile />
      </mdb-navbar-nav>
    </mdb-navbar-toggler>
  </mdb-navbar>
</template>

<script>
import {
  mdbNavbar,
  mdbNavbarBrand,
  mdbNavbarToggler,
  mdbNavbarNav
} from 'mdbvue'
import Search from './search'
import Routes from './routes'
import Profile from './profile'
export default {
  name: 'Navbar',
  components: {
    Search,
    Routes,
    Profile,
    mdbNavbar,
    mdbNavbarBrand,
    mdbNavbarToggler,
    mdbNavbarNav
  }
}
</script>
