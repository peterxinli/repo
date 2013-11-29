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



		
		<form action="${openIDLoginUrl}" method="post" >
			<table align="center">
				<tr>
					<td><img alt="" src="${logoUrl }"></td>
				</tr>
				<tr>
					<td><input class="greenButton"  type="submit"	value="Sign with AppDirect" /></td>
				</tr>
			</table>
			<input  name="openid_identifier" type="hidden" value="https://www.appdirect.com/openid/id" /> 
		</form>

	</div>







	<script type="text/javascript">
		function login() {
			var validationPass = true;
			var docId = document.getElementsByName("docid")[0];
			var password = document.getElementById("passwordInput");
			var errorPasssword = document.getElementById("errorPassword");
			var error = document.getElementById("error");

			if (docId.value == "") {
				error.innerHTML = "ID can not be empty";
				validationPass = false;
			} else {
				error.innerHTML = "";
			}

			if (password.value == "") {
				errorPassword.innerHTML = "Password can not be empty";
				validationPass = false;
			} else {
				errorPassword.innerHTML = "";
			}

			var loginForm = document.getElementById("loginForm");
			if (validationPass) {
				loginForm.submit();
			}

		}
	</script>

</body>
</html>