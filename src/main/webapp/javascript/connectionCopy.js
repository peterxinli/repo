function getDomDocumentPrefix() {
	if (getDomDocumentPrefix.prefix)
		return getDomDocumentPrefix.prefix;
	var prefixes = [ "MSXML2", "Microsoft", "MSXML", "MSXML3" ];
	var o;
	for ( var i = 0; i < prefixes.length; i++) {
		try {
			// try to create the objects
			o = new ActiveXObject(prefixes[i] + ".DomDocument");
			return getDomDocumentPrefix.prefix = prefixes[i];
		} catch (ex) {
		}
		;
	}
	throw new Error("Could not find an installed XML parser");
}
function getXmlHttpPrefix() {
	if (getXmlHttpPrefix.prefix)
		return getXmlHttpPrefix.prefix;
	var prefixes = [ "MSXML2", "Microsoft", "MSXML", "MSXML3" ];
	var o;
	for ( var i = 0; i < prefixes.length; i++) {
		try {
			// try to create the objects
			o = new ActiveXObject(prefixes[i] + ".XmlHttp");
			return getXmlHttpPrefix.prefix = prefixes[i];
		} catch (ex) {
		}
		;
	}
	throw new Error("Could not find an installed XML parser");
}
// ////////////////////////
// Start the Real stuff //
// ////////////////////////
// XmlHttp factory
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
// XmlDocument factory
function XmlDocument() {
}
XmlDocument.create = function() {
	try {
		// DOM2
		if (document.implementation && document.implementation.createDocument) {
			var doc = document.implementation.createDocument("", "", null);
			// some versions of Moz do not support the readyState property
			// and the onreadystate event so we patch it!
			if (doc.readyState == null) {
				doc.readyState = 1;
				doc.addEventListener("load", function() {
					doc.readyState = 4;
					if (typeof doc.onreadystatechange == "function")
						doc.onreadystatechange();
				}, false);
			}
			return doc;
		}
		if (window.ActiveXObject)
			return new ActiveXObject(getDomDocumentPrefix() + ".DomDocument");
	} catch (ex) {
	}
	throw new Error("Your browser does not support XmlDocument objects");
};
// Create the loadXML method and xml getter for Mozilla
if (window.DOMParser && window.XMLSerializer && window.Node && Node.prototype
		&& Node.prototype.__defineGetter__) {
	// XMLDocument did not extend the Document interface in some versions
	// of Mozilla. Extend both!
	XMLDocument.prototype.loadXML = Document.prototype.loadXML = function(s) {
		// parse the string to a new doc
		var doc2 = (new DOMParser()).parseFromString(s, "text/xml");
		/*
		 * // remove all initial children while (this.hasChildNodes())
		 * this.removeChild(this.lastChild); // insert and import nodes for (var
		 * i = 0; i < doc2.childNodes.length; i++) {
		 * this.appendChild(this.importNode(doc2.childNodes[i], true)); } return
		 * true;
		 */
		return doc2;
	};
	/*
	 * xml getter
	 * 
	 * This serializes the DOM tree to an XML String
	 * 
	 * Usage: var sXml = oNode.xml
	 * 
	 */
	// XMLDocument did not extend the Document interface in some versions
	// of Mozilla. Extend both!
	XMLDocument.prototype.__defineGetter__("xml", function() {
		return (new XMLSerializer()).serializeToString(this);
	});
	Document.prototype.__defineGetter__("xml", function() {
		return (new XMLSerializer()).serializeToString(this);
	});
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
	xmlHttp.setRequestHeader("jrd.referer", window.location.href);
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
function _doPost(uri, bAsynchronous) {
	if (bAsynchronous == undefined) {
		bAsynchronous = true;
	}
	// uri =encodeURI(uri);
	var len = uri.length;
	var idx = uri.indexOf("?");
	var request = uri.substring(0, idx);
	var data = uri.substring(idx + 1, len);
	var xmlHttp = XmlHttp.create();
	xmlHttp.open("POST", request, bAsynchronous);
	xmlHttp.setRequestHeader("jrd.referer", window.location.href);
	xmlHttp.setRequestHeader("Content-Type",
			"application/x-www-form-urlencoded");
	xmlHttp.setRequestHeader("Content-Length", len - idx);
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
	xmlHttp.send(data);
}
function load(xmlhttp) {
	/* added by lyy for view whole text */
	if (false) {
		var fso, tf;
		fso = new ActiveXObject("Scripting.FileSystemObject");
		// create file
		tf = fso.CreateTextFile("c:\\responseText.txt", true);
		tf.Write(xmlhttp.responseText);
		// insert empty line
		tf.WriteBlankLines(1);
		tf.Close();
	}
	// alert(xmlhttp.responseText);
	var div = dAPI.getObj(OperateConstant.DHTML_PREFIX + "connect");
	if (div == null) {
		div = document.createElement("DIV");
		div.id = OperateConstant.DHTML_PREFIX + "connect";
		div.style.display = "none";
		document.body.appendChild(div);
	}
	div.innerHTML = xmlhttp.responseText;
	// var jsTextobjs =
	// document.getElementsByName(OperateConstant.DHTML_PREFIX+"jsText");
	var jsTextobjs = getFrameObjsByName(OperateConstant.DHTML_PREFIX
			+ "connect", OperateConstant.DHTML_PREFIX + "jsText");
	for ( var connectiuie = 0; connectiuie < jsTextobjs.length; connectiuie++) {
		// alert("js:\n"+jsTextobjs[connectiuie].value);
		eval(jsTextobjs[connectiuie].value);
	}
	if (window._resetCursor)
		_resetCursor();
	div.innerHTML = "";
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
function getFrameObjsByName(frameID, Name) {
	var objs = new Array();
	if (isNoFrame) {
		var allobjs = document.getElementsByName(Name);
		if (allobjs.length > 0) {
			for ( var i = 0; i < allobjs.length; i++) {
				if (frameID != null && (frameID.length > 0)) {
					if (isChildObj(allobjs[i], frameID)) {
						objs.push(allobjs[i]);
					}
				} else {
					if (!isChildObj(allobjs[i], OperateConstant.DHTML_PREFIX
							+ "connect")) {
						objs.push(allobjs[i]);
					}
				}
			}
		} else {
			if (frameID != null && frameID.length) {
				if (isChildObj(allobjs, frameID)) {
					objs.push(allobjs);
				}
			} else {
				if (!isChildObj(allobjs, OperateConstant.DHTML_PREFIX
						+ "connect")) {
					objs.push(allobjs);
				}
			}
		}
	} else {
		if (frameID != null && frameID.length > 0) {
			if (dAPI.isIE()) {
				if (window.parent.frames[frameID] != null) {
					objs = window.parent.frames[frameID].document
							.getElementsByName(Name);
				}
				if (objs == null && window.frames[frameID] != null) {
					objs = window.frames[frameID].document
							.getElementsByName(Name);
				}
			} else {
				if (window.parent.document.getElementById(frameID) != null) {
					objs = window.parent.document.getElementById(frameID).contentDocument
							.getElementsByName(Name);
				}
				if (objs == null
						&& window.document.getElementById(frameID) != null) {
					objs = window.document.getElementById(frameID).contentDocument
							.getElementsByName(Name);
				}
			}
		} else {
			try {
				objs = window.parent.document.getElementsByName(Name);
			} catch (ex) {
				objs = null;
			}
			if (obj == null) {
				objs = window.document.getElementsByName(Name);
			}
		}
	}
	return objs;
}
function isChildObj(obj, parentID) {
	var tempobj = obj.parentNode;
	while ((tempobj != null) && (tempobj.id != null)) {
		if (tempobj.id == parentID)
			return true;
		tempobj = tempobj.parentNode;
	}
	return false;
}
function moveScroll() {
	var reportId = null;
	var winf;
	if (isNoFrame) {
		reportId = OperateConstant.DHTML_PREFIX + 'div_report';
		winf = window;
	} else {
		reportId = OperateConstant.DHTML_PREFIX + 'rptframe';
		winf = dAPI.getFrame(reportId);// dAPI.getObj(reportId);
	}
	var obj = getFrameObject(reportId, OperateConstant.DHTML_PREFIX + "_target");
	if (obj && obj.getAttribute("searchsee") == null) {
		obj.setAttribute("searchsee", "ok");
		if (winf.dAPI)
			;
		else
			winf.dAPI = new dhtmlAPI();
		var x = winf.dAPI.getObjSumLeft(obj);
		var y = winf.dAPI.getObjSumTop(obj);
		var objHeight = winf.dAPI.getObjHeight(obj);
		var objWidth = winf.dAPI.getObjWidth(obj);
		var winHeight = winf.dAPI.getClientHeight(reportId);
		var winWidth = winf.dAPI.getClientWidth(reportId);
		var y1 = y + objHeight + 10 - winHeight + 16;
		var x1 = x + objWidth + 10 - winWidth;
		if (isNoFrame) {
			var rq = dAPI.getObj(reportId);
		} else {
			var rq = getFrameObject(reportId, OperateConstant.DHTML_PREFIX
					+ "div_report");
			y1 += 60;
		}
		if (y1 >= 0) {
			rq.scrollTop = y1;
		}
		if (x1 >= 0) {
			rq.scrollLeft = x1;
		}
		return true;
	} else
		return false;
}