package com.example.TravelBooking.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Train {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long trainId;
    private String trainName;
    private String trainSource;
    private String trainDestination;
    private Timestamp trainDepartureDate;
    private Timestamp trainArrivalDate;
    private Float trainFare;
    private Boolean trainAvailability = true;
    private Integer trainTotalSeats ;
    private Integer trainBookedSeats = 0;
    private String trainLogoUrl;

    public Train(String trainName,
                 String trainSource,
                 String trainDestination,
                 Timestamp trainDepartureDate,
                 Timestamp trainArrivalDate,
                 Float trainFare,
                 Boolean trainAvailability,
                 Integer trainTotalSeats,
                 Integer trainBookedSeats,
                 String trainLogoUrl) {
        this.trainName = trainName;
        this.trainSource = trainSource;
        this.trainDestination = trainDestination;
        this.trainDepartureDate = trainDepartureDate;
        this.trainArrivalDate = trainArrivalDate;
        this.trainFare = trainFare;
        this.trainAvailability = trainAvailability;
        this.trainTotalSeats = trainTotalSeats;
        this.trainBookedSeats = trainBookedSeats;
        this.trainLogoUrl = trainLogoUrl;
    }
}
