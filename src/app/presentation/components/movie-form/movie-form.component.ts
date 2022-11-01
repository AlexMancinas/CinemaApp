import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IMovie } from 'src/app/domain/models/movie.model';
import { FirebaseUtilService } from 'src/app/infrastructure/services/utilities/firebase-util.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize, take, takeUntil } from 'rxjs';
import { PLACEHOLDER_PICTURE } from 'src/app/application/resources/external-files';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.scss'],
})
export class MovieFormComponent implements OnInit {
  @ViewChild('startDateInput', { static: true }) startDateInput!: ElementRef<HTMLInputElement>;
  @ViewChild('endDateInput', { static: true }) endDateInput!: ElementRef<HTMLInputElement>;
  @Input() movieInitValue?: IMovie;
  @Output() movieCurrentValue: EventEmitter<IMovie> =
    new EventEmitter<IMovie>();

  public MovieForms: FormGroup = new FormGroup({
    movieId: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    ticketCost: new FormControl('', [Validators.required, Validators.min(1)]),
    coverPicture: new FormControl(PLACEHOLDER_PICTURE, [Validators.required]),
    category: new FormControl('', [Validators.required]),
    duration: new FormControl('', [Validators.required, Validators.min(100)]),
    language: new FormControl('', [Validators.required]),
    genre: new FormControl('', [Validators.required]),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
    disabled: new FormControl(false),
  });
  constructor(
    private readonly firebaseUtils: FirebaseUtilService,
    private afStorage: AngularFireStorage
  ) { }

  ngOnInit(): void {
    this.patchInitValue();
  }

  public get coverPicture(): FormControl {
    return this.MovieForms.get('coverPicture') as FormControl;
  }

  private patchInitValue(): void {
    if (this.movieInitValue) {
      this.MovieForms.patchValue(this.movieInitValue);
      const { nativeElement: startDateNode } = this.startDateInput;
      const { nativeElement: endDateNode } = this.endDateInput;
      const startParsedValue = this.firebaseUtils.convertToDateTimeLocal(
        this.movieInitValue.startDate
      );
      const endParsedValue = this.firebaseUtils.convertToDateTimeLocal(
        this.movieInitValue.endDate
      );
      startDateNode.value = startParsedValue;
      endDateNode.value = endParsedValue;
    } else {
      this.MovieForms.patchValue({ movieId: this.firebaseUtils.createId() });
    }
  }

  public converDateFromInput($event: Event, fieldPath: string): void {
    const formControl = this.MovieForms.get(fieldPath) as FormControl;
    const { value } = $event.target as HTMLInputElement;
    console.log(value);
    const dateToConvert = new Date(value);
    const timestamp =
      this.firebaseUtils.generateTimestampFromDate(dateToConvert);
    formControl.patchValue(timestamp);
  }

  public uploadFile($event: Event): void {
    const { files } = $event.target as any;
    const [picture] = files;
    const uploadUrl: string = `/movie-covers/${this.MovieForms.value.movieId}/`;
    const fileUploadReference = this.afStorage.ref(uploadUrl);
    const uploadFileTask = this.afStorage.upload(uploadUrl, picture);
    uploadFileTask
      .snapshotChanges()
      .pipe(
        takeUntil(this.coverPicture.valueChanges),
        finalize(() => {
          fileUploadReference
            .getDownloadURL()
            .pipe(take(1))
            .subscribe((url) => this.coverPicture.setValue(url));
        })
      )
      .subscribe();
  }

  public fakeSubmit(movieForm: FormGroup): void {
    this.movieCurrentValue.next(movieForm.value);
  }
}
