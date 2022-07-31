import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Train } from 'src/app/data/train';
import { TrainService } from 'src/app/services/train-service/train.service';

@Component({
  selector: 'app-update-train',
  templateUrl: './update-train.component.html',
  styleUrls: ['./update-train.component.css']
})
export class UpdateTrainComponent implements OnInit {


  train: Train = new Train();
  id: any;
  reactiveForm : FormGroup;
  constructor(private trainService: TrainService, private formBuilder:FormBuilder, private _snackBar:MatSnackBar, private router: Router, private route: ActivatedRoute) { 
    this.id = this.route.snapshot.params['trainId']

    // form building
    this.reactiveForm = this.formBuilder.group({
      trainId: new FormControl('', [Validators.required]),
      trainName: new FormControl('', [Validators.required]),
      trainSource: new FormControl('', [Validators.required]),
      trainDestination: new FormControl('', [Validators.required]),
      trainDepartureDate: new FormControl('', [Validators.required]),
      trainArrivalDate: new FormControl('', [Validators.required]),
      trainFare: new FormControl('', [Validators.required]),
      trainAvailability: new FormControl('', [Validators.required]),
      trainTotalSeats: new FormControl('', [Validators.required]),
      trainBookedSeats: new FormControl('', [Validators.required]),
      trainLogoUrl: new FormControl('', [Validators.required])
    })

    this.trainService.getById(this.id).subscribe(
      (data) => {
        this.train = data;
        this.reactiveForm.setValue(data)
        console.log(data)
      }
    )
  }

  ngOnInit(): void {
  }
  get f() {
    return this.reactiveForm.controls;
  }

  onFormSubmit(){
    this.train.trainName = this.reactiveForm.value.trainName
    this.train.trainSource = this.reactiveForm.value.trainSource
    this.train.trainDestination = this.reactiveForm.value.trainDestination
    this.train.trainDepartureDate = this.reactiveForm.value.trainDepartureDate
    this.train.trainArrivalDate = this.reactiveForm.value.trainArrivalDate
    this.train.trainFare = this.reactiveForm.value.trainFare
    this.train.trainAvailability = this.reactiveForm.value.trainAvailability
    this.train.trainLogoUrl = this.reactiveForm.value.trainLogoUrl
    this.train.trainBookedSeats = this.reactiveForm.value.trainBookedSeats
    this.train.trainTotalSeats = this.reactiveForm.value.trainTotalSeats
    console.log(this.train)
    this.trainService.update(this.id, this.train).subscribe((data) => {
      if (data === null) {
        this._snackBar.open("Updation failed", "ok", {
          duration: 3000
        })
      } else {
        console.log(data);
        this.router.navigate(['/admin/train'])
      }
    });

    // window.location.reload()
  }

}
