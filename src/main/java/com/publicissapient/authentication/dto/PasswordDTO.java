package com.publicissapient.authentication.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PasswordDTO {
    private String userId;
    private String currentPassword;
    private String newPassword;
    private String confirmNewPassword;
}
