package com.example.TravelBooking.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserModel {
    private String userName;
    private String userEmail;
    private String userPassword;
    private String matchingPassword;
    private String userGender;
    private String userAddress;
    private String userPhoneNo;
    private String userNation;
    private Boolean enabled;
    private Date userDOB;

    public UserModel(String userName, String userEmail, String userAddress, String userGender, String userNation, String userPhoneNo, Date userDOB) {
        this.userName = userName;
        this.userEmail = userEmail;
        this.userGender = userGender;
        this.userAddress = userAddress;
        this.userPhoneNo = userPhoneNo;
        this.userNation = userNation;
        this.userDOB = userDOB;

    }



    public String checkPassword() {
        if (userPassword.equals(matchingPassword)) return userPassword;
        return "Password Invalid";
    }

}