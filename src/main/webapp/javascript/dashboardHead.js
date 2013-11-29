var metroURL="http://192.168.92.224:8888";
var userPath="admin";
var authorization="YWRtaW46YWRtaW4=";
function showSite(value){
	hideSelection(value);
	showMainMenu();

	var vparam = "ASC";			
	
	var url=metroURL+"/dhtmljsp/dhtml.jsp?jrs.cmd=jrs.try_vw"+
			"&jrs.authorization="+authorization+"&jrs.report=/USERFOLDERPATH/"+userPath+"/RollupSiteP1.cls"+
			"&jrs.catalog=/USERFOLDERPATH/"+userPath+"/MetroDashMDR.cat&jrs.param$p_Site="+vparam;
	
	parent.frames["main"].location=url;	
	
}

function showCampus(value,docId){
	hideSelection(value);
	showMainMenu();
	
	var url =parent.frames["main"].metroURL+"/dhtmljsp/dhtml.jsp?jrs.cmd=jrs.try_vw"+
			"&jrs.authorization="+authorization+"&jrs.report=/USERFOLDERPATH/"+userPath+"/MetroIVCHome.cls"+
			"&jrs.catalog=/USERFOLDERPATH/"+userPath+"/MetroDashMDR.cat&jrs.param$p_ProviderID="+docId;	
	parent.frames["main"].location=url;
}

function showCampus(value,docId,file){
	
	
	
	var url =metroURL+"/dhtmljsp/dhtml.jsp?jrs.cmd=jrs.try_vw"+
			"&jrs.authorization="+authorization+"&jrs.report=/USERFOLDERPATH/"+userPath+"/"+file+
			"&jrs.catalog=/USERFOLDERPATH/"+userPath+"/MetroDashMDR.cat&jrs.param$p_ProviderID="+docId;	
	parent.frames["main"].location=url;
}


function showMGMA_SpecialtyReport(value,mgma){
	hideSelection(value);
	showMainMenu();
	
	var vparam =mgma;		
	var url=metroURL+"/dhtmljsp/dhtml.jsp?jrs.cmd=jrs.try_vw"+
			"&jrs.authorization="+authorization+"&jrs.report=/USERFOLDERPATH/"+userPath+"/RollupP1Main.cls"+
			"&jrs.catalog=/USERFOLDERPATH/"+userPath+"/MetroDashMDR.cat&jrs.param$p_MGMA="+vparam;
	parent.frames["main"].location=url;
}

function showMGMA_SpecialtyReport(value,mgma,file){
	
	hideSelection(value);
	showMainMenu();
	
	var vparam =mgma;		
	var url=metroURL+"/dhtmljsp/dhtml.jsp?jrs.cmd=jrs.try_vw"+
			"&jrs.authorization="+authorization+"&jrs.report=/USERFOLDERPATH/"+userPath+"/"+file+
			"&jrs.catalog=/USERFOLDERPATH/"+userPath+"/MetroDashMDR.cat&jrs.param$p_MGMA="+vparam;
	parent.frames["main"].location=url;
}

function showDepartmentReport(value,depart){
	hideSelection(value);
	showMainMenu();
	
	var vparam =depart;		
	var url=metroURL+"/dhtmljsp/dhtml.jsp?jrs.cmd=jrs.try_vw"+
			"&jrs.authorization="+authorization+"&jrs.report=/USERFOLDERPATH/"+userPath+"/RollupDeptP1.cls"+
			"&jrs.catalog=/USERFOLDERPATH/"+userPath+"/MetroDashMDR.cat&jrs.param$p_Dept="+vparam;
	parent.frames["main"].location=url;
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
	parent.frames["main"].location=url;
}



function showPCUReport(value,pcu){
	hideSelection(value);
	showMainMenu();

	var vparam =pcu;		
	var url=metroURL+"/dhtmljsp/dhtml.jsp?jrs.cmd=jrs.try_vw"+
			"&jrs.authorization="+authorization+"&jrs.report=/USERFOLDERPATH/"+userPath+"/RollupPCUP1.cls"+
			"&jrs.catalog=/USERFOLDERPATH/"+userPath+"/MetroDashMDR.cat&jrs.param$p_PCU="+vparam; 

	parent.frames["main"].location=url;
}



function showPPMC(value,depart){
	hideSelection(value);
	showMainMenu();
	
	var vparam =depart;		
	var url=metroURL+"/dhtmljsp/dhtml.jsp?jrs.cmd=jrs.try_vw"+
			"&jrs.authorization="+authorization+"&jrs.report=/USERFOLDERPATH/"+userPath+"/RollupPPMCP1.cls"+
			"&jrs.catalog=/USERFOLDERPATH/"+userPath+"/MetroDashMDR.cat&jrs.param$p_PPMCGroup="+vparam;


	parent.frames["main"].location=url;
}

function executive(value){
	showMainMenu();
	
	parent.frames["main"].location="comingsoon.jsp";
}

function addBreadscrumb(value){
	var root=top.frames[0].document;	
	var element=root.getElementById("breadscrumb");
	
	element.innerHTML="<a onclick='goBody()'>Dashboard</a> | "+value;
}

function showMainMenu(){	
	var root=top.frames[0].document;	
	var element=root.getElementById("mainMenu");
	var menu=root.getElementById("menu");
	element.style.display="block";
	
}


function showProductivity(){
	var url=metroURL+"/dhtmljsp/dhtml.jsp?jrs.cmd=jrs.try_vw"+
	"&jrs.authorization="+authorization+"&jrs.report=/USERFOLDERPATH/"+userPath+"/RollupPPMCP1.cls"+
	"&jrs.catalog=/USERFOLDERPATH/"+userPath+"/MetroDashMDR.cat&jrs.param$p_PPMCGroup="+vparam;


	parent.frames["main"].location=url;
}


function openProducvityReport(){
	top.frames["header"].document.domain=top.frames["main"].document.domain;
	var dsid="s13775259644731131_d75";
	parent.frames["main"]._openLinkReport(dsid);
}

function openAccessReport(){
	var url=metroURL+"/dhtmljsp/index.jsp?sessionid=006070773&"+
			"rptsetid=13772812028921027&rptname=Report&suffix=1377281204896";

	top.frames["main"].location=url;
}

function openSatisfactionReport(){
	var url=metroURL+"/dhtmljsp/index.jsp?sessionid=006070773&"+
			"rptsetid=13772817329451033&rptname=Report&suffix=1377281734935";

	top.frames["main"].location=url;
}

function openCostReport(){
	var url=metroURL+"/dhtmljsp/index.jsp?sessionid=006070773&"+
			"rptsetid=13772817808811035&rptname=Report&suffix=1377281783098";

	top.frames["main"].location=url;
}

function openQualityReport(){
	var url=metroURL+"/dhtmljsp/index.jsp?sessionid=006070773&"+
			"rptsetid=13772819476781039&rptname=Report&suffix=1377281950396";

	top.frames["main"].location=url;
}

function openMeaningfulReport(){
	var url=metroURL+"/dhtmljsp/index.jsp?sessionid=006070773&"+
			"rptsetid=13772819910191041&rptname=Report&suffix=1377281993019";

	top.frames["main"].location=url;
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



