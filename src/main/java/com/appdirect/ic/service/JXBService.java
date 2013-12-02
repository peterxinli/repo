/**
 * 
 */
package com.appdirect.ic.service;

import java.io.StringWriter;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBElement;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;



public class  JXBService <RequestType>{
    
  



    public StringWriter marshal(RequestType requesType) throws JAXBException {
        StringWriter sw = new StringWriter();
        JAXBContext jaxbContext = JAXBContext.newInstance(requesType.getClass());
        Marshaller marshaller =  jaxbContext.createMarshaller();
        marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);        
        marshaller.marshal( (JAXBElement<RequestType>) (requesType), sw);
        return sw;
    }    
 

  
}

