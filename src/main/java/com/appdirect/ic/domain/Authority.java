package com.appdirect.ic.domain;

import org.springframework.security.core.GrantedAuthority;


public class Authority implements GrantedAuthority {
    private String authority;

    public void setAuthority(String authority) {
        this.authority = authority;
    }


    public String getAuthority() {
        return authority;
    }
}
