<template>
  <section class="modal modal1" :class="[hiddenClass, closeModals]">
    <div class="modal__container" :class="closeModalsbox">
      <div class="modal__close" @click="closeModal">X</div>
      <div class="auth__tab">
        <div
          class="auth__tab-item"
          :class="{ is_active: !register }"
          @click.prevent="register = false"
        >
          <h2>Login</h2>
        </div>
        <div
          class="auth__tab-item"
          :class="{ is_active: register }"
          @click.prevent="register = true"
        >
          <h2>Register</h2>
        </div>
      </div>
      <div v-if="!register">
        <LoginUser />
      </div>
      <div v-if="register">
        <RegisterUser />
      </div>
    </div>
  </section>
</template>

<script>
import { ref } from "vue";
import LoginUser from "@/components/authview/userLogin.vue";
import RegisterUser from "@/components/authview/userRegistration.vue";
import { mapStores, mapState, mapWritableState } from "pinia";
import useModalStore from "@/stores/modal";

export default {
  data() {
    const register = ref(false);
    return {
      register,
    };
  },
  components: {
    LoginUser,
    RegisterUser,
  },
  computed: {
    ...mapStores(useModalStore),
    ...mapState(useModalStore, [
      "hiddenClass",
      "closeModals",
      "closeModalsbox",
    ]),
    ...mapWritableState(useModalStore, [
      "isOpen",
      "isOpenModal",
      "isOpenModalBox",
    ]),
  },
  methods: {
    closeModal() {
      this.modalStore.isOpenModal = !this.modalStore.isOpenModal;
      this.modalStore.isOpenModalBox = !this.modalStore.isOpenModalBox;
      setTimeout(() => {
        this.modalStore.isOpen = !this.modalStore.isOpen;
        this.modalStore.isOpenModal = !this.modalStore.isOpenModal;
        this.modalStore.isOpenModalBox = !this.modalStore.isOpenModalBox;
      }, 800);
    },
  },
  mounted() {
    const modalRef = document.querySelector(".modal1");

    modalRef.addEventListener("click", (e) => {
      if (e.target.nodeName === "SECTION") {
        this.closeModal();
      }
    });
  },
};
</script>
