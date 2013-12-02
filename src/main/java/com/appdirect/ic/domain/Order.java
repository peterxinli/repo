package com.appdirect.ic.domain;



import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;


@XmlRootElement(name = "order")  
public class Order {
	
	@XmlElement
	private String editionCode;
	
	@XmlElement(name="item")
	private List<Item> items;

	public String getEditionCode() {
		return editionCode;
	}

	public void setEditionCode(String editionCode) {
		this.editionCode = editionCode;
	}

	public List<Item> getItems() {
		if(items==null){
			items=new ArrayList<Item>();
		}
		return items;
	}
	
	


	
	
	
	

}
