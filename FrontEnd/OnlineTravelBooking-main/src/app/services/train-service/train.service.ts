import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Train } from 'src/app/data/train';
import { TrainBooking } from 'src/app/data/TrainBooking';
import baseURL from '../baseURL';

@Injectable({
  providedIn: 'root'
})
export class TrainService {
 
  

  constructor(private http: HttpClient) { }


  getAll(): Observable<Train[]> {
    return this.http.get<Train[]>(baseURL+"/trains/get-all")
  }

  add(train:any){
    console.log("flight service add invoked")
    return this.http.post(baseURL+"/trains/register", train);
  }

  getById(id: any) : Observable<Train>{
    return this.http.get<Train>(baseURL+"/trains/get/"+id);
  }

  getTrainBookingByUserId(id: any) : Observable<TrainBooking[]> {
    return this.http.get<TrainBooking[]>(baseURL+"/booking/train/"+id);
  }

  cancelBooking(id: any) {
    return this.http.delete(baseURL+"/booking/train/delete/"+id)
  }

  deleteById(id: any) {
    return this.http.delete(baseURL+"/trains/delete/"+id)
  }
  update(id: any, train: Train) {
    return this.http.put(baseURL+"/trains/update/"+id, train)
  }
}
