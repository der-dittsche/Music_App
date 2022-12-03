import { defineStore } from 'pinia';
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import {
  collection,
  onSnapshot,
  addDoc,
  doc,
  query,
  updateDoc,
} from 'firebase/firestore';
import { auth } from './firebase';
import { db } from '@/stores/firebase';

let usersCollectionRef;
let usersCollectionQuerry;
let getUsersSnapshot = null;

export const useStoreUser = defineStore('storeUser', {
  state: () => {
    return {
      users: [],
      user: {},
      usersLoaded: false,
    };
  },
  actions: {
    initUser() {
      onAuthStateChanged(auth, user => {
        if (user) {
          this.user.id = user.uid;
          this.user.email = user.email;
          usersCollectionRef = collection(db, 'users', this.user.id, 'details');
          usersCollectionQuerry = query(usersCollectionRef);
          this.getUsers();
          this.router.push('/');
        } else {
          this.user = {};
          this.clearUsers();
          this.router.replace('/auth');
        }
      });
    },
    async getUsers() {
      this.usersLoaded = false;
      getUsersSnapshot = onSnapshot(usersCollectionQuerry, querySnapshot => {
        const users = [];
        querySnapshot.forEach(doc => {
          const user = {
            id: doc.id,
            firstname: doc.data().firstname,
            lastname: doc.data().lastname,
            email: doc.data().email,
            username: doc.data().username,
          };
          users.push(user);
        });

        this.users = users;
        this.usersLoaded = true;
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
          this.addUser(credentials);
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
    async addUser(credentials) {
      usersCollectionRef = collection(db, 'users', this.user.id, 'details');
      await addDoc(usersCollectionRef, {
        email: credentials.email,
      });
    },
    async updateUser(infos) {
      usersCollectionRef = collection(db, 'users', this.user.id, 'details');
      await updateDoc(doc(usersCollectionRef, infos.id), {
        email: infos.email,
      });
      console.log(infos.id, infos.email);
    },
    clearUsers() {
      this.users = [];
      if (getUsersSnapshot) getUsersSnapshot(); // unsubscribe from any listener
    },
  },
  getters: {},
});
