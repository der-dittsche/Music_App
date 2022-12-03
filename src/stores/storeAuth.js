import { defineStore } from 'pinia';
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from './firebase';

export const useStoreAuth = defineStore('storeAuth', {
  state: () => {
    return {
      user: {},
    };
  },
  actions: {
    initUser() {
      onAuthStateChanged(auth, user => {
        if (user) {
          this.user.id = user.uid;
          this.user.email = user.email;
          this.router.push('/');
        } else {
          this.user = {};
          this.router.replace('/auth');
        }
      });
    },
    registerUser(credentials) {
      createUserWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password,
      )
        .then(userCredential => {
          const user = userCredential.user;
          console.log(user);
        })
        .catch(error => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    },
    loginUser(credentials) {
      signInWithEmailAndPassword(auth, credentials.email, credentials.password)
        .then(userCredential => {
          const user = userCredential.user;
          console.log(user);
        })
        .catch(error => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    },
    logoutUser() {
      signOut(auth)
        .then(() => {
          console.log('U are logout');
        })
        .catch(error => {
          console.log(error);
        });
    },
  },
  getters: {},
});
