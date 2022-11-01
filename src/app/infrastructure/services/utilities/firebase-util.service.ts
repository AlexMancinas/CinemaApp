import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import * as firebase from 'firebase/compat/app';
import { timestamp } from 'src/app/domain/models/utils/timestamp.interface';

@Injectable({
  providedIn: 'root',
})
export class FirebaseUtilService {
  public readonly sdkFirestoreApi = firebase.default.firestore;
  constructor(private readonly afs: AngularFirestore) {}

  public generateServerTimestamp() {
    return this.sdkFirestoreApi.FieldValue.serverTimestamp() as any;
  }
  public generateTimestampNow() {
    return this.sdkFirestoreApi.Timestamp.now() as any;
  }
  public generateTimestampFromDate(date: Date) {
    return this.sdkFirestoreApi.Timestamp.fromDate(date);
  }
  public createId(): string {
    return this.afs.createId();
  }

  public convertToDateTimeLocal(timestamp: timestamp): string {
    const { seconds } = timestamp;
    const millis: number = seconds * 1000;
    const date = new Date(millis);
    return `${date.getFullYear()}-${this.addPadToString(
      date.getMonth() + 1
    )}-${this.addPadToString(date.getDate())}T${this.addPadToString(
      date.getHours()
    )}:${this.addPadToString(date.getSeconds())}`;
  }

  private addPadToString(value: number): string {
    const stringedValue = `${value}`;
    return value > 9 ? stringedValue : stringedValue.padStart(2, '0');
  }
}
