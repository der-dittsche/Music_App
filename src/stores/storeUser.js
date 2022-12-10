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
  deleteDoc,
} from 'firebase/firestore';
import { auth } from './firebase';
import { db } from '@/stores/firebase';

let usersCollectionRef;
let songsCollectionRef;
let commentsCollectionRef;
let usersCollectionQuerry;
let songsCollectionQuerry;
let commentsCollectionQuerry;
let getUsersSnapshot = null;
let getSongsSnapshot = null;
let getCommentsSnapshot = null;

export const useStoreUser = defineStore('storeUser', {
  state: () => {
    return {
      users: [],
      songs: [],
      comments: [],
      user: {},
      usersLoaded: false,
      songsLoaded: false,
    };
  },
  actions: {
    initUser() {
      onAuthStateChanged(auth, user => {
        if (user) {
          this.user.id = user.uid;
          this.user.email = user.email;
          usersCollectionRef = collection(db, 'users', this.user.id, 'details');
          songsCollectionRef = collection(db, 'songs');
          commentsCollectionRef = collection(db, 'comments');
          usersCollectionQuerry = query(usersCollectionRef);
          songsCollectionQuerry = query(songsCollectionRef);
          this.getUsers();
          this.getSongs();
          this.getComments();
          this.router.push('/');
        } else {
          this.user = {};
          this.clearUsers();
          this.clearSongs();
          this.clearComments();
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
            birthday: doc.data().birthday,
            country: doc.data().country,
            city: doc.data().city,
            tos: doc.data().tos,
          };
          users.push(user);
        });

        this.users = users;
        this.usersLoaded = true;
      });
    },
    async getSongs() {
      this.songsLoaded = false;
      getSongsSnapshot = onSnapshot(songsCollectionQuerry, querySnapshot => {
        const songs = [];
        querySnapshot.forEach(doc => {
          const song = {
            id: doc.id,
            comment_count: doc.data().comment_count,
            display_name: doc.data().display_name,
            original_name: doc.data().original_name,
            modified_name: doc.data().modified_name,
            artist: doc.data().artist,
            genre: doc.data().genre,
            url: doc.data().url,
          };
          songs.push(song);
        });

        this.songs = songs;
        this.songsLoaded = true;
      });
    },
    async getComments() {
      this.commentsLoaded = false;
      commentsCollectionQuerry = query(commentsCollectionRef);
      getCommentsSnapshot = onSnapshot(
        commentsCollectionQuerry,
        querySnapshot => {
          const comments = [];
          querySnapshot.forEach(doc => {
            const comment = {
              id: doc.id,
              song: doc.data().song,
              comment: doc.data().comment,
              author: doc.data().author,
            };
            comments.push(comment);
          });

          this.comments = comments;
          this.commentsLoaded = true;
        },
      );
    },
    registerUser(credentials) {
      createUserWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password_confirmed,
        credentials.firstname,
        credentials.lastname,
        credentials.birthday,
        credentials.country,
        credentials.city,
        credentials.tos,
      )
        .then(() => {
          this.addUser(credentials);
        })
        .catch(error => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    },
    loginUser(credentials) {
      signInWithEmailAndPassword(auth, credentials.email, credentials.password)
        .then(() => {})
        .catch(error => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    },
    logoutUser() {
      signOut(auth)
        .then(() => {})
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
    async addSong(song) {
      usersCollectionRef = collection(db, 'songs');
      await addDoc(songsCollectionRef, {
        comment_count: song.comment_count,
        display_name: song.display_name,
        original_name: song.original_name,
        modified_name: song.modified_name,
        artist: song.artist,
        genre: song.genre,
        url: song.url,
      });
    },
    async addComment(comment) {
      commentsCollectionRef = collection(db, 'comments');
      await addDoc(commentsCollectionRef, {
        comment: comment.value,
        song: comment.songid,
        author: this.user.email,
      });
    },
    async deleteSongs(songtodelete) {
      usersCollectionRef = collection(db, 'songs');
      console.log(usersCollectionRef, songtodelete);
      await deleteDoc(doc(usersCollectionRef, songtodelete));
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
    clearSongs() {
      this.songs = [];
      if (getSongsSnapshot) getSongsSnapshot(); // unsubscribe from any listener
    },
    clearComments() {
      this.commentss = [];
      if (getCommentsSnapshot) getCommentsSnapshot(); // unsubscribe from any listener
    },
  },
  getters: {},
});
