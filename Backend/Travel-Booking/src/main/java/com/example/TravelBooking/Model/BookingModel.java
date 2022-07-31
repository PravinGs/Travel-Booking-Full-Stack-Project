package com.example.TravelBooking.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingModel {
    private String userEmail;
    private Long id;
    private Timestamp date;
    private Integer seats;
    private Boolean status;
}
