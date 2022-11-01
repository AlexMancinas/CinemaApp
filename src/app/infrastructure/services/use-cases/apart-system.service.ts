import { Injectable } from '@angular/core';
import { FirebaseUtilService } from '../utilities/firebase-util.service';
import firebase from 'firebase/compat/app';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { IProjection } from 'src/app/domain/models/projection.model';
import { ISeatRowConfig } from 'src/app/domain/models/seat-config.model';
import { ITicket } from 'src/app/domain/models/ticket.model';
@Injectable({
  providedIn: 'root'
})
export class ApartSystemService {
  private readonly firestoreSdk: firebase.firestore.Firestore;
  constructor(
    private readonly afs: AngularFirestore,
    private readonly firebaseUtilsService: FirebaseUtilService,
  ) {
    this.firestoreSdk = this.firebaseUtilsService.sdkFirestoreApi();
  }

  public async createSeatApartTransaction(ticketToCreate: ITicket): Promise<void> {
    const { hallId, projectionId, seats: localRows } = ticketToCreate;
    const projectionReference: AngularFirestoreDocument<IProjection> =
      this.afs.doc<IProjection>(`cinema-halls/${hallId}/projections/${projectionId}`);
    const newTicketReference: AngularFirestoreDocument<ITicket> = this.afs.doc<ITicket>(`/tickets/${ticketToCreate.ticketId}`);
    return this.firestoreSdk.runTransaction(async (transactionContext) => {
      try {
        const projectionDocument = await transactionContext.get(projectionReference.ref);
        const projectionServerSnapshot = { ...projectionDocument.data(), projectionId: projectionDocument.id } as IProjection;
        const { seatSet: seatSetServerSnapshot } = projectionServerSnapshot;
        const errorIncidences: Array<string> = [];
        const localRowsToCheck = localRows.map((localRow) => localRow.name);
        const rowsToCheck: Array<ISeatRowConfig> = seatSetServerSnapshot.filter(({ name }) => localRowsToCheck.includes(name));
        for (let k = 0; k < rowsToCheck.length; k++) {
          const serverRow = rowsToCheck[k];
          const localRow = localRows.find(({ name }) => name === serverRow.name)!;
          localRow.seats.forEach(({ number: localNumber }) => {
            const matchedServerSeat = serverRow.seats.find(
              ({ number: serverNumber }) => (serverNumber === localNumber)
            );
            if (matchedServerSeat) {
              if (matchedServerSeat.aparted) {
                errorIncidences.push(`the seat ${localRow.name}-${localNumber} has been already aparted `);
              }
            } else {
              errorIncidences.push(`${localNumber} seat does not exist anymore`);
            }
          });
        }
        if (errorIncidences.length >= 1) {
          const errorMessage = errorIncidences.join(',');
          throw new Error(errorMessage);
        }
        else {
          this.composeRowsObject(projectionServerSnapshot.seatSet, localRows);
          transactionContext.set<IProjection>(
            projectionReference.ref,
            projectionServerSnapshot,
            { merge: true }
          );
          transactionContext.set<ITicket>(newTicketReference.ref,ticketToCreate);
        }
      } catch (error) {
        throw error;
      }
    });
  }

  private composeRowsObject(serverRowsSnapshot: ISeatRowConfig[], localRowsSnapshot: ISeatRowConfig[]): void {
    localRowsSnapshot.forEach((currentRow) => {
      const currentServerRow = serverRowsSnapshot.find(({ name }) => name === currentRow.name);
      if (!currentServerRow) {
        throw new Error('The row doesnt exist anymore ' + currentRow.name);
      }
      const currentServerRowIndex = serverRowsSnapshot.indexOf(currentServerRow);
      currentRow.seats.forEach((seat) => {
        const currentServerSeat = currentServerRow.seats.find(({ number }) => number === seat.number);
        if (!currentServerSeat) {
          throw new Error(`The seat ${seat.number} doesn't exist any more`);
        }
        const currentServerSeatIndex = currentServerRow.seats.indexOf(currentServerSeat);
        serverRowsSnapshot[currentServerRowIndex].seats[currentServerSeatIndex] = seat;
      });
    });
  }


}
