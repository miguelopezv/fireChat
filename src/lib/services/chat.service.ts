import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

import { Observable } from 'rxjs';
import { Message } from '../interfaces/message.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private itemsCollection: AngularFirestoreCollection<Message>;
  items: Observable<Message[]>;
  user: any = {};

  constructor(private afs: AngularFirestore, public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user.name = user.displayName;
        this.user.uid = user.uid;
        this.user.avatar = user.photoURL;
      }
    });
  }

  login(service: string) {
    let authProvider:
      | auth.GithubAuthProvider
      | auth.TwitterAuthProvider
      | auth.FacebookAuthProvider;
    switch (service) {
      case 'google':
        authProvider = new auth.GoogleAuthProvider();
        break;
      case 'twitter':
        authProvider = new auth.TwitterAuthProvider();
        break;
      case 'facebook':
        authProvider = new auth.FacebookAuthProvider();
        break;
      default:
        break;
    }
    this.afAuth.auth.signInWithPopup(authProvider);
  }

  logout() {
    this.user = {};
    this.afAuth.auth.signOut();
  }

  loadMessages(): Observable<Message[]> {
    this.itemsCollection = this.afs.collection<Message>('chats', ref =>
      ref.orderBy('date', 'desc').limit(8)
    );
    return this.itemsCollection.valueChanges();
  }

  addMessage(chat: Partial<Message>) {
    chat.name = this.user.name;
    chat.date = new Date().getTime();
    chat.uid = this.user.uid;

    return this.itemsCollection.add(chat as Message);
  }
}
