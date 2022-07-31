import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Train } from 'src/app/data/train';
import { BookingService } from 'src/app/services/booking-service/booking.service';
import { TrainService } from 'src/app/services/train-service/train.service';

@Component({
  selector: 'app-train-booking',
  templateUrl: './train-booking.component.html',
  styleUrls: ['./train-booking.component.css']
})
export class TrainBookingComponent implements OnInit {

  train: Train = new Train();
  seatsBooked: number = 1;

  bookingModel = {
    userEmail: '',
    id: '',
    seats: 1,
  };

  trainId: any;
  rzp1:any;

  options = {
    "key": "rzp_test_CYteNBuo9jA2t3", // Enter the Key ID generated from the Dashboard
    "amount": "", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "INR",
    "name": "Make My Trip",
    "description": "Test Transaction",
    "image": "https://example.com/your_logo",
    "order_id": "", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
    "prefill": {
        "name": "Freddie Kruger",
        "email": "alatirahad268@gmail.com",
        "contact": "7980300629"
    },
    "notes": {
        "address": "Razorpay Corporate Office"
    },
    "theme": {
        "color": "#3399cc"
    }
  };

  constructor(private bookingService: BookingService,private trainService: TrainService, private router: Router,  private route: ActivatedRoute, private snackBar: MatSnackBar) {
    this.trainId = this.route.snapshot.params['trainId'];
    this.trainService.getById(this.trainId).subscribe(train => this.train = train)
   }
  ngOnInit(): void {
  }

  confirmBooking() {
    if (this.seatsBooked > (this.train.trainTotalSeats - this.train.trainBookedSeats)) {
      this.snackBar.open("Only" + (this.train.trainTotalSeats - this.train.trainBookedSeats) + " Only available", "ok", {duration: 3000})
    } else if (this.seatsBooked <= 0){
      this.snackBar.open(
        "Please select one seat or more ",
        'ok',
        {
          duration: 3000,
        }
      );
    } else {
      if (localStorage.getItem("isEnabled") === "true") {
        let email = localStorage.getItem("userEmail")
        if (email === null) {
          this.snackBar.open(
            "Your Email is invalid ",
            'ok',
            {
              duration: 3000,
            }
          );
        }  else {
          this.bookingModel['userEmail'] = email;
        }
        this.bookingModel['id'] = this.trainId;
        this.bookingModel['seats'] = this.seatsBooked;
        this.bookingService.trainBooking(this.bookingModel).subscribe(
          (data: any) => {
            if(data!=null){
              this.options.amount = data.amount;
              this.options.order_id = data.id;
              this.rzp1 = new this.bookingService.nativeWindow.Razorpay(this.options);
              this.rzp1.open();
              this.router.navigate(['/travel/train'])
              }
          }
        )
      } else {
        this.snackBar.open(
          "You are not authenticated to book tickets",
          'ok',
          {
            duration: 3000,
          }
        );
      }
    }
  }

}
