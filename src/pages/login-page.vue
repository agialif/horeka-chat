<template>
  <div class="row items-center bg-white">
    <div class="col-7 gt-sm">
      <div class="row justify-center items-end" style="height: 100vh">
        <div class="col-12 text-center">
          <q-img src="../assets/logo-horeka.svg" style="width: 500px" />
        </div>
        <p class="text-dark q-mb-md justify-center">
          2022 © Copyright by <b>PT. Supranusa Sindata</b>
        </p>
      </div>
    </div>
    <div class="col-6 col-md-4 col-xs-12">
      <div class="row justify-center items-center" style="height: 100vh">
        <q-form
          @submit.prevent="checkCredential"
          class="q-gutter-y-lg q-px-xl mt-20 full-width"
          ref="form"
        >
          <h2 class="text-center text-h4 text-bold q-mt-md">
            Hey, Welcome Back !
          </h2>
          <p class="text-center">
            Please enter your Username & Password to continue,<br />Make sure
            select options below before login.
          </p>
          <div class="flex flex-center">
            <q-btn-toggle
              v-model="loginAs"
              class="pill-toggle flex flex-center"
              no-caps
              rounded
              unelevated
              toggle-color="primary"
              color="white"
              text-color="primary"
              :options="[
                { label: 'Buyer', value: 1 },
                { label: 'Supplier', value: 2 },
              ]"
            />
          </div>

          <q-input
            placeholder="Username"
            square
            outlined
            class="q-pa-none"
            v-model="userName"
            dense
          >
            <template v-slot:append>
              <q-icon class="cursor-pointer" />
            </template>
          </q-input>
          <q-input
            placeholder="Password"
            square
            outlined
            class="q-pa-none"
            v-model="passWord"
            dense
          >
            <template v-slot:append>
              <q-icon class="cursor-pointer" />
            </template>
          </q-input>
          <q-btn
            unelevated
            class="full-width bg-primary text-white q-py-md"
            square
            type="submit"
          >
            <q-item-label class="text-subtitle1">Login</q-item-label></q-btn
          >
          <div class="self-end text-center lt-md text-white">
            Chat Engine Applications by <b>PT. Supranusa Sindata</b>
          </div>
        </q-form>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import api from "../api/fetch-data.api";
import { Socket } from "engine.io-client";
import io from "socket.io-client";
import { Cookies } from "quasar";

export default defineComponent({
  name: "LoginPage",

  setup() {
    // const socket = io("http://localhost:5000");
    //const credential = Cookies.get("userSessions");
    const $q = useQuasar();
    const routers = useRouter();
    const state = reactive({
      userName: "",
      passWord: "",
      loginAs: 1,
    });

    const checkCredential = () => {
      async function fetchData() {
        $q.loading.show();
        if (state.loginAs == 1) {
          const res = await api.doFetch("/users/login", {
            username: state.userName,
            password: state.passWord,
          });
          if (res == null) {
            $q.loading.hide();
            $q.notify({
              message: "Opps! Something wrong.",
              caption: "Username & Password are not match, please try again.",
              color: "negative",
              position: "top",
            });
          } else {
            $q.cookies.set("userSessions", res);
            $q.cookies.set("userType", 1);
            routers.push({ name: "chat-page" });
            $q.loading.hide();
            //socket.emit("online-user", credential.id);
          }
        } else if (state.loginAs == 2) {
          const res = await api.doFetch("/supplier/login", {
            name: state.userName,
            password: state.passWord,
          });
          if (res == null) {
            $q.loading.hide();
            $q.notify({
              message: "Opps! Something wrong.",
              caption: "Username & Password are not match, please try again.",
              color: "negative",
              position: "top",
            });
          } else {
            $q.cookies.set("userSessions", res);
            $q.cookies.set("userType", 2);
            routers.push({ name: "chat-page" });
            $q.loading.hide();
          }
        } else {
          $q.loading.hide();
          $q.notify({
            message: "Fatal Error",
            caption: "Something error while login processed, please try again.",
            color: "negative",
            position: "top",
          });
        }
      }
      fetchData();
    };

    return {
      ...toRefs(state),
      checkCredential,
    };
  },
});
</script>
<style lang="sass" scoped>
.pill-toggle
  border: 1px solid $primary
</style>
