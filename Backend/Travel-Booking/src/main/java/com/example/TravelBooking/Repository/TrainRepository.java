package com.example.TravelBooking.Repository;

import com.example.TravelBooking.Entity.Train;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TrainRepository extends JpaRepository<Train, Long> {
    boolean existsByTrainId(Long trainId);
    Train findByTrainId(Long id);
}
