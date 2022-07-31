package com.example.TravelBooking.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class TrainBooking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(
            name = "user_id",
            nullable = false,
            foreignKey = @ForeignKey(name = "FK_USER_TRAIN_BOOKING")
    )
    private User user;
    @ManyToOne
    @JoinColumn(name = "train_id", nullable = false, foreignKey = @ForeignKey(name = "FK_TRAIN"))
    private Train train;
    private Integer seats;
    private Boolean status;
    private Date date;

    public TrainBooking(User user, Train train, Integer seats, Boolean status, Date date) {
        this.user = user;
        this.train = train;
        this.seats = seats;
        this.status = status;
        this.date = date;
    }
}
