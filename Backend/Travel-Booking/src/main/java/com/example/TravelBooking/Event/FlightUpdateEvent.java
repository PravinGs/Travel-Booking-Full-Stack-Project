package com.example.TravelBooking.Event;

import com.example.TravelBooking.Entity.Flight;
import org.springframework.context.ApplicationEvent;

import java.time.Clock;
import java.util.List;

public class FlightUpdateEvent extends ApplicationEvent {
    private Flight flight;
    private List<String> userEmails;

    public Flight getFlight() {
        return flight;
    }

    public void setFlight(Flight flight) {
        this.flight = flight;
    }

    public FlightUpdateEvent(Flight flight, List<String> userEmails) {
        super(flight);
        this.flight = flight;
        this.userEmails = userEmails;
    }
    public List<String> getUserEmails() {
        return userEmails;
    }
    public void setUserEmails(List<String> userEmails) {
        this.userEmails = userEmails;
    }
}
