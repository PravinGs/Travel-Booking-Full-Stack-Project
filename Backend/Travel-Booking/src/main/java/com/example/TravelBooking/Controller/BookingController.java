package com.example.TravelBooking.Controller;

import com.example.TravelBooking.Entity.Flight;
import com.example.TravelBooking.Entity.FlightBooking;
import com.example.TravelBooking.Entity.TrainBooking;
import com.example.TravelBooking.Entity.User;
import com.example.TravelBooking.Model.BookingModel;
import com.example.TravelBooking.Model.PaymentModel;
import com.example.TravelBooking.Service.*;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequestMapping(path = "/api/booking/")
@CrossOrigin("*")
public class BookingController {
    @Autowired
    private FlightBookingService flightBookingService;
    @Autowired
    private UserService userService;
    @Autowired
    private FlightService flightService;
    @Autowired
    private TrainService trainService;
    @Autowired
    private TrainBookingService trainBookingService;
    @PostMapping("/flight/add")
    public PaymentModel flightBooking(@RequestBody BookingModel bookingModel) {
        User user = userService.findByUserEmail(bookingModel.getUserEmail());
        Flight flight = flightService.findById(bookingModel.getId());
        log.info("\n" + flight + "\n" + user);
        if (flight != null && user != null) {
            int amount = (int)(bookingModel.getSeats() * flight.getFlightFare());
            flightBookingService.booking(user, flight, bookingModel);
            PaymentModel paymentModel = new PaymentModel();
            Order response = makePaymentController(amount);
            paymentModel.setAmount(response.get("amount"));
            paymentModel.setId(response.get("id"));
            return paymentModel;
        }
        return null;
    }
    @DeleteMapping("/flight/delete/{id}")
    public String cancelFlightBooking(@PathVariable("id") Long id){
        return flightBookingService.cancelBooking(id);
    }
    @PutMapping("/flight/update-seating/{id}")
    public String updateFlightBooking(@PathVariable("id") Long id, @RequestBody BookingModel bookingModel){
        FlightBooking flightBooking = flightBookingService.findById(id);
        User user = userService.findByUserEmail(bookingModel.getUserEmail());
        if (flightBooking != null && user != null && user.getEnabled() && user.equals(flightBooking.getUser())) {
            flightBookingService.updateSeating(id, bookingModel.getSeats());
            return "Your Request Successfully Handled.";
        }
        return "Invalid Request";
    }
    @GetMapping("/flight/get/{id}")
    public List<FlightBooking> findAllFlightBookingByUser(@PathVariable("id") Long userId) {
        List<FlightBooking> flightBookings =  flightBookingService.findAllByUser(userId);
        if (flightBookings.size() > 0) return flightBookings;
        return null;
    }
    public static Order makePaymentController(int amount){
        Order order = null;
        try {
            RazorpayClient client = new RazorpayClient("rzp_test_CYteNBuo9jA2t3", "xnOsBuesrtUX7yQb2aLYoIRU");            JSONObject ob = new JSONObject();
            ob.put("amount", amount*100);
            ob.put("currency", "INR");
            ob.put("receipt", "sp_732");
            order=client.orders.create(ob);
            System.out.println(order);
        } catch (RazorpayException e) {
            e.printStackTrace();
        }
        return order;
    }
    @PostMapping("/alert/{id}")
    public void alertPassengers(@PathVariable("id") Long flightId) {
        flightBookingService.alertUsers(flightId);}

    @PostMapping("/train/add")
    public PaymentModel trainBooking(@RequestBody BookingModel bookingModel) {
        return trainBookingService.trainBooking(bookingModel);
    }
    @DeleteMapping("/train/delete/{id}")
    public String cancelBooking(@PathVariable("id") Long id){
        return trainBookingService.cancelBooking(id);
    }
    @GetMapping("/train/{id}")
    public List<TrainBooking> getBookingById(@PathVariable("id") Long id) {
        return trainBookingService.getBookingById(id);
    }

}
