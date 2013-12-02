The applicat is maven application.
form command line, to to the folder have pom file
type: mvn clean package .
The war file will create under target folder

The project come with OpenId login from www.appdirect.com

1) OpenId login with www.appdirect.com
The project use spring security, with openId authenticate.
Open web page : http://dry-castle-5417.herokuapp.com/login.jsp, login page
login with appdirect username and password, to main landing page

2) Buy 

buy flow is like this, input all required parameter , and submit. 
the subscribe object will be created, and transform to xml string by JXB framwork, then invoke Restful call
use Jersey Restful client. but the Restful url is fake one. It can not post data to appdirect




