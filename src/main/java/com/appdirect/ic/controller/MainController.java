package com.appdirect.ic.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.appdirect.ic.service.SubscribeService;
import com.sun.jersey.api.client.ClientResponse;

/**
 * Handles and retrieves the common or subscribe page depending on the URI template.
 * A user must be log-in first he can access these pages.  Only the admin can see
 * the adminpage, however.
 */
@Controller
@RequestMapping("/main")
public class MainController {

	protected static Logger logger = Logger.getLogger("controller");
	
	
	private SubscribeService subscribeService=new SubscribeService();
	
	/**
	 * Handles and retrieves the common JSP page that everyone can see
	 * 
	 * @return the name of the JSP page
	 */
    @RequestMapping(value = "/common", method = RequestMethod.GET)
    public String getCommonPage() {
    	logger.debug("Received request to show main page");
    
    	// Do your work here. Whatever you like
    	// i.e call a custom service to do your business
    	// Prepare a model to be used by the JSP page
    	
    	// This will resolve to /WEB-INF/jsp/commonpage.jsp
    	return "main";
	}
    
   
    
    /**
     * Handles and retrieves the subscribe JSP page 
     * 
     * @return the name of the JSP page
     */
    @RequestMapping(value = "/subscribe", method = RequestMethod.GET)
    public String getSubscribePage() {
    	logger.debug("Received request to show subscribe update 1 page");  
    	
    	
    	
    	return "subscribe";
	}
    
  
    
    /**
     * Handles subscribe input imformation
     * 
     * @return the name of the JSP page
     */
    @RequestMapping(value = "/subscribeSubmit", method = RequestMethod.POST)
    public String handleSubscribe(HttpServletRequest request) {
    	boolean isDemo=true;
    	logger.debug("Start haandel subscribe request "+request);  
    	ClientResponse clientResponse=null;
    	/**
    	 * the following code just to simulate to make restful call and put data
    	 * because of path setting, restful call not working in this example
    	 */
    	if(isDemo){
    		clientResponse=new ClientResponse(200,null,null,null);
    	}else{
    		clientResponse=subscribeService.subscribeToRESTFUL(request);
    	}
    	
    	if(clientResponse.getStatus()==200){
    		request.setAttribute("message","You subscribe the application sucessfully");
    	}
    	
    	return "subscribeResponse";
	}



	public void setSubscribeService(SubscribeService subscribeService) {
		this.subscribeService = subscribeService;
	}
    
    
    
    
}
