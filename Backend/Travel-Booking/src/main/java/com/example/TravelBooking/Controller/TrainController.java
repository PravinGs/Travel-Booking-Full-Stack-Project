package com.example.TravelBooking.Controller;

import com.example.TravelBooking.Entity.Train;
import com.example.TravelBooking.Model.StringResponse;
import com.example.TravelBooking.Service.TrainService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/trains")
@CrossOrigin("*")
@Slf4j
public class TrainController {
    @Autowired
    private TrainService trainService;
    @PostMapping("/register")
    public Train register(@RequestBody Train train){
        Train registeredTrain = trainService.register(train);
        return registeredTrain;
    }
    @DeleteMapping("/delete/{id}")
    public StringResponse delete(@PathVariable("id") Long trainId) {
        return trainService.deleteById(trainId);
    }
    @PutMapping("/update/{id}")
    public Train update(@PathVariable("id") Long trainId, @RequestBody Train train) {
        log.info("\nFrom controller:  " + train);
        return trainService.updateById(trainId, train);
    }
    @GetMapping("/get-all")
    public List<Train> getAll() {
        return trainService.getAllTrains();
    }
    @GetMapping("/get/{id}")
    public Train getById(@PathVariable("id") Long id) {
        return trainService.getTrainById(id);
    }
}
