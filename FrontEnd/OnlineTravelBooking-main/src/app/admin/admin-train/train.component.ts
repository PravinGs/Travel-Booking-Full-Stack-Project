import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Train } from 'src/app/data/train';
import { TrainService } from 'src/app/services/train-service/train.service';

@Component({
  selector: 'app-train',
  templateUrl: './train.component.html',
  styleUrls: ['./train.component.css']
})
export class AdminTrainComponent implements OnInit {

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
  minDate: any;
  maxDate: any;



  constructor(private trainService: TrainService, private router: Router) {
    this.sourceInp = "";
    this.destinationInp = "";
    this.trainInp = "";
    this.startDateInp = "";
    this.endDateInp = "";

    this.trainService.getAll().subscribe(data => {
      this.trains = data
      this.filteredTrains = data
    });
  }

  ngOnInit(): void {

    this.filter(null)
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






















  delete(id: any) {
    if (confirm("Are you sure to delete!")) {
      this.trainService.deleteById(id).subscribe();
      window.location.reload()
    }
  }

  update(id: any) {
    this.router.navigate(['/admin/train/update/'+id])
  }

}
