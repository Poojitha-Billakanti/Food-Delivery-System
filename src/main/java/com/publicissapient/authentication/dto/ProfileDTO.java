package com.publicissapient.authentication.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProfileDTO {
    private String fullName;
    private String email;
    private String address;
    private String mobileNumber;
}
