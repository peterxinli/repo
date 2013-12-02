package com.appdirect.ic.service;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.core.MediaType;
import javax.xml.bind.JAXBException;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import com.appdirect.ic.domain.Company;
import com.appdirect.ic.domain.Creator;
import com.appdirect.ic.domain.Item;
import com.appdirect.ic.domain.Marketplace;
import com.appdirect.ic.domain.Order;
import com.appdirect.ic.domain.PayLoad;
import com.appdirect.ic.domain.Subscription;
import com.sun.jersey.api.client.Client;
import com.sun.jersey.api.client.ClientResponse;
import com.sun.jersey.api.client.WebResource;


@Service
public class SubscribeService {
	private static Logger logger = Logger.getLogger("SubscribeService");	
	private static final String BASE_URL = "baseUrl";
	private static final String PARTNER = "partner";
	private static final String CREATOR_EMAIL = "creator_email";
	private static final String FIRSTNAME = "firstName";
	private static final String LASTNAME = "lastName";
	private static final String LANGUAGE = "language";
	private static final String EDITION_CODE ="editionCode";
	private static final String USER_QUANTITY ="user_quantity";
	private static final String USER = "user";
	private static final String MEGABYTE_QUANTITY ="megabyte_quantity";
	private static final String MEGABYTE = "megabyte";
	private static final String COMPANY_EMAIL = "company_eamil";
	private static final String COMPANY_PHON_NUMBER = "company_phoneNumber";
	private static final String WEBSITE = "website";
	private static final String PATH="/v1/order";
	private static String REST_URL="https//www.appdirect.com";
	
	private JXBService<Subscription> jxbService=new JXBService<Subscription>();

	public Subscription getSubscription(HttpServletRequest request){
		logger.debug("Construct Subscription object");
		Subscription subscription=new Subscription();
		Marketplace marketplace=new Marketplace();
		marketplace.setBaseUrl(request.getParameter(BASE_URL));
		marketplace.setPartner(request.getParameter(PARTNER));
		subscription.setMarketplace(marketplace);
		
		Creator creator=new Creator();
		creator.setEmail(request.getParameter(CREATOR_EMAIL));
		creator.setFirstName(request.getParameter(FIRSTNAME));
		creator.setLastName(request.getParameter(LASTNAME));
		creator.setLanguage(request.getParameter(LANGUAGE));
		creator.setOpenId(request.getParameter(PARTNER));
		subscription.setCreator(creator);
		
		Order order=new Order();
		order.setEditionCode(request.getParameter(EDITION_CODE));
		
		Item item1=new Item();
		item1.setQuantity(Integer.parseInt(request.getParameter(USER_QUANTITY)));
		item1.setUnit(USER);
		order.getItems().add(item1);
		

		Item item2=new Item();
		item2.setQuantity(Integer.parseInt(request.getParameter(MEGABYTE_QUANTITY)));
		item2.setUnit(MEGABYTE);
		order.getItems().add(item2);
		
		Company company=new Company();
		company.setEmail(request.getParameter(COMPANY_EMAIL));
		company.setPhoneNumber(request.getParameter(COMPANY_PHON_NUMBER));
		company.setWebsite(request.getParameter(WEBSITE));
		company.setEmail(request.getParameter(COMPANY_EMAIL));
		company.setEmail(request.getParameter(COMPANY_EMAIL));		
		
		PayLoad payLoad=new PayLoad();
		payLoad.setCompany(company);
		payLoad.setOrder(order);
		
		subscription.setPayload(payLoad);		
		logger.debug("Construct Object done with "+subscription);
		return subscription;
	}
	
	public String getXMLStringFromObject(HttpServletRequest request){
		logger.debug(" get xml string from Object");
		String requestXml=null;
		try {
			 requestXml=jxbService.marshal(getSubscription(request)).toString();
		} catch (JAXBException e) {
			logger.debug(e);
		}
		return requestXml;
	}
	
	public ClientResponse subscribeToRESTFUL(HttpServletRequest request){
		logger.debug("Call RESTFUL service to post ");
		String requestXml=getXMLStringFromObject(request);
		Client client = Client.create();
		 
		WebResource webResource = client
		   .resource(REST_URL+PATH);
 
		ClientResponse response = 
				webResource.type(MediaType.APPLICATION_SVG_XML).post(ClientResponse.class,requestXml);
               
 
		if (response.getStatus() != 200) {
			String errorMessage="Failed : HTTP error code : "+ response.getStatus();
			logger.error(errorMessage);
		   throw new RuntimeException(errorMessage);
		}
		return response;
	}
}
