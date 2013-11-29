var metroURL="http://192.168.92.224:8888";
var userPath="admin";
var authorization="YWRtaW46YWRtaW4=";
function showSite(value){
	hideSelection(value);
	showMainMenu();
	
	var vparam = "ASC";			
	
	var url=metroURL+"/dhtmljsp/dhtml.jsp?jrs.cmd=jrs.try_vw"+
			"&jrs.authorization="+authorization+"&jrs.report=/USERFOLDERPATH/"+
			userPath+"/RollupSiteP1.cls"+
			"&jrs.catalog=/USERFOLDERPATH/"+userPath+"/MetroDashMDR.cat&jrs.param$p_Site="+vparam;	
	window.location.href=url;	
	
}

function showCampus(value,docId){
	

	
	var url =metroURL+"/dhtmljsp/dhtml.jsp?jrs.cmd=jrs.try_vw"+
			"&jrs.authorization="+authorization+"&jrs.report=/USERFOLDERPATH/"+userPath+"/MetroIVCHome.cls"+
			"&jrs.catalog=/USERFOLDERPATH/"+userPath+"/MetroDashMDR.cat&jrs.param$p_ProviderID="+docId;	
	window.location.href=url;
}

function showCampus(value,docId,file){
	
	var url =metroURL+"/dhtmljsp/dhtml.jsp?jrs.cmd=jrs.try_vw"+
	"&jrs.authorization="+authorization+"&jrs.report=/USERFOLDERPATH/"+userPath+"/"+file+
	"&jrs.catalog=/USERFOLDERPATH/"+userPath+"/MetroDashMDR.cat&jrs.param$p_ProviderID="+docId;	
	
	window.location.href=url;
}
	
	


function showMGMA_SpecialtyReport(value,mgma){
	
	hideSelection(value);
	showMainMenu();
	
	var vparam =mgma;		
	var url=metroURL+"/dhtmljsp/dhtml.jsp?jrs.cmd=jrs.try_vw"+
			"&jrs.authorization="+authorization+"&jrs.report=/USERFOLDERPATH/"+userPath+"/RollupP1Main.cls"+
			"&jrs.catalog=/USERFOLDERPATH/"+userPath+"/MetroDashMDR.cat&jrs.param$p_MGMA="+vparam;
	window.location.href=url;
}

function showMGMA_SpecialtyReport(value,mgma,file){
	
	hideSelection(value);
	showMainMenu();
	
	var vparam =mgma;		
	var url=metroURL+"/dhtmljsp/dhtml.jsp?jrs.cmd=jrs.try_vw"+
	"&jrs.authorization="+authorization+"&jrs.report=/USERFOLDERPATH/"+userPath+"/"+file+
	"&jrs.catalog=/USERFOLDERPATH/"+userPath+"/MetroDashMDR.cat&jrs.param$p_MGMA="+vparam;

	window.location.href=url;
}

function showDepartmentReport(value,depart){
	hideSelection(value);
	showMainMenu();
	
	var vparam =depart;		
	var url=metroURL+"/dhtmljsp/dhtml.jsp?jrs.cmd=jrs.try_vw"+
			"&jrs.authorization="+authorization+"&jrs.report=/USERFOLDERPATH/"+userPath+"/RollupDeptP1.cls"+
			"&jrs.catalog=/USERFOLDERPATH/"+userPath+"/MetroDashMDR.cat&jrs.param$p_Dept="+vparam;
	window.location.href=url;
}

function showUpdateDepartmentReport(value,departWithFileName){
	hideSelection(value);
	showMainMenu();
	departmentArray=departWithFileName.split("-");
	var depart=departmentArray[0];
	var fileName=departmentArray[1];
	var vparam =depart;		
	var url=metroURL+"/dhtmljsp/dhtml.jsp?jrs.cmd=jrs.try_vw"+
			"&jrs.authorization="+authorization+"&jrs.report=/USERFOLDERPATH/"+userPath+"/"+fileName+
			"&jrs.catalog=/USERFOLDERPATH/"+userPath+"/MetroDashMDR.cat&jrs.param$p_Dept="+vparam;
	window.location.href=url;
}



function showPCUReport(value,pcu){
	hideSelection(value);
	showMainMenu();
	
	var vparam =pcu;		
	var url=metroURL+"/dhtmljsp/dhtml.jsp?jrs.cmd=jrs.try_vw"+
			"&jrs.authorization="+authorization+"&jrs.report=/USERFOLDERPATH/"+userPath+"/RollupPCUP1.cls"+
			"&jrs.catalog=/USERFOLDERPATH/"+userPath+"/MetroDashMDR.cat&jrs.param$p_PCU="+vparam; 

	window.location.href=url;
}



function showPPMC(value,depart){
	showMainMenu();
	
	var vparam =depart;		
	var url=metroURL+"/dhtmljsp/dhtml.jsp?jrs.cmd=jrs.try_vw"+
			"&jrs.authorization="+authorization+"&jrs.report=/USERFOLDERPATH/"+userPath+"/RollupPPMCP1.cls"+
			"&jrs.catalog=/USERFOLDERPATH/"+userPath+"/MetroDashMDR.cat&jrs.param$p_PPMCGroup="+vparam;


	window.location.href=url;
}

function executive(value){
	showMainMenu();
	
	window.location.href="comingsoon.jsp";
}

function addBreadscrumb(value){
	var root=top.frames[0].document;	
	var element=root.getElementById("breadscrumb");	
	element.innerHTML+="<a onclick='goBody()'>Dashboard</a> | "+value;
}

function showMainMenu(){	
	var root=top.frames[0].document;	
	var element=root.getElementById("mainMenu");
	var menu=root.getElementById("menu");
	element.style.display="block";
	
}
var currentlyShowDiv;
function showSelection(value){
	var div=$("#"+value);
	currentlyShowDiv=div;
	var cover=$("#opqueCover");
	cover.show(800);
	div.show(1500);
	
}


function hideSelection(value){
	
	var cover=$("#opqueCover");
	if(currentlyShowDiv!=null){
		currentlyShowDiv.hide(800);
	}
	
	cover.hide(1500);
	
}

function processSpecialty(specialty,value){
	
	var stringArray=value.split("-");
	if(specialtyInCatagory(stringArray[1])){
		var fileName=catalogs[stringArray[1]];
		showMGMA_SpecialtyReport(value,stringArray[0],fileName);
		
	}else{
		alert(stringArray[0]+ " has not yet been added to the Integrated Value Compass");
		return;
	}
}

function specialtyInCatagory(specialtyCatalog){
    
	var found=false;
	for(var catalog in catalogs){	
		
		if(specialtyCatalog==catalog){
			found=true;
		}
	}
	return found;
}





