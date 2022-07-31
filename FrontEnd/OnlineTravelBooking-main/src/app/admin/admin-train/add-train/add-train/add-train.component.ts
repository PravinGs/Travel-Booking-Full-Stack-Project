import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TrainService } from 'src/app/services/train-service/train.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-train',
  templateUrl: './add-train.component.html',
  styleUrls: ['./add-train.component.css']
})
export class AddTrainComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  reactiveForm : FormGroup;
  
  public train = {
    // flightId: '',
    trainName: '',
    trainSource: '',  
    trainDepartureDate: '',
    trainDestination: '', 
    trainArrivalDate: '',
    trainFare: '',
    trainAvailability: '',
    trainTotalSeats: '',
    trainBookedSeats: '',
    trainLogoUrl: ''
  }
  

  constructor(private trainService: TrainService, private formBuilder:FormBuilder, private router: Router) { 
    this.reactiveForm = this.formBuilder.group({
      trainName: new FormControl(null, [Validators.required]),
      trainSource: new FormControl(null, [Validators.required]),
      trainDestination: new FormControl(null, [Validators.required]),
      trainDepartureDate: new FormControl(null, [Validators.required]),
      trainArrivalDate: new FormControl(null, [Validators.required]),
      trainFare: new FormControl(null, [Validators.required]),
      trainAvailability: new FormControl(null, [Validators.required]),
      trainTotalSeats: new FormControl(null, [Validators.required]),
      trainBookedSeats: new FormControl(null, [Validators.required]),
      trainLogoUrl: new FormControl(null, [Validators.required])
    }) 
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
    };
  }

  get f() {
    return this.reactiveForm.controls;
  }

  onFormSubmit() {
    if (this.reactiveForm.invalid) {
      console.log("Invalid");
      return;
    }
    console.log(this.train);
    this.train.trainName=this.reactiveForm.value.trainName;
    this.train.trainSource=this.reactiveForm.value.trainSource;
    this.train.trainDestination=this.reactiveForm.value.trainDestination; 
    this.train.trainDepartureDate=this.reactiveForm.value.trainDepartureDate; 
    this.train.trainArrivalDate=this.reactiveForm.value.trainArrivalDate; 
    this.train.trainFare=this.reactiveForm.value.trainFare; 
    this.train.trainAvailability=this.reactiveForm.value.trainAvailability; 
    this.train.trainTotalSeats=this.reactiveForm.value.trainTotalSeats; 
    this.train.trainBookedSeats=this.reactiveForm.value.trainBookedSeats; 
    this.train.trainLogoUrl=this.reactiveForm.value.trainLogoUrl; 
    
    console.log("Data is Valid");
    this.trainService.add(this.train).subscribe();
    Swal.fire(`Train Added.`);
    this.router.navigate(['/admin/train']);
    window.location.reload();
  
  }

}
