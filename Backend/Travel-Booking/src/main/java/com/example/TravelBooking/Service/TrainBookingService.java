package com.example.TravelBooking.Service;

import com.example.TravelBooking.Entity.TrainBooking;
import com.example.TravelBooking.Model.BookingModel;
import com.example.TravelBooking.Model.PaymentModel;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface TrainBookingService {
    PaymentModel trainBooking(BookingModel bookingModel);

    List<TrainBooking> getBookingById(Long id);

    String cancelBooking(Long id);
}
