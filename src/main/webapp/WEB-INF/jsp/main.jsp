<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
<link rel="stylesheet" href="<c:url value='/css/main.css' />"
	type="text/css">

<link rel="stylesheet" href="<c:url value='/css/jquery-ui.css' />" />
<script type="text/javascript"
	src="<c:url value='/javascript/jquery-1.10.2.js' />"></script>
<script type="text/javascript"
	src="<c:url value='/javascript/jquery-ui.js' />"></script>
<script type="text/javascript"
	src="<c:url value='/javascript/dashboardBody.js' />"></script>

</head>
<body>

	<div id="landBody">
		<table>
			<tr>

				<td id="leftColumn" align="center">
					<div id="landingLeft">
						<img alt="" src="<c:url value='/images/appDirect.jpg' />" />
					</div>
				</td>



				<td id="rightColumn">
					<div id="landingRight">

						<table>
						 
					
							<tr>
								<td><input type="button" value="Buy My Application"	class="greenButton"	 onclick="buy()" /></td>

							</tr>
						
											


							

								<tr>
									<td><input type="button" value="Logout "  class="greenButton"  onclick="logout()" /></td>
								</tr>
					
							 
						
						
						</table>


					</div>



				</td>

			</tr>


		</table>
	</div>

	


	

	

	

	

	</div>
	
	


 
	<script type="text/javascript">
		var catalogs=new Array();
		
		<c:forEach var="item" items="${mh_catalogs}" varStatus="loop" >
			catalogs["${item.catalog}"]="${item.rollupFileName}"	;			
		</c:forEach>
		$(function() {
			$(document).tooltip(
					{
						position : {
							my : "center bottom-20",
							at : "center top",
							using : function(position, feedback) {
								$(this).css(position);
								$("<div>").addClass("arrow").addClass(
										feedback.vertical).addClass(
										feedback.horizontal).appendTo(this);
							}
						}
					});
		});
		
		function logout(){
			location.href="<c:url value='/logout' />";
		}
		
		function buy(){
			location.href="<c:url value='/ic/main/subscribe' />";
		}
	</script>


</body>
</html>