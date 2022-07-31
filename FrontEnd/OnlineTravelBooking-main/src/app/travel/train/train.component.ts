import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Train } from 'src/app/data/train';
import { TrainService } from 'src/app/services/train-service/train.service';

@Component({
  selector: 'app-train',
  templateUrl: './train.component.html',
  styleUrls: ['./train.component.css']
})
export class TrainComponent implements OnInit {

  public query = {
    flightSource: '',
    flightDestination: '',
    flightDepartureDate: '',
    flightArrivalDate: ''
  };


  
  userEmail = localStorage.getItem("userId");
  minDate: any;
  maxDate: any;

  trains: Train[] = [];
  filteredTrains: Train[] = [];
  dtOptions: DataTables.Settings = {};

  source:any;
  destination:any;
  airline:any;


  sourceInp:any;
  destinationInp:any;
  trainInp:any;
  startDateInp: any;
  endDateInp: any;

  filteredTrainsBySource:any;
  filteredTrainsByDestination:any;

  trainId: any;


  constructor(private router: Router, private trainService: TrainService) {
    this.sourceInp = "";
    this.destinationInp = "";
    this.trainInp = "";
    this.startDateInp = "";
    this.endDateInp = "";

    this.trainService.getAll().subscribe((trains: Train[]) => {
      this.trains = trains,
      this.filteredTrains = trains;
      console.log(trains);
    })
   }

  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date();
    this.maxDate = new Date(currentYear + 1, 11, 31);

    // child
    console.log("inside init flight");
    this.filter(null);
    // datatable
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
    };
  }

  filterTrains(){
    this.filteredTrains = (this.sourceInp) ? 
                            this.trains.filter((p:any)=>p.trainSource.toLowerCase().includes(this.sourceInp.toLowerCase()))
                            :this.trains;
    console.log("Started filtering....")
                            
    this.filteredTrains = (this.destinationInp) ? 
                            this.filteredTrains.filter((p:any)=>p.trainDestination.toLowerCase().includes(this.destinationInp.toLowerCase()))
                            :this.filteredTrains;
    
    this.filteredTrains = (this.trainInp) ? 
                            this.filteredTrains.filter((p:any)=>p.trainName.toLowerCase().includes(this.trainInp.toLowerCase()))
                            :this.filteredTrains;
  }

  
  filterTrainsAfterDate(start: any) {
    var dateFrom = this.startDateInp; 

    var d1 = dateFrom.split("/"); // mm/dd/yyyy
    var c = start.split("-"); // yyyy-mm-dd

    var from = new Date(d1[2], parseInt(d1[0])-1, d1[1]);  // -1 because months are from 0 to 11 "02/07/2013";
    // var to   = new Date(d2[2], parseInt(d2[1])-1, d2[0]);
    var check = new Date(c[0], parseInt(c[1])-1, c[2]);
    return (check >= from)
  }
  filterTrainsBeforeDate(start: any) {
    // var dateFrom = this.startDateInp; // startDateInp
    var dateTo = this.endDateInp;
    // var dateCheck = "02/07/2013";

    // var d1 = dateFrom.split("/");
    var d2 = dateTo.split("/");
    var c = start.split("/");

    // var from = new Date(d1[2], parseInt(d1[1])-1, d1[0]);  // -1 because months are from 0 to 11
    var to   = new Date(d2[2], parseInt(d2[1])-1, d2[0]);
    var check = new Date(c[0], parseInt(c[1])-1, c[2]);
    return (check <= to)
  }

  filter(query:any){
    console.log(query);
    this.filteredTrains = (query) ? 
                            this.trains.filter((p:any)=>p.airline.toLowerCase().includes(query.toLowerCase()))
                            :this.trains;
  }

  trainBySource(source:any){
    this.filteredTrains = (source) ? 
                            this.trains.filter((p:any)=>p.source.toLowerCase().includes(source.toLowerCase()))
                            :this.filteredTrains;
    this.source = source;
    this.filteredTrainsBySource=this.filteredTrains;
    if(!this.source)
      this.filteredTrains = this.filteredTrainsByDestination;
    this.resetSourceDestinationEmpty();
  }

  filterByDestination(destination:any){
    this.filteredTrains = (destination) ? 
                            this.filteredTrains.filter((p:any)=>p.destination.toLowerCase().includes(destination.toLowerCase()))
                            :this.filteredTrains;
    this.filteredTrainsByDestination = this.filteredTrains;
    this.destination = destination;
    if(!this.destination)
      this.filteredTrains = this.filteredTrainsBySource;
    this.resetSourceDestinationEmpty();
  }

  resetSourceDestinationEmpty(){
    if(!this.source && !this.destination)
      this.filteredTrains = this.trains;
  }

  getTrainsByQuery(){}
  
  navigateToBooking(trainId: any){
    this.router.navigate(['train/booking/'+trainId])
    .then(() => {
      window.location.reload();
    });
  }

}
