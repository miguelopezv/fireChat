import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Message } from '../interfaces/message.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private itemsCollection: AngularFirestoreCollection<Message>;
  items: Observable<Message[]>;

  constructor(private afs: AngularFirestore) {}

  loadMessages(): Observable<Message[]> {
    this.itemsCollection = this.afs.collection<Message>('chats', ref =>
      ref.orderBy('date', 'desc').limit(8)
    );
    return this.itemsCollection.valueChanges();
  }

  addMessage(chat: Partial<Message>) {
    chat.name = 'demo';
    chat.date = new Date().getTime();

    return this.itemsCollection.add(chat as Message);
  }
}
