import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { Flight } from 'src/app/data/flight';
import { FlightService } from 'src/app/services/flight-service/flight.service';

@Component({
  selector: 'app-update-flight',
  templateUrl: './update-flight.component.html',
  styleUrls: ['./update-flight.component.css']
})
export class UpdateFlightComponent implements OnInit {
  
  // public flight = {
  //   flightName: '',
  //   flightSource: '',
  //   flightDepartureDate: '',
  //   flightDestination: '', 
  //   flightArrivalDate: '',
  //   flightFare: '',
  //   flightAvailability: '',
  //   flightTotalSeats: '',
  //   flightBookedSeats: '',
  //   flightLogoUrl: ''
  // }
  flight: Flight = new Flight();
  id: any;
  reactiveForm : FormGroup;
  source = '';

  constructor(private flightService:FlightService, private formBuilder:FormBuilder, private _snackBar:MatSnackBar, private router: Router) { 
    console.log("Update FLight")
    this.flightService.id.asObservable().subscribe(data => this.id = data);
    console.log("Flight Id from update-flight : " + this.id)
   
    console.log(" Flight from update flight : " + this.flight.flightName)
    this.reactiveForm = this.formBuilder.group({
      flightId: new FormControl('', [Validators.required]),
      flightName: new FormControl('', [Validators.required]),
      flightSource: new FormControl('', [Validators.required]),
      flightDestination: new FormControl('', [Validators.required]),
      flightDepartureDate: new FormControl('', [Validators.required]),
      flightArrivalDate: new FormControl('', [Validators.required]),
      flightFare: new FormControl('', [Validators.required]),
      flightAvailability: new FormControl('', [Validators.required]),
      flightTotalSeats: new FormControl('', [Validators.required]),
      flightBookedSeats: new FormControl('', [Validators.required]),
      flightLogoUrl: new FormControl('', [Validators.required])
    })
    console.log(this.flight)
    this.flightService.getFlightById(this.id).subscribe((data: Flight)=> {
      this.flight = data;
      this.reactiveForm.setValue(data)
    });
    
  }

  ngOnInit(): void {
  }
  
  get f() {
    return this.reactiveForm.controls;
  }
  onFormSubmit(){
    this.flight.flightName = this.reactiveForm.value.flightName
    this.flight.flightSource = this.reactiveForm.value.flightSource
    this.flight.flightDestination = this.reactiveForm.value.flightDestination
    this.flight.flightDepartureDate = this.reactiveForm.value.flightDepartureDate
    this.flight.flightArrivalDate = this.reactiveForm.value.flightArrivalDate
    this.flight.flightFare = this.reactiveForm.value.flightFare
    this.flight.flightAvailability = this.reactiveForm.value.flightAvailability
    this.flight.flightLogoUrl = this.reactiveForm.value.flightLogoUrl
    this.flight.flightBookedSeats = this.reactiveForm.value.flightBookedSeats
    this.flight.flightTotalSeats = this.reactiveForm.value.flightTotalSeats
    console.log(this.flight)
    this.flightService.update(this.id, this.flight).subscribe((data) => {
      if (data === null) {
        this._snackBar.open("Updation failed", "ok", {
          duration: 3000
        })
      } else {
        console.log(data);
        this.router.navigate(['/admin/flight'])
      }
    });

    // window.location.reload()
  }

}
