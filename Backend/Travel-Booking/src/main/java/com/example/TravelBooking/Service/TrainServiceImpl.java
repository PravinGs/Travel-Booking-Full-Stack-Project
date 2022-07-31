package com.example.TravelBooking.Service;

import com.example.TravelBooking.Entity.Flight;
import com.example.TravelBooking.Entity.Train;
import com.example.TravelBooking.Model.StringResponse;
import com.example.TravelBooking.Repository.TrainRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Objects;

@Service
@Slf4j
@Transactional
public class TrainServiceImpl implements TrainService{
    @Autowired
    private TrainRepository trainRepository;
    @Override
    public Train register(Train train) {
        if (train != null) {
            log.info("Added");
            return trainRepository.save(train);
        }
        log.info("" + train.toString());
        return null;
    }
    @Override
    public StringResponse deleteById(Long trainId) {
       if (trainRepository.existsByTrainId(trainId)) {
           trainRepository.deleteById(trainId);
           return new StringResponse("Removed");
       }
       return new StringResponse("Invalid Id");
    }
    @Override
    public Train updateById(Long trainId, Train train) {
        if (trainRepository.existsByTrainId(trainId)) {
            log.info("\nFrom service : "  + " Id : " + trainId + " Train : "+ train.toString());
            Train t = trainRepository.findById(trainId).get();
            log.info("Retrived Train : " + t);
            if (Objects.nonNull(train.getTrainName())) {
                t.setTrainName(train.getTrainName());
            }
            if (Objects.nonNull(train.getTrainSource())) {
                t.setTrainSource(train.getTrainSource());
            }
            if (Objects.nonNull(train.getTrainDestination())) {
                t.setTrainDestination(train.getTrainDestination());
            }
            if (Objects.nonNull(train.getTrainArrivalDate())) {
                t.setTrainArrivalDate(train.getTrainArrivalDate());
            }
            if (Objects.nonNull(t.getTrainFare()) && Objects.nonNull(train.getTrainFare())) {
                t.setTrainFare(train.getTrainFare());
            }

            if (Objects.nonNull(train.getTrainAvailability())) {
                t.setTrainAvailability(train.getTrainAvailability());
            }
            if (Objects.nonNull(train.getTrainTotalSeats())) {
                t.setTrainTotalSeats(train.getTrainTotalSeats());
            }
            if (Objects.nonNull(train.getTrainLogoUrl())) {
                t.setTrainLogoUrl(train.getTrainLogoUrl());
            }
            trainRepository.save(t);
            return t;
        }
        return null;
    }

    @Override
    public List<Train> getAllTrains() {
        return trainRepository.findAll();
    }
    @Override
    public Train getTrainById(Long id) {
        return trainRepository.findByTrainId(id);
    }
}
