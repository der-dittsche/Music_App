import { defineStore } from "pinia";

export default defineStore("modal", {
  state: () => ({
    isOpen: false,
    isOpenModal: true,
    isOpenModalBox: true,
    isOpenUser: false,
    isOpenUserModal: true,
    isOpenUserModalBox: true,
    isOpenVol: false,
  }),
  getters: {
    hiddenClass(state) {
      return !state.isOpen ? "hidden" : "";
    },
    closeModals(state) {
      return !state.isOpenModal ? "closeModals" : "";
    },
    closeModalsbox(state) {
      return !state.isOpenModalBox ? "modal__container_close" : "";
    },
    hiddenClassUser(state) {
      return !state.isOpenUser ? "hidden" : "";
    },
    closeModalsUser(state) {
      return !state.isOpenUserModal ? "closeModals" : "";
    },
    closeModalsboxUser(state) {
      return !state.isOpenUserModalBox ? "modal__container_close" : "";
    },
    hiddenClassVol(state) {
      return !state.isOpenVol ? "hidden" : "";
    },
  },
});
