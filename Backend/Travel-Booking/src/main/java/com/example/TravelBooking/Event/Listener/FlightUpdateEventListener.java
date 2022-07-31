package com.example.TravelBooking.Event.Listener;

import com.example.TravelBooking.Email.EmailSenderService;
import com.example.TravelBooking.Entity.User;
import com.example.TravelBooking.Event.FlightUpdateEvent;
import com.example.TravelBooking.Repository.FlightBookingRepository;
import com.example.TravelBooking.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;
import javax.transaction.Transactional;
import java.util.List;

@Component
@Transactional
public class FlightUpdateEventListener implements ApplicationListener<FlightUpdateEvent> {
    @Autowired
    private EmailSenderService emailSenderService;
    @Autowired
    private FlightBookingRepository flightBookingRepository;
    @Autowired
    private UserRepository userRepository;
    @Override
    public void onApplicationEvent(FlightUpdateEvent event) {
        List<String> userEmail = event.getUserEmails();
        for(String email: userEmail) {
            User user = userRepository.findByUserEmail(email);
            String body = "Hello, Mr/Mrs. " + user.getUserName() + ",\n\t\n" +
                    "We are facing some technical issues with the flight you booked for your trip to " + event.getFlight().getFlightDestination() + "" +
                    "We will let you know the updates constantly. So it will take around two hours to repair." +
                    "Your travel time gets moved 2 hours after the previous departure time.\n\n\t\t" +
                    "Thank you!!!";
            emailSenderService.sendSimpleEmail(email,body, "Update about your Flight");
        }
    }
}
