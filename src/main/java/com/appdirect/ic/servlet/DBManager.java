package com.appdirect.ic.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;

import org.apache.log4j.Logger;
import org.hsqldb.persist.HsqlProperties;
import org.hsqldb.server.Server;
import org.hsqldb.server.ServerAcl.AclFormatException;


public class DBManager extends HttpServlet {
	protected static Logger logger = Logger.getLogger("DBManager.class");
	
	 private Server server;

	@Override
	public void destroy() {	
		super.destroy();
		logger.debug("shut down server");
		server.stop();
	}

	@Override
	public void init() throws ServletException {		
		super.init();
	    try {
	        logger.debug("Starting Database");
	        HsqlProperties p = new HsqlProperties();
	        p.setProperty("server.database.0", "file:/opt/db/crm");
	        p.setProperty("server.dbname.0", "mydb");
	        p.setProperty("server.port", "9001");
	        server = new Server();
	        server.setProperties(p);
	        server.setLogWriter(null); // can use custom writer
	        server.setErrWriter(null); // can use custom writer
	        server.start();
	    } catch (AclFormatException afex) {
	        throw new ServletException(afex);
	    } catch (IOException ioex) {
	        throw new ServletException(ioex);
	    }
	}

	

}
