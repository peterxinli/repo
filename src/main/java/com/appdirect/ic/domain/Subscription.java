package com.appdirect.ic.domain;

import java.io.Serializable;


import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;


@XmlRootElement(name = "event")  
public class Subscription implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	@XmlElement(name="marketplace")
	private Marketplace marketplace;

	@XmlElement(name="creator")
	private Creator creator;
	
	@XmlElement(name="payload")
	private PayLoad payload;

	public Marketplace getMarketplace() {
		return marketplace;
	}

	public void setMarketplace(Marketplace marketplace) {
		this.marketplace = marketplace;
	}

	public Creator getCreator() {
		return creator;
	}

	public void setCreator(Creator creator) {
		this.creator = creator;
	}

	public PayLoad getPayload() {
		return payload;
	}

	public void setPayload(PayLoad payload) {
		this.payload = payload;
	}

	
	

}
