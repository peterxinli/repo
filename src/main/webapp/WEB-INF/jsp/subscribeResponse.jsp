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
			
			
				<table align="center" style="margin-top: 200px">
				<tr><td>Your order processed</td></tr>
				<tr><td><input type="button" value="Go To Main Page" class="greenButton" onclick="toMain()" /></td></tr>
				
				</table>
			
					



</body>
<script type="text/javascript">
function toMain(){
	location.href="<c:url value='/ic/main/common' />";
}

</script>

</html>