import { defineStore } from "pinia";

export const useUserListStore = defineStore("userList", {
  state: () => ({
    dataUser: [],
  }),
  getters: {},
  actions: {
    addUser(data) {
      // for (const x of data) {
      //   this.dataUser.push({
      //     roomID: "bala-room",
      //     status: 1,
      //     title: "ADMIN HOREKA",
      //     caption: "",
      //     icon: "account_circle",
      //     timestamp: "Just now",
      //     counter: 3,
      //   });
      // }
    },
  },
});
