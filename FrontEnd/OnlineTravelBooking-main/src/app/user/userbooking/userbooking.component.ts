import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { Subject } from 'rxjs';
import { Bookingdata } from 'src/app/data/bookingdata';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TrainBooking } from 'src/app/data/TrainBooking';
import { TrainService } from 'src/app/services/train-service/train.service';

@Component({
  selector: 'app-userbooking',
  templateUrl: './userbooking.component.html',
  styleUrls: ['./userbooking.component.css']
})
export class UserbookingComponent implements OnInit {


  bookingDetails: Bookingdata[] = [];
  trainBookingDetails: TrainBooking[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private userService: UserService, private router: Router, private _snack: MatSnackBar, private trainService: TrainService) {

    this.userService.getBookingsByUserId(localStorage.getItem("userId")).subscribe(
      (data: Bookingdata[]) =>{
        if (data === null) {
          console.log("Empty data");
          this.bookingDetails = [];
        } else {
         this.bookingDetails = data ;
         console.log(data);
        }
     })
    this.trainService.getTrainBookingByUserId(localStorage.getItem("userId")).subscribe(
      (data: TrainBooking[]) => {
        if (data === null) {
          this.trainBookingDetails = [];
        } else {
          this.trainBookingDetails = data;
        }
      }
    )

   }

  ngOnInit(): void {
   
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
    };
  }

  cancelBooking(id: any) {
    if(confirm("Are you sure to delete ")) {      
      console.log("Componet get's called....");
      this.userService.cancelBooking(id).subscribe();
      this._snack.open(
        "Your Request Processed Successfully..., Amount will be refund to your account within 5 working days",
        'ok',
        {
          duration: 3000,
        }
      );
      window.location.reload();
    }

  }

  cancelTrainBooking(id: any) {
    if(confirm("Are you sure to delete ")) {

      this.trainService.cancelBooking(id).subscribe();
      this._snack.open(
          "Your Request Processed Successfully..., Amount will be refund to your account within 5 working days",
          'ok',
          {
            duration: 3000,
          }
        )
      window.location.reload();
    }
  }

}
