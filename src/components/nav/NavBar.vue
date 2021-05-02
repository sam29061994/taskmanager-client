   
<template>
  <div id="nav">
    <router-link
      class="links"
      v-for="link in links"
      :key="link.id"
      :to="link.path"
      >{{ link.name }}</router-link
    >
    <Logout v-if="authorized" />
  </div>
</template>


<script>
import { defineComponent } from 'vue';
import Logout from '@/components/auth/Logout.vue';
export default defineComponent({
  name: 'nav-bar',
  components: {
    Logout,
  },
  props: {
    links: {
      type: [Object],
      required: true,
    },
  },
  data() {
    return {
      authorized: false,
    };
  },
  mounted() {
    this.authorized = !!localStorage.getItem('access_token');
    this.emitter.on('user-authorized', (authorized) => {
      this.authorized = authorized;
    });
  },
});
</script>
<style scoped lang="scss">
#nav {
  padding: 30px;
  display: flex;
  align-items: center;

  a {
    font-weight: bold;
    color: #2c3e50;
    margin: 0 10px;

    &.router-link-exact-active {
      color: #42b983;
    }
  }

  .links {
    font-size: 30px;

    @media screen and (max-width: 600px) {
      font-size: 20px;
    }
  }
}
</style>
