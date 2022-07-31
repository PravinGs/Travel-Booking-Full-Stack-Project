package com.example.TravelBooking.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
@NoArgsConstructor
@Data
public class Profile {
    private String userName;
    private String userEmail;
    private String userGender;
    private String userAddress;
    private String userPhoneNo;
    private String userNation;
    private Date userDOB;

    public Profile(String userName, String userEmail, String userAddress, String userGender, String userNation, String userPhoneNo, Date userDOB) {
        this.userName = userName;
        this.userEmail = userEmail;
        this.userGender = userGender;
        this.userAddress = userAddress;
        this.userPhoneNo = userPhoneNo;
        this.userNation = userNation;
        this.userDOB = userDOB;

    }
}
