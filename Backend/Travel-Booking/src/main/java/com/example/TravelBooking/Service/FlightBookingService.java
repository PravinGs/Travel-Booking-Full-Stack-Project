package com.example.TravelBooking.Service;


import com.example.TravelBooking.Entity.Flight;
import com.example.TravelBooking.Entity.FlightBooking;
import com.example.TravelBooking.Entity.User;
import com.example.TravelBooking.Model.BookingModel;
import com.example.TravelBooking.Model.PaymentModel;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public interface FlightBookingService {
    String booking(User user, Flight flight, BookingModel bookingModel);
    String updateSeating(Long id, int seats);
    String cancelBooking(Long id);
    FlightBooking findById(Long id);
    List<FlightBooking> findAllByUser(Long userId);
    void alertUsers(Long flightId);

}
