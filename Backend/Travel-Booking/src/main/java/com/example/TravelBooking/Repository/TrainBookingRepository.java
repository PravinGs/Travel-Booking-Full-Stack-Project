package com.example.TravelBooking.Repository;

import com.example.TravelBooking.Entity.TrainBooking;
import com.example.TravelBooking.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TrainBookingRepository extends JpaRepository<TrainBooking, Long> {
    List<TrainBooking> findByUser(User user);
}
