<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">
<head>
<meta charset="utf-8" />
<title>jQuery UI Tooltip - Custom Styling</title>
<link rel="stylesheet" href="http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css" />
<script src="http://code.jquery.com/jquery-1.9.1.js"></script>
<script src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
<link rel="stylesheet" href="/resources/demos/style.css" />
<script>
$(function() {
$( document ).tooltip({
position: {
my: "center bottom-20",
at: "center top",
using: function( position, feedback ) {
$( this ).css( position );
$( "<div>" )
.addClass( "arrow" )
.addClass( feedback.vertical )
.addClass( feedback.horizontal )
.appendTo( this );
}
}
});
});
</script>
<style>
.ui-tooltip, .arrow:after {
background: black;
border: 2px solid white;
}
.ui-tooltip {
padding: 10px 20px;
color: white;
border-radius: 20px;
font: bold 14px "Helvetica Neue", Sans-Serif;
text-transform: uppercase;
box-shadow: 0 0 7px black;
}
.arrow {
width: 70px;
height: 16px;
overflow: hidden;
position: absolute;
left: 50%;
margin-left: -35px;
bottom: -16px;
}
.arrow.top {
top: -16px;
bottom: auto;
}
.arrow.left {
left: 20%;
}
.arrow:after {
content: "";
position: absolute;
left: 20px;
top: -20px;
width: 25px;
height: 25px;
box-shadow: 6px 5px 9px -9px black;
-webkit-transform: rotate(45deg);
-moz-transform: rotate(45deg);
-ms-transform: rotate(45deg);
-o-transform: rotate(45deg);
tranform: rotate(45deg);
}
.arrow.top:after {
bottom: -20px;
top: auto;
}
</style>
</head>
<body>
<p><a href="#" title="That's what this widget is">Tooltips</a> can be attached to any element. When you hover
the element with your mouse, the title attribute is displayed in a little box next to the element, just like a native tooltip.</p>
<p>But as it's not a native tooltip, it can be styled. Any themes built with
<a href="http://themeroller.com" title="ThemeRoller: jQuery UI's theme builder application">ThemeRoller</a>
will also style tooltips accordingly.</p>
<p>Tooltips are also useful for form elements, to show some additional information in the context of each field.</p>
<p><label for="age">Your age:</label> <input id="age" title="We ask for your age only for statistical purposes." /></p>
<p>Hover the field to see the tooltip.</p>

<div style="position: absolute;top: 300px;left: 400px" title="his">
	His mind
</div>


</body>
</html>

