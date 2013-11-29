<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<meta http-equiv="Access-Control-Allow-Origin" content="*">
<title>Insert title here</title>
<link rel="stylesheet" href="../css/main.css" type="text/css">
<link rel="stylesheet" href="../css/style.css" type="text/css"
	media="screen, projection" />
<script type="text/javascript"
	src="<c:url value='/javascript/jquery-1.3.1.min.js' />"></script>
<script type="text/javascript" language="javascript"
	src="<c:url value='/javascript/jquery.dropdownPlain.js' />"></script>
<script type="text/javascript"
	src="<c:url value='/javascript/dashboardHead.js' />"></script>
<script type="text/javascript"
	src="<c:url value='/javascript/qdmAction.js' />"></script>
<script type="text/javascript"
	src="<c:url value='/javascript/actionCopy.js' />"></script>


</head>


<body>
  

	<div id="mainMenu">
		<div id="container">
			<c:if test="${empty fromQDM }">
				<input type="button" value="My Compass" class="greenButton"
					onclick="showCampus(this.value,'${mh_user.username}','${userHomeFileName}')" />
					
					
			</c:if>


			<c:if
				test="${(!empty mh_user.specialities) or (mh_user. mhSecurityRollup.allRollups==1) }">
				<div id="specialtyDiv" class="popupSelection">

					<select id="specialtySelect" class="menuSelect"
						onchange="processSpecialty('MGMA Specialty Report',
												this.options[this.selectedIndex].value)">

						<option value="">Please select a Specialty</option>
						<c:forEach var="specialty" items="${mh_user.specialities}">
							<c:set var="specialtyName" value="${specialty.name }"></c:set>

							<option value="${specialtyName}-${specialty.catalog}">
								${specialtyName}</option>
						</c:forEach>

					</select>
				</div>

				<input type="button" value="Division Report" class="greenButton"
					onclick="showSelection('specialtyDiv')" />
				

			</c:if>
			<c:if
				test="${!empty mh_user.departments or (mh_user. mhSecurityRollup.allRollups==1)}">
				<div id="departmentDiv" class="popupSelection">

					<select id="departmentSelect" class="menuSelect"
						onchange="showUpdateDepartmentReport('Department',this.options[this.selectedIndex].value)">
						<optgroup label="">
							<option value="None">Please select a department</option>
							<c:forEach var="department" items="${mh_user.departments}">
								<c:set var="departmentName" value="${department.name }"></c:set>

								<option value="${departmentName}-${department.rollupFileName}">
									${departmentName}</option>
							</c:forEach>
						</optgroup>
					</select>
				</div>


				<input type="button" value="Department" class="greenButton"
					onclick="showSelection('departmentDiv')" />

			</c:if>
			<c:if
				test="${!empty mh_user.pcuItems or (mh_user. mhSecurityRollup.allRollups==1)}">
				<div id="pcuDiv" class="popupSelection">

					<select id="pcuSelect" class="menuSelect"
						onchange="showPCUReport('PCU/Service',this.options[this.selectedIndex].value);
										$('#pcuSelect').val('')">
						<optgroup label="">
							<option value="">Please select a PCU</option>
							<c:forEach var="pcu" items="${mh_user.pcuItems}">
								<c:set var="pcuName" value="${pcu.name }"></c:set>

								<option value="${pcuName}">${pcuName}</option>
							</c:forEach>
						</optgroup>
					</select>
				</div>


				<input type="button" value="PCU/Service Line" class="greenButton"
					onclick="showSelection('pcuDiv')" />

			</c:if>
			<c:if
				test="${!empty mh_user.groups or (mh_user. mhSecurityRollup.allRollups==1)}">

				<div id="groupsDiv" class="popupSelection">

					<select id="groupSelect" class="menuSelect"
						onchange="showPPMC('PPMC',this.options[this.selectedIndex].value);
									$('#groupSelect').val('')">
						<optgroup label="">
							<option value="">Please select a group</option>
							<c:forEach var="group" items="${mh_user.groups}">
								<c:set var="groupName" value="${group.name }"></c:set>

								<option value="${groupName}">${groupName}</option>
							</c:forEach>
						</optgroup>
					</select>
				</div>

				<input type="button" value="PPMC" class="greenButton"
					onclick="showSelection('groupsDiv')" />

			</c:if>
			<c:if
				test="${!empty mh_user.sites or (mh_user. mhSecurityRollup.allRollups==1)}">
				<div id="siteDiv" class="popupSelection">

					<select id="siteSelect" class="menuSelect"
						onchange="showSite(this.options[this.selectedIndex].value);
									$('#siteSelect').val('')">
						<optgroup label="">
							<option value="">Please select Site</option>
							<c:forEach var="site" items="${mh_user.sites}">
								<c:set var="siteName" value="${site.name }"></c:set>

								<option value="${siteName}">${siteName}</option>
							</c:forEach>
						</optgroup>
					</select>
				</div>

				<input id="site" type="button" value="Site" class="greenButton"
					onclick="showSelection('siteDiv')" />

			</c:if>

		</div>

		<div id="headerContainer">

			<span id="headerText">Provider Dashboard</span>



		</div>

	</div>

	<div id="opqueCover" onclick="hideSelection('siteDiv')"></div>

	<script type="text/javascript">
		var catalogs = new Array();

		<c:forEach var="item" items="${mh_catalogs}" varStatus="loop" >
		catalogs["${item.catalog}"] = "${item.description}";
		</c:forEach>
		
		<c:if test="${empty fromQDM }">		 	
		 	showMainMenu();
		</c:if>
		
		function goBody() {

			var element = document.getElementById("mainMenu");
			var menu = document.getElementById("menu");
			element.style.display = "none";
			menu.style.display = "none";

			var element = document.getElementById("breadscrumb");
			element.innerHTML = "";
			parent.frames["main"].location = "body.jsp";

		}
	</script>
</body>
</html>