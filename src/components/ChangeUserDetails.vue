<template>
  <section class="modal modal2" :class="[hiddenClassUser, closeModalsUser]">
    <div class="modal__container" :class="closeModalsboxUser">
      <div class="modal__close" @click="closeModal">X</div>
      <div class="user__details">This are a user details page</div>

      <vee-form @submit="changeUsername" :validation-schema="schema_user"
        ><p>
          You want to change your username <b>{{ user.username }}</b> to:
        </p>
        <vee-field as="textarea" name="username" autocomplete="off"></vee-field>
        <ErrorMessage name="username" />

        <button type="submit">Submit</button>
      </vee-form>
    </div>
  </section>
</template>
<script>
import { mapStores, mapState, mapWritableState } from "pinia";
import useModalStore from "@/stores/modal";
import { useUserStore } from "@/stores/users";

export default {
  data() {
    const storeUser = useUserStore();
    return {
      schema_user: {
        username: "required|min:3",
      },
      storeUser,
    };
  },
  computed: {
    ...mapStores(useModalStore),
    ...mapState(useModalStore, [
      "hiddenClassUser",
      "closeModalsUser",
      "closeModalsboxUser",
    ]),
    ...mapWritableState(useModalStore, [
      "isOpenUser",
      "isOpenUserModal",
      "isOpenUserModalBox",
    ]),
  },
  props: {
    user: {
      type: Object,
      requiered: true,
    },
  },
  methods: {
    changeUsername(values, { resetForm }) {
      const username = {
        id: this.user.id,
        username: values.username,
        email: this.user.email,
        firstname: this.user.firstname,
        lastname: this.user.lastname,
        birthday: this.user.birthday,
        tos: this.user.birthday,
        userid: this.user.id,
      };
      this.storeUser.updateUser(username);
      resetForm();
      this.modalStore.isOpenUserModal = !this.modalStore.isOpenModal;
      this.modalStore.isOpenUserModalBox = !this.modalStore.isOpenUserModalBox;
      setTimeout(() => {
        this.modalStore.isOpenUser = !this.modalStore.isOpenUser;
        this.modalStore.isOpenUserModal = !this.modalStore.isOpenUserModal;
        this.modalStore.isOpenUserModalBox =
          !this.modalStore.isOpenUserModalBox;
      }, 800);
    },
    closeModal() {
      this.modalStore.isOpenUserModal = !this.modalStore.isOpenUserModal;
      this.modalStore.isOpenUserModalBox = !this.modalStore.isOpenUserModalBox;
      setTimeout(() => {
        this.modalStore.isOpenUser = !this.modalStore.isOpenUser;
        this.modalStore.isOpenUserModal = !this.modalStore.isOpenUserModal;
        this.modalStore.isOpenUserModalBox =
          !this.modalStore.isOpenUserModalBox;
      }, 800);
    },
  },
  mounted() {
    const modalRef = document.querySelector(".modal2");

    modalRef.addEventListener("click", (e) => {
      if (e.target.nodeName === "SECTION") {
        this.closeModal();
      }
    });
  },
};
</script>
