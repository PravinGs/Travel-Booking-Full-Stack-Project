package com.example.TravelBooking.Service;

import com.example.TravelBooking.Entity.Train;
import com.example.TravelBooking.Model.StringResponse;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service

public interface TrainService {

    Train register(Train train);
    StringResponse deleteById(Long trainId);
    Train updateById(Long trainId, Train train);
    List<Train> getAllTrains();
    Train getTrainById(Long id);
}
