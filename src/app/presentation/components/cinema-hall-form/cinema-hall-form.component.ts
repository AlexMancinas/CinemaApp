import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ICinemaHall } from 'src/app/domain/models/cinema-hall.model';

@Component({
  selector: 'app-cinema-hall-form',
  templateUrl: './cinema-hall-form.component.html',
  styleUrls: ['./cinema-hall-form.component.scss'],
})
export class CinemaHallFormComponent implements OnInit {
  @Input() cinemaHallInitValue?: ICinemaHall;
  @Output() cinemaHallCurrentValue: EventEmitter<ICinemaHall> =
    new EventEmitter<ICinemaHall>();

  public cinemaHallForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    hallId: new FormControl(''),
    deleted: new FormControl(false),
    seatSet: new FormArray([], [Validators.required, Validators.minLength(2)]),
  });

  constructor(private storage: AngularFirestore) { }

  ngOnInit(): void {
    if (this.cinemaHallInitValue) {
      this.createFormsForPatch(this.cinemaHallInitValue);
    } else {
      this.cinemaHallForm.patchValue({ hallId: this.storage.createId() });
    }
  }

  public createFormsForPatch(hall: ICinemaHall): void {
    hall.seatSet.forEach((row, k) => {
      this.seatRows.push(this.rowConfigFormGroup);
      row.seats.forEach(() => {
        this.addSeats(k);
      });
    });
    this.cinemaHallForm.patchValue(hall);
  }

  public get seatRows(): FormArray {
    return this.cinemaHallForm.get('seatSet') as FormArray;
  }

  public deleteRow(index: number): void {
    this.seatRows.removeAt(index);
  }

  public addRow(): void {
    this.seatRows.push(this.rowConfigFormGroup);
  }

  private get rowConfigFormGroup(): FormGroup {
    return new FormGroup({
      name: new FormControl('', [Validators.required]),
      seats: new FormArray([], [Validators.required, Validators.minLength(1)]),
    });
  }

  private get seatFormGroup(): FormGroup {
    return new FormGroup({
      number: new FormControl(1, [Validators.required]),
      aparted: new FormControl(false),
      userId: new FormControl(''),
    });
  }


  public getSeats(rowIndex: number): FormArray {
    return (this.cinemaHallForm.get('seatSet') as FormArray).controls[
      rowIndex
    ].get('seats') as FormArray;
  }

  public addSeats(rowIndex: number): void {
    const mySeatsFormArray = this.getSeats(rowIndex);
    const newSeatFormArray = this.seatFormGroup;
    newSeatFormArray.patchValue({
      number: mySeatsFormArray.controls.length + 1,
    });
    mySeatsFormArray.push(newSeatFormArray);
  }

  public removeSeat(rowIndex: number, seatIndex: number): void {
    this.getSeats(rowIndex).removeAt(seatIndex);
  }


  public fakeSubmit(cinemaForm: FormGroup): void {
    this.cinemaHallCurrentValue.next(cinemaForm.value);
  }
}
