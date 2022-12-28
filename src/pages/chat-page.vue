<template>
  <q-header class="bg-primary">
    <q-toolbar>
      <q-item class="q-pa-md">
        <q-item-section>
          <q-item-label overline class="text-white"
            >Room ID. {{ roomID }}</q-item-label
          >
          <q-item-label>{{ supplier }}</q-item-label>
          <q-item-label caption class="text-white">{{ datetime }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-toolbar-title></q-toolbar-title>
      <q-btn
        round
        flat
        icon="close"
        color="white"
        class="q-mr-md"
        :to="{ name: 'chat-page' }"
      ></q-btn>
    </q-toolbar>
  </q-header>
  <q-page>
    <div class="q-pa-md row">
      <div style="width: 100%">
        <div v-for="(chat, index) in dataMessage" :key="index">
          <q-chat-message
            class="q-px-lg"
            :name="chat.sender"
            avatar="https://cdn.quasar.dev/img/avatar4.jpg"
            :text="[chat.message]"
            :sent="chat.sent"
          />
        </div>
        <q-page-sticky position="bottom" :offset="[0, 0]">
          <div class="bg-white container fixed-bottom">
            <q-form @submit.prevent="sendMessage" style="width: 100%">
              <q-input
                outlined
                square
                class="q-pa-sm"
                placeholder="Enter message"
                v-model="message"
              />
            </q-form>
          </div>
        </q-page-sticky>
      </div>
    </div>
  </q-page>
</template>
<script>
import { defineComponent, reactive, toRefs, onMounted } from "vue";
import { useUserListStore } from "stores/user-list";
import { Cookies } from "quasar";
import { useRoute } from "vue-router";
import api from "../api/fetch-data.api";
import io from "socket.io-client";

export default defineComponent({
  setup() {
    const credential = Cookies.get("userSessions");
    const socket = io("http://localhost:5000");
    const store = useUserListStore();
    const routes = useRoute();
    const state = reactive({
      roomID: "",
      fromName: "",
      toName: "",
      datetime: "",
      supplier: "",
      message: "",
      dataMessage: [],
      dataUser: [],
    });

    onMounted(async () => {
      const dateNow = new Date();
      state.datetime = dateNow.toLocaleString("id-ID");
      state.roomID = routes.query.id;
      state.supplier = routes.query.supplier;
    });

    socket.on("connect", () => {
      // console.log(socket.id);
      getHistory();
    });

    socket.on("rcv-msg", (data) => {
      //getHistory();
      alert(data);
    });
    socket.emit("online-user", credential.id);
    // Chat Message
    const sendMessage = () => {
      async function fetchData() {
        const data = await api.doFetch("/message/addmessage", {
          from: credential.id,
          to: state.roomID,
          message: state.message,
        });
        socket.emit("msg-send", {
          from: credential.id,
          to: state.roomID,
          message: state.message,
        });
        state.message = "";
        getHistory();
      }
      fetchData();
    };

    const getHistory = () => {
      state.dataMessage = [];
      async function fetchMessage() {
        const data = await api.doFetch("/message/getmessage", {
          from: credential.id,
          to: state.roomID,
        });
        socket.on("rcv-msg", {
          from: credential.id,
          to: state.roomID,
        });
        console.log(credential.id);

        state.dataMessage = data.map((items) => ({
          sent: items.sender === credential.id ? false : true,
          ...items,
        }));

        console.log(state.dataMessage);
      }
      fetchMessage();
    };

    return {
      store,
      ...toRefs(state),
      getHistory,
      sendMessage,
    };
  },
});
</script>
