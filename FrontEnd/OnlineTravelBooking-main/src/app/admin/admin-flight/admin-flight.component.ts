import { Flight } from 'src/app/data/flight';
import { Component, OnInit } from '@angular/core';
import { FlightService } from 'src/app/services/flight-service/flight.service';
import { AdminService } from 'src/app/services/admin-service/admin.service';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import { Subject } from 'rxjs';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-flight',
  templateUrl: './admin-flight.component.html',
  styleUrls: ['./admin-flight.component.css']
})
export class AdminFlightComponent implements OnInit {


  flights:Flight[]=[];
  filteredFlights:Flight[]=[];
  sourceInp:any;
  destinationInp:any;
  airlineInp:any;
  startDateInp: any;
  endDateInp: any;
  minDate: any;
  maxDate: any;
  source:any;
  destination:any;
  airline:any;
  filteredFilghtsBySource:any;
  filteredFlightsByDestination:any;
  dtOptions: DataTables.Settings = {};

  public query = {
    flightSource: '',
    flightDestination: '',
    flightDepartureDate: '',
    flightArrivalDate: ''
  };
  // dataSource = new MatTableDataSource(this.flights);    

  constructor(private flightService:FlightService, private adminService: AdminService, private _liveAnnouncer: LiveAnnouncer, private router: Router) { 
    this.sourceInp = "";
    this.destinationInp = "";
    this.airlineInp = "";
    this.startDateInp = "";
    this.endDateInp = "";
    this.flightService.getAll().subscribe(flights=> {
      this.flights=flights;
      this.filteredFlights = flights;
    })
  }


  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date();
    this.maxDate = new Date(currentYear + 1, 11, 31);

    this.filter(null);
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
    };
  }

  filter(query:any){
    console.log(query);
    this.filteredFlights = (query) ? 
                            this.flights.filter((p:any)=>p.airline.toLowerCase().includes(query.toLowerCase()))
                            :this.flights;
  }

  filterBySource(source:any){
    this.filteredFlights = (source) ? 
                            this.flights.filter((p:any)=>p.source.toLowerCase().includes(source.toLowerCase()))
                            :this.filteredFlights;
    this.source = source;
    this.filteredFilghtsBySource=this.filteredFlights;
    if(!this.source)
      this.filteredFlights = this.filteredFlightsByDestination;
    this.resetSourceDestinationEmpty();
  }
  filterByDestination(destination:any){
    this.filteredFlights = (destination) ? 
                            this.filteredFlights.filter((p:any)=>p.destination.toLowerCase().includes(destination.toLowerCase()))
                            :this.filteredFlights;
    this.filteredFlightsByDestination = this.filteredFlights;
    this.destination = destination;
    if(!this.destination)
      this.filteredFlights = this.filteredFilghtsBySource;
    this.resetSourceDestinationEmpty();
  }
  resetSourceDestinationEmpty(){
    if(!this.source && !this.destination)
      this.filteredFlights = this.flights;
  }

  filterFlights(){
    this.filteredFlights = (this.sourceInp) ? 
                            this.flights.filter((p:any)=>p.flightSource.toLowerCase().includes(this.sourceInp.toLowerCase()))
                            :this.flights;
    console.log("Started filtering....")
                            
    this.filteredFlights = (this.destinationInp) ? 
                            this.filteredFlights.filter((p:any)=>p.flightDestination.toLowerCase().includes(this.destinationInp.toLowerCase()))
                            :this.filteredFlights;
    
    this.filteredFlights = (this.airlineInp) ? 
                            this.filteredFlights.filter((p:any)=>p.flightName.toLowerCase().includes(this.airlineInp.toLowerCase()))
                            :this.filteredFlights;
  }

  getFlightsByQuery() {
    this.query.flightSource = this.sourceInp;
    this.query.flightDestination = this.destinationInp;
    this.query.flightDepartureDate = this.startDateInp;
    this.query.flightArrivalDate = this.endDateInp;

      this.flightService.getFlightsByQueryService(this.query).subscribe((flights: Flight[])=> {
            this.filteredFlights=flights; 
          });
  }





























  add(flight:any){
    this.adminService.add(flight).subscribe();
  }

  delete(flightId:any){
    if(confirm("Are you sure to delete ")) {
      console.log(flightId);
      this.adminService.delete(flightId).subscribe();
      window.location.reload();
    }
  }

  update(flightId: any) {
    this.flightService.sendId(flightId);
    this.router.navigate(['/admin/flight/update']);
  }



}
