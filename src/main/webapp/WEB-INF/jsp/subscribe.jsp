<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
<link rel="stylesheet" href="<c:url value='/css/main.css' />"
	type="text/css">
</head>
<body>
	<c:url var="logoUrl" value="/images/appDirect.jpg" />
	<c:url var="openIDLoginUrl" value="/j_spring_openid_security_check" />
	<div id="headerContainer"></div>




	<div id="loginContainer" class="normalDiv" style="position: relative;">




		<form action="subscribeSubmit" method="post">
			<table align="center">
				<tr>
					<td>Type</td>
					<td><select name="type">
							<option value="SUBSCRIPTION_ORDER">SUBSCRIPTION_ORDER</option>
					</select></td>
				</tr>
					<tr>
					<td>Pattner</td>
					<td><select name="partner">
							<option value="ACME">ACME</option>
					</select></td>
				</tr>
				
				<tr>
					<td>Base URL</td>
					<td><select name="baseUrl">
							<option value="https://www.acme-marketplace.com">https://www.acme-marketplace.com</option>
					</select></td>
				</tr>
				
				<tr>
					<td>Creator Email</td>
					<td><input type="text" name="creator_email"  /></td>
				</tr>
				<tr>
					<td>First Name</td>
					<td><input type="text" name="firstName"  /></td>
				</tr>
				<tr>
					<td>Last Name</td>
					<td><input type="text" name="lastName"  /></td>
				</tr>
				<tr>
					<td>Language</td>
					<td><select name="language">
							<option value="en">English</option>
					</select></td>
				</tr>
					<tr>
					<td>Company Email</td>
					<td><input type="text" name="company_email"  /></td>
				</tr>
				<tr>
					<td>Company Name</td>
					<td><input type="text" name="companyName"  /></td>
				</tr>
				<tr>
					<td>Phone Number</td>
					<td><input type="text" name="company_phoneNumber"  /></td>
				</tr>
				<tr>
					<td>Website</td>
					<td><input type="text" name="website"  /></td>
				</tr>
				
					<tr>
					<td>Edition Code</td>
					<td><select name="editionCode">
							<option value="BASIS">BASIC</option>
					</select></td>
				</tr>
				<tr>
					<td>User Quantity</td>
					<td><input type="text" name="user_quantity"  /></td>
				</tr>
				<tr>
					<td>Megabyte Quantity</td>
					<td><input type="text" name="megabyteCOM_quantity"  /></td>
				</tr>
				
				

				
				<tr>
					<td colspan="2"><input type="submit" value="Subscribe " class="greenButton" /></td>
					
				</tr>
			</table>


		</form>

	</div>








</body>
</html>