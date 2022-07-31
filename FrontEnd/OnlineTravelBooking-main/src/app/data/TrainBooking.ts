import { Flight } from "./flight";
import { Train } from "./train";
import { user } from "./user";

export class TrainBooking {
    id: any;
    user: user = new user;
    train: Train = new Train;
    seats: any;
    status: any;
    date: any;
}