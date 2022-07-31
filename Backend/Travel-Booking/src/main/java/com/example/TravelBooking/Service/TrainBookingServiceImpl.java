package com.example.TravelBooking.Service;

import com.example.TravelBooking.Entity.Train;
import com.example.TravelBooking.Entity.TrainBooking;
import com.example.TravelBooking.Entity.User;
import com.example.TravelBooking.Model.BookingModel;
import com.example.TravelBooking.Model.PaymentModel;
import com.example.TravelBooking.Repository.TrainBookingRepository;
import com.example.TravelBooking.Repository.TrainRepository;
import com.example.TravelBooking.Repository.UserRepository;
import com.razorpay.Order;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import javax.transaction.Transactional;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static com.example.TravelBooking.Controller.BookingController.makePaymentController;

@Service
@Transactional
@Slf4j
public class TrainBookingServiceImpl implements TrainBookingService{
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TrainRepository trainRepository;
    @Autowired
    private TrainBookingRepository trainBookingRepository;
    @Override
    public PaymentModel trainBooking(BookingModel bookingModel) {
        // step 1: check if he is valid user or not
        if (userRepository.existsByUserEmail(bookingModel.getUserEmail())) {
            User user = userRepository.findByUserEmail(bookingModel.getUserEmail());
            if (trainRepository.existsByTrainId(bookingModel.getId())) {
                Train train = trainRepository.findById(bookingModel.getId()).get();
                int remainingSeats = train.getTrainTotalSeats() - train.getTrainBookedSeats();
                if (train.getTrainAvailability() && remainingSeats >= bookingModel.getSeats()) {
                    train.setTrainBookedSeats(train.getTrainBookedSeats() + bookingModel.getSeats());
                    trainRepository.save(train); // train gets updated
                    trainBookingRepository.save(new TrainBooking(user, train, bookingModel.getSeats(), true, new Timestamp(System.currentTimeMillis())));
                    log.info("Train booking success.");
                    int amount = (int) (bookingModel.getSeats() * train.getTrainFare());
                    PaymentModel paymentModel = new PaymentModel();
                    Order response = makePaymentController(amount);
                    paymentModel.setAmount(response.get("amount"));
                    paymentModel.setId(response.get("id"));
                    return paymentModel;
                } else {
                    log.info("Train not available at the moment. ");
                    return null;
                }
            }
        }
        log.info("You are not an authenticated user to book tickets");
        return null;

    }

    @Override
    public List<TrainBooking> getBookingById(Long id) {
        User user = userRepository.findByUserId(id);
        if (user != null) {
            return trainBookingRepository.findByUser(user);
        }
        return null;
    }

    @Override
    public String cancelBooking(Long id) {
        Optional<TrainBooking> trainBooking = trainBookingRepository.findById(id);
        if (trainBooking.isPresent()) {
            Train train = trainBooking.get().getTrain();
            train.setTrainBookedSeats(train.getTrainBookedSeats() + trainBooking.get().getSeats());
            trainRepository.save(train);
            trainBookingRepository.deleteById(id);
            return "success";
        }
        return "invalid Booking Id";
    }
}
