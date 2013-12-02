package com.appdirect.ic.service;

import static org.junit.Assert.*;

import org.apache.log4j.Logger;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;


public class SubscribeServiceTest extends AbstractSpringTest {
	protected static Logger logger = Logger.getLogger("SubscribeServiceTest");
	
	private SubscribeService subscribeService=new SubscribeService();
	
	@Test
	public void getSubscribeService(){
		logger.debug("Test Spring DI");
		
	}

	
	
	

}
