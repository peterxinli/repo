var DHTMLMessages = new Array();
var DHTMLConstant = {
	DHTMLJSPPATH : "../dhtmljsp/",
	DHTMLIMGPATH : "../dhtmljsp/../images/dhtml/standard/",
	DHTMLCSSPATH : "../dhtmljsp/../style/dhtml/",
	DHTMLJSPATH : "../dhtmljsp/../javascript/dhtml/",
	DHTMLURL : "../dhtml?sessionid=012135434&rptsetid=13775415992281164&rptname=Report",
	SESSION_ID : "012135434",
	RPTSET_ID : "13775415992281164",
	RPT_NAME : "Report",
	URL_RPTSET_ID : "13775415992281164",
	URL_RPT_NAME : "Report",
	DHTML_PREFIX : "jro_",
	DHTMLServLetURL : "../dhtml"
};
var DHTMLComponentVisible = {
	UserInfoBar : false,
	MainMenu : false,
	ToolBox : false,
	TOCTree : false,
	DSOTree : false,
	ToolBar : true,
	RptSetBar : true,
	LinkPanel : false,
	leftPanelWidth : 220,
	toolboxPanelHeight : 140,
	tocPanelHeight : 250,
	dsoPanelHeight : 230,
	PreviewVisible : false
};
var isNoFrame = true;
var isScreenLocked = false;
var isAdhoc = false;
var isGoToDetailMode = false;
var lockScrTimeOut = 10800;
var autoRefreshInterval = 0;
var timmer_refresh = null;
var timmer_lockScr = null;
var isPopUpCriteria = true;
var canInsertRemove = false;
var canPivot = false;
var canMoveComp = false;
var canResize = false;
var isShowConvertQueryDlg = true;
var isSimpleView = true;
var gridSize = 0
var zoomValue = 100;
var isCustomizedZoom = false;
var isPipelineEnable = false;
var isFinishPipeline = false;
var isRSDFile = false;
var actionCount = 0;
var isWaitAction = false;
var actionObj = new Array();

function XmlHttp() {
}
XmlHttp.create = function() {
	try {
		if (window.XMLHttpRequest) {
			var req = new XMLHttpRequest();
			// some versions of Moz do not support the readyState property
			// and the onreadystate event so we patch it!
			if (req.readyState == null) {
				req.readyState = 1;
				req.addEventListener("load", function() {
					req.readyState = 4;
					if (typeof req.onreadystatechange == "function")
						req.onreadystatechange();
				}, false);
			}
			return req;
		}
		if (window.ActiveXObject) {
			return new ActiveXObject(getXmlHttpPrefix() + ".XmlHttp");
		}
	} catch (ex) {
	}
	// fell through
	throw new Error("Your browser does not support XmlHttp objects");
};
