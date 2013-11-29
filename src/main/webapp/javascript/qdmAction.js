var OperateConstant = {
	OPERATE : "op",
	LINK : 30,
	DS_ID : "dsid",
	DHTML_PREFIX : "jro_"

}

function openLinkReport() // event for get src object, then get dsid
{

	dsid = "s1377260559002948_d75"; // productivity
	_openLinkReport(dsid);
}

function _openLinkReport(dsid) {
	if (dsid != null || dsid != "null") {
		var args = [ [ OperateConstant.OPERATE, OperateConstant.LINK ],
				[ OperateConstant.DS_ID, "s1377260559002948_d75" ] ];

		var formObj = null;
		submitAction(formObj, args);
	}
}

function getFrameObject(frameID, ID) {
	var obj;
	if (isNoFrame) {
		var firstobj = document.getElementById(ID);
		if (firstobj == null) {
			// alert("firstobj is null");
			return null;
		}
		var temp = firstobj.parentNode;
		if ((frameID != null) && (frameID.length > 0)) { // whether Id in the
			// Frame
			if (isChildObj(firstobj, frameID)) {
				return firstobj;// in
			}
			// out
			firstobj.id += OperateConstant.DHTML_PREFIX + "_connect";
			obj = document.getElementById(ID);
			firstobj.id = ID;
			return obj;
		} else {
			while (temp != null) {
				// whether ID in connect
				if (temp.id == OperateConstant.DHTML_PREFIX + "connect") {
					// in the connect
					firstobj.id += OperateConstant.DHTML_PREFIX + "_connect";
					obj = document.getElementById(ID);
					firstobj.id = ID;
					return obj;
				}
				temp = temp.parentNode;
			}
			// out the connect
			return firstobj;
		}
	} else {
		if (frameID != null && frameID.length > 0) {
			if (dAPI.isIE()) {
				try {
					if (window.parent.frames[frameID] != null) {
						obj = window.parent.frames[frameID].document
								.getElementById(ID);
					}
				} catch (ex) {
					obj = null;
				}
				if (obj == null && window.frames[frameID] != null) {
					obj = window.frames[frameID].document.getElementById(ID);
				}
			} else {
				try {
					if (window.parent.document.getElementById(frameID) != null) {
						obj = window.parent.document.getElementById(frameID).contentDocument
								.getElementById(ID);
					}
				} catch (ex) {
					obj = null;
				}
				if (obj == null
						&& window.document.getElementById(frameID) != null) {
					obj = window.document.getElementById(frameID).contentDocument
							.getElementById(ID);
				}
			}
		} else {
			try {
				obj = window.parent.document.getElementById(ID);
			} catch (ex) {
				obj = null;
			}
			if (obj == null) {
				obj = window.document.getElementById(ID);
			}
		}
		return obj;
	}
}

var iTimerID = null;
function getOP(args) {
	if (args != null) {
		for ( var i = 0; i < args.length; i++) {
			var arg_name = args[i][0];
			if (arg_name == OperateConstant.OPERATE) {
				return parseInt(encodeSingleQuote(args[i][1]));
			}
		}
	}
	return null;
}

function encodeSingleQuote(aUrl) {
	if (aUrl == undefined)
		return "";
	if (!isNaN(aUrl))
		return aUrl;
	var r = aUrl;// encodeURIComponent(aUrl);
	var ret = "";
	for ( var i = 0; i < r.length; i++) {
		var tmp = r.charAt(i);
		switch (tmp) {
		case "'":
			ret += "%27";
			break;
		case '&':
			ret += "%26";
			break;
		case '?':
			ret += "%3F";
			break;
		case '=':
			ret += "%3D";
			break;
		case '+':
			ret += "%2B";
			break;
		case '%':
			ret += "%25";
			break;
		case ' ':
			ret += "%20";
			break;
		case '#':
			ret += "%23";
			break;
		case "\\":
			ret += "%5C";
			break;
		default:
			ret += tmp;
		}
	}
	return ret;
}

var isNoFrame = true;
function submitAction(formobj, args, showWait, actionurl, bAsynchronous) {

	if (showWait)
		showWait = true;
	else if (showWait == false)
		showWait = false;
	else
		showWait = true;
	var op = 30; // getOP(args)
	if (op != null) {
		showWait = true;
	}
	var tipText = null;
	actionCount++;
	showWatingDiv(showWait, tipText);
	if (isNoFrame) {
		if (window._setCursor)
			_setCursor("wait");
		var url = "";
		if (actionurl) {
			url = actionurl + "?";
			url += OperateConstant.SESSION_ID + "=" + DHTMLConstant.SESSION_ID
					+ "&" + OperateConstant.RPTSET_ID + "="
					+ DHTMLConstant.URL_RPTSET_ID + "&"
					+ OperateConstant.RPT_NAME + "="
					+ DHTMLConstant.URL_RPT_NAME + "&";
		} else {
			var url = DHTMLConstant.DHTMLURL + "&";
			if (formobj && formobj.action) {
				url = formobj.action + "?";
			}
		}
		if (args != null) {
			for ( var i = 0; i < args.length; i++) {
				// changed by xiejun due to IE failed encode single quote (')
				// url += args[i][0]+"="+args[i][1] + "&";
				var arg_value = args[i][1];
				if (args[i].length < 3)
					arg_value = encodeSingleQuote(args[i][1]);
				url += args[i][0] + "=" + arg_value + "&";
			}
		}
		// alert(url);
		if (isWaitAction) {
			actionObj.push("_doRequest('" + url + "'," + bAsynchronous + ")");
		} else {
			isWaitAction = true;
			window.setTimeout("_doRequest('" + url + "'," + bAsynchronous
					+ ");", 0);
		}
		// alert(dAPI.getObj(OperateConstant.DHTML_PREFIX+"connect").innerHTML);
	} else {
		if (formobj) {
			if (!formobj.disabled) {
				if (args != null) {
					var winObj = window.parent;
					if (!winObj.dAPI) {
						winObj = window;
					}
					for ( var i = 0; i < args.length; i++) {
						winObj.dAPI = new winObj.dhtmlAPI();
						winObj.eAPI = new winObj.dhtmlElement(winObj.dAPI);
						winObj.eAPI.createHidden(formobj, args[i][0],
								args[i][1], OperateConstant.DHTML_PREFIX
										+ args[i][0]);
					}
				}
				if (actionurl) {
					formobj.action = actionurl;
				}
				formobj.submit();
				resetform(formobj);
			} else {
				alert(msg(1000054));
			}
		}
		window.setTimeout("showWatingDiv(false);", 100);
	}
	// }catch(ex){
	// alert(ex);
	// }
}

function showWatingDiv(isShow, tipText) {
	var dhtmlWin = null;
	if (window.getDHTMLMainWindow) {
		dhtmlWin = window.getDHTMLMainWindow();
	}
	if (!dhtmlWin || dhtmlWin == null)
		dhtmlWin = window;
	var waitingobj = dhtmlWin.getFrameObject("", OperateConstant.DHTML_PREFIX
			+ "waitingdiv");
	var rptdiv = dhtmlWin.getFrameObject("", OperateConstant.DHTML_PREFIX
			+ 'div_report');
	var action_loading_div = dhtmlWin.getFrameObject("",
			OperateConstant.DHTML_PREFIX + 'action_loading');
	var icon_logo_img = dhtmlWin.getFrameObject("",
			OperateConstant.DHTML_PREFIX + 'icon_logo_img');
	if (waitingobj && rptdiv) {
		dAPI.setObjTop(waitingobj, 0);
		dAPI.setObjLeft(waitingobj, 0);
		dAPI.setObjWidth(waitingobj, dAPI.getClientWidth());
		dAPI.setObjHeight(waitingobj, dAPI.getClientHeight());
		var co = dhtmlWin.dAPI.getObjXY(rptdiv);
		if (isShow) {
			var fonts = waitingobj.getElementsByTagName("font");
			/*
			 * [JINFONET #53768] Issue with Export: when user uncheck 'Enable
			 * Waiting Page' in 8889 page, Profile: > Customize Server
			 * Preferences | Advanced tab, waiting div in DHTML will NOT <font>
			 * tag, so change to when children is 0, waiting div should not be
			 * shown. Why not try when server config is no, dhtml not add
			 * waiting div? I try, but found when user change and not refresh
			 * his html page, will also has this problem. add by Jiangc at
			 * 09-05-11 //
			 */
			if (fonts && fonts.length > 0) {
				if (tipText) {
					if (rawWatingDivFont == null) {
						rawWatingDivFont = fonts[0].innerHTML;
					}
					fonts[0].innerHTML = tipText;
				} else if (rawWatingDivFont != null) {
					fonts[0].innerHTML = rawWatingDivFont;
				}
				// if(icon_logo_img!=null){
				// icon_logo_img.src = DHTMLConstant.DHTMLIMGPATH +
				// "logo16_white.gif";
				// action_loading_div.style.display="none";
				// }else{
				// action_loading_div.style.display="";
				// dAPI.setObjTop(action_loading_div, co[1] + 2 + (dAPI.isIE()?
				// 0:2 ) );
				// dAPI.setObjLeft(action_loading_div, co[0] +
				// dhtmlWin.dAPI.getObjWidth(rptdiv) - 70 - 35 );
				// }
				waitingobj.style.display = "";
			}
		} else {
			// if(icon_logo_img!=null){
			// icon_logo_img.src = DHTMLConstant.DHTMLIMGPATH + "logo16.gif";
			// }else{
			// }
			if (actionCount == 0)
				waitingobj.style.display = "none";
		}
	}
}

function _doRequest(uri, bAsynchronous) {
	if (uri.length > 2000)
		_doPost(uri, bAsynchronous);
	else
		_doGet(uri, bAsynchronous);
}

function _doGet(uri, bAsynchronous) {
	if (bAsynchronous == undefined) {
		bAsynchronous = true;
	}
	// uri =encodeURI(uri);
	var uritemp = uri.toString();
	var index = uritemp.indexOf("&");
	if (index > 0) {
		uri = uritemp.substring(0, index);
		uri += "&time=" + (new Date()).getMilliseconds();
		uri += uritemp.substring(index);
	} else {
		uri += "&time=" + (new Date()).getMilliseconds();
	}
	
	var xmlHttp = XmlHttp.create();
	xmlHttp.open("GET", uri, bAsynchronous);
	xmlHttp.setRequestHeader("jrd.referer", top.frames["main"].location.href);
	xmlHttp.onreadystatechange = function() {
		if (xmlHttp.readyState == 4) {
			if (xmlHttp.status != 200) {
				alert("http error , status code is " + xmlHttp.status
						+ "\n URI is " + uri);
			}
			load(xmlHttp);
			if (isWaitAction) {
				if (actionObj.length > 0) {
					window.setTimeout(actionObj.shift(), 0);
				} else {
					isWaitAction = false;
				}
			}
			actionCount--;
			if (!isWaitAction)
				setTimeout("showWatingDiv(false);", 100);
		} else {
			// alert("httpserver error!!");
		}
	};
	// call in new thread to allow ui to update
	window.setTimeout(function() {
		xmlHttp.send(null);
	}, 10);
}

function showWatingDiv(isShow, tipText) {
	var dhtmlWin = null;
	if (window.getDHTMLMainWindow) {
		dhtmlWin = window.getDHTMLMainWindow();
	}
	if (!dhtmlWin || dhtmlWin == null)
		dhtmlWin = window;
	var waitingobj = dhtmlWin.getFrameObject("", OperateConstant.DHTML_PREFIX
			+ "waitingdiv");
	var rptdiv = dhtmlWin.getFrameObject("", OperateConstant.DHTML_PREFIX
			+ 'div_report');
	var action_loading_div = dhtmlWin.getFrameObject("",
			OperateConstant.DHTML_PREFIX + 'action_loading');
	var icon_logo_img = dhtmlWin.getFrameObject("",
			OperateConstant.DHTML_PREFIX + 'icon_logo_img');
	if (waitingobj && rptdiv) {
		dAPI.setObjTop(waitingobj, 0);
		dAPI.setObjLeft(waitingobj, 0);
		dAPI.setObjWidth(waitingobj, dAPI.getClientWidth());
		dAPI.setObjHeight(waitingobj, dAPI.getClientHeight());
		var co = dhtmlWin.dAPI.getObjXY(rptdiv);
		if (isShow) {
			var fonts = waitingobj.getElementsByTagName("font");
			/*
			 * [JINFONET #53768] Issue with Export: when user uncheck 'Enable
			 * Waiting Page' in 8889 page, Profile: > Customize Server
			 * Preferences | Advanced tab, waiting div in DHTML will NOT <font>
			 * tag, so change to when children is 0, waiting div should not be
			 * shown. Why not try when server config is no, dhtml not add
			 * waiting div? I try, but found when user change and not refresh
			 * his html page, will also has this problem. add by Jiangc at
			 * 09-05-11 //
			 */
			if (fonts && fonts.length > 0) {
				if (tipText) {
					if (rawWatingDivFont == null) {
						rawWatingDivFont = fonts[0].innerHTML;
					}
					fonts[0].innerHTML = tipText;
				} else if (rawWatingDivFont != null) {
					fonts[0].innerHTML = rawWatingDivFont;
				}
				// if(icon_logo_img!=null){
				// icon_logo_img.src = DHTMLConstant.DHTMLIMGPATH +
				// "logo16_white.gif";
				// action_loading_div.style.display="none";
				// }else{
				// action_loading_div.style.display="";
				// dAPI.setObjTop(action_loading_div, co[1] + 2 + (dAPI.isIE()?
				// 0:2 ) );
				// dAPI.setObjLeft(action_loading_div, co[0] +
				// dhtmlWin.dAPI.getObjWidth(rptdiv) - 70 - 35 );
				// }
				waitingobj.style.display = "";
			}
		} else {
			// if(icon_logo_img!=null){
			// icon_logo_img.src = DHTMLConstant.DHTMLIMGPATH + "logo16.gif";
			// }else{
			// }
			if (actionCount == 0)
				waitingobj.style.display = "none";
		}
	}
}
