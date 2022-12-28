<template>
  <a
    :href="
      $router.resolve({
        name: 'view-chat',
        query: { id: _id, supplier: name },
      }).href
    "
  >
    <!-- <router-link
    class="text-textcolor"
    :to="{
      name: `History`,
      query: { roomID: roomID },
    }"
  > -->
    <q-item clickable tag="a" target="_blank">
      <q-item-section avatar v-if="userType == 1">
        <q-icon name="store" color="primary" />
      </q-item-section>
      <q-item-section avatar v-else>
        <q-icon name="account_circle" color="primary" />
      </q-item-section>

      <q-item-section>
        <!-- <q-item-label
          :class="status == 1 ? 'text-green' : 'text-grey'"
          overline
          >{{ status == 1 ? "Online" : "Offline" }}</q-item-label
        > -->
        <q-item-label class="text-bold">{{ name }}</q-item-label>
        <q-item-label caption lines="2">{{ _id }}</q-item-label>
        <q-item-label caption lines="2">{{ address }}</q-item-label>
      </q-item-section>

      <!-- <q-item-section side top>
        <q-badge
          v-if="counter != null"
          rounded
          :label="counter"
          class="q-mb-sm text-bold"
        />
        <q-item-label caption>{{ timestamp }}</q-item-label>
      </q-item-section> -->
    </q-item>
    <!-- </router-link> -->
  </a>
</template>

<script>
import { defineComponent } from "vue";
import { Cookies } from "quasar";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "chat-list",
  props: {
    _id: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    // roomID: {
    //   type: Number,
    //   required: true,
    // },

    // status: {
    //   type: Number,
    //   required: true,
    // },

    // title: {
    //   type: String,
    //   required: true,
    // },

    // caption: {
    //   type: String,
    //   default: "",
    // },

    // link: {
    //   type: String,
    //   default: "",
    // },

    // icon: {
    //   type: String,
    //   default: "",
    // },

    // counter: {
    //   type: Number,
    //   default: null,
    // },

    // timestamp: {
    //   type: String,
    //   default: "",
    // },
  },
  setup() {
    const userType = parseInt(Cookies.get("userType"));
    const router = useRouter();

    async function viewChat(val) {
      router.push({ path: "/view-chat", params: { roomId: val } });
    }

    return {
      userType,
      viewChat,
    };
  },
});
</script>
