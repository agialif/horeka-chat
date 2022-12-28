<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-primary">
      <q-toolbar>
        <q-item class="q-pa-md">
          <q-item-section>
            <q-item-label overline class="text-white">Welcome,</q-item-label>
            <q-item-label>{{ userName }}</q-item-label>
            <q-item-label caption class="text-white">{{
              datetime
            }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-toolbar-title></q-toolbar-title>
        <q-btn
          flat
          rounded
          icon="logout"
          color="primary"
          size="sm"
          class="text-white q-mr-lg q-py-sm"
          label="Logout"
          @click="logOut"
        />
      </q-toolbar>
    </q-header>
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered :width="400">
      <q-list class="q-px-lg q-mt-xl">
        <q-input rounded outlined placeholder="Search" class="q-mb-md">
          <template v-slot:prepend>
            <q-icon name="search" class="q-ml-md" />
          </template>
        </q-input>
        <div v-if="dataUser.length > 0">
          <ChatList v-for="link in dataUser" :key="link._id" v-bind="link" />
        </div>
        <div class="flex flex-center" v-else>
          <div class="grid justify-center q-mt-xl q-pt-xl">
            <div class="col"></div>
            <div class="col text-center">
              <q-item-label>No chat room available.</q-item-label>
            </div>
          </div>
        </div>
      </q-list>
    </q-drawer>

    <q-page-container> <router-view /></q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, reactive, toRefs, ref, onMounted } from "vue";
import { Cookies } from "quasar";
import { useRouter } from "vue-router";
import ChatList from "src/components/chat-list.vue";
import api from "../api/fetch-data.api";

// const linksList = [
//   {
//     roomID: 11231233333111232,
//     status: 1,
//     title: "PT. Sukanda Jaya",
//     caption:
//       "Hai, Apakah Barang ready dan bisa dikirimkan besok Pagi ? Mohon konfirmasinya, terima kasih.",
//     icon: "account_circle",
//     timestamp: "Just now",
//     counter: null,
//   },
// ];

export default defineComponent({
  name: "MainLayout",

  components: {
    ChatList,
  },

  setup() {
    const credential = Cookies.get("userType");
    const userType = parseInt(Cookies.get("userType"));
    const routers = useRouter();
    const state = reactive({
      dataUser: [],
      userName: "",
      datetime: "",
    });

    const leftDrawerOpen = ref(false);

    onMounted(async () => {
      if (userType == 1) {
        getSupplierList();
      } else {
        getUserList();
      }
      const dateNow = new Date();
      state.datetime = dateNow.toLocaleString("id-ID");
      state.userName = credential.id;
    });

    async function getSupplierList() {
      const user = await api.getUser("/supplier/list");
      state.dataUser = user;
    }

    async function getUserList() {
      const user = await api.getUser("/users/list");
      state.dataUser = user;
    }

    async function logOut() {
      if (credential == null) {
        routers.push({ path: "/login" });
      } else {
        Cookies.remove("userSessions");
        routers.push({ path: "/login" });
      }
    }

    return {
      ...toRefs(state),
      logOut,
      getSupplierList,
      getUserList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
