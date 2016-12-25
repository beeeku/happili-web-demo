
var options = {model_style:'position: absolute; bottom: 0%; width:20%; right: 0%; color:#000; background-color:#ff4755; display: none;', setHeading:'Feedback Form'};

var newDiv = document.createElement("div");
// Create Div Element

var newForm = document.createElement("form");
var newLine = document.createElement("br");
var newLine1 = document.createElement("br");
var newLine2 = document.createElement("br");
// var newLine3 = document.createElement("br");
// var newLine4 = document.createElement("br");

newForm.setAttribute("id", "hack-form");
// newForm.setAttribute("onSubmit", "hackFormSubmit");

var nameInput = document.createElement("input");
nameInput.setAttribute("name", "name");
nameInput.setAttribute("id", "form-name");
nameInput.setAttribute("required", "required");
nameInput.setAttribute("pattern", "[\\w ]{3,}");
nameInput.setAttribute("style", "width:100%");
nameInput.setAttribute("placeholder", "Please enter your name");
newForm.appendChild(nameInput);
newForm.appendChild(newLine1);

var telInput = document.createElement("input");
telInput.setAttribute("name", "tel");
telInput.setAttribute("id", "form-tel");
telInput.setAttribute("required", "required");
telInput.setAttribute("pattern", "\\d{10,14}");
telInput.setAttribute("style", "width:100%");
telInput.setAttribute("placeholder", "Please enter your phone number");
newForm.appendChild(telInput);

var feedbackTextarea = document.createElement("textarea");
feedbackTextarea.setAttribute("name", "feedback");
feedbackTextarea.setAttribute("id", "form-feedback");
feedbackTextarea.setAttribute("required", "required");
feedbackTextarea.setAttribute("style", "width:100%");
feedbackTextarea.setAttribute("placeholder", "Please enter your feedback message");
newForm.appendChild(newLine2);
newForm.appendChild(feedbackTextarea);

var submitButton = document.createElement("input");
submitButton.setAttribute("type", "submit");
newForm.appendChild(newLine);
newForm.appendChild(submitButton);

var newContent = document.createTextNode(options.setHeading);
newDiv.appendChild(newContent); //add the text node to the newly created div.

var hideDiv = document.createElement("div");
hideDiv.setAttribute('style', "display: inline-block; float: right; border: 1px solid; padding: 0 6px;");
hideDiv.setAttribute('onClick', "hideForm()");
var hideContent = document.createTextNode("-");
hideDiv.appendChild(hideContent);
newDiv.appendChild(hideDiv);

newDiv.appendChild(newForm);

newDiv.setAttribute("style", options.model_style);
newDiv.setAttribute("id", "hack-id");
// Set Attributes


var anotherContent = document.createTextNode('Feedback Form');
var anotherDiv = document.createElement("div");
anotherDiv.appendChild(anotherContent);
anotherDiv.setAttribute("id", "display-id");
anotherDiv.setAttribute("onClick", "displayForm()");
anotherDiv.setAttribute("style", 'position: absolute; bottom: 0%; width:20%; right: 0%; color:#000; background-color:#ff4755; display: block;');

document.body.appendChild(newDiv);
document.body.appendChild(anotherDiv);

if(newForm.addEventListener){
	newForm.addEventListener("submit", hackFormSubmit);
}else if(newForm.attachEvent){
    newForm.attachEvent('onsubmit', hackFormSubmit);            //Old IE
}

function hideForm()
{
	document.getElementById('hack-id').setAttribute("style", 'display: none;');
	document.getElementById('display-id').setAttribute("style", 'position: absolute; bottom: 0%; width:20%; right: 0%; color:#000; background-color:#ff4755; display: block;');
}

function displayForm()
{
	document.getElementById('display-id').setAttribute("style", 'display: none;');
	document.getElementById('hack-id').setAttribute("style", 'position: absolute; bottom: 0%; width:20%; right: 0%; color:#000; background-color:#ff4755; display: block;');
}

function validateHackForm() {
	n = document.getElementById('form-name');
	if( n.value.length > 2 )
	{
		valid = true;
	}
	else
	{
		n.focus();
		alert('Please fill your name');
		return false;
	}
	t = document.getElementById('form-tel');
	if( t.value.length > 9 )
	{
		valid = true;
	}
	else
	{
		t.focus();
		alert('Please fill your telephone properly');
		return false;
	}
	f = document.getElementById('form-feedback');
	if( f.value.length > 0 )
	{
		valid = true;
	}
	else
	{
		f.focus();
		alert('Please leave your feedback properly');
		return false;
	}

	return true;
}

function hackFormSubmit(e)
{
	e.preventDefault();

	isValid = validateHackForm();
	if(isValid === true)
	{
		function postAsync(url2get, sendstr) {
			var req;
			if (window.XMLHttpRequest) {
				req = new XMLHttpRequest();
			} else if (window.ActiveXObject) {
				req = new ActiveXObject("Microsoft.XMLHTTP");
			}
			if (req != undefined) {
				// req.overrideMimeType("application/json"); // if request result is JSON
				try {
					req.open("POST", url2get, false); // 3rd param is whether "async"
				}
				catch(err) {
					alert("couldnt complete request. Is JS enabled for that domain?\\n\\n" + err.message);
					return false;
				}

				//Send the proper header information along with the request
				req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

				// console.log(sendstr);
				req.send(sendstr); // param string only used for POST

				if (req.readyState == 4) { // only if req is "loaded"
					if (req.status == 200)  // only if "OK"
						{ return req.responseText ; }
					else { return "XHR error: " + req.status +" "+req.statusText; }
				}
			}
			alert("req for getAsync is undefined");
		}

		var var_str = "name=" + document.getElementById('form-name').value  + "&contactNumber=" + document.getElementById('form-tel').value+ "&feedback=" + document.getElementById('form-feedback').value;
		var url = 'http://52.74.252.4:8081/scoreFeedback';
		var ret = postAsync(url, var_str) ;
			// hint: encodeURIComponent()

		if (ret.match(/^XHR error/)) {
			console.log(ret);
			return;
		}

		style = document.getElementById('hack-id').getAttribute('style').split(';');
		var style_m = {};
		var style_sp;

		style.forEach(function (item, index) {
			wr = item.trim();
			// console.log(wr);
			if(wr.length > 0)
			{
				style_sp = wr.split(':');
				// console.log(style_sp);
				style_m[ style_sp[0].trim() ] = style_sp[1].trim();
			}
		});

		style_m['display'] = 'none';
		style_f = [];
		for (var key in style_m) {
			style_f.push(key+':'+style_m[key]);
		}

// 		style_f = style_m.map(function(elem){
// 			console.log(elem);
//     // return elem.name;
// }).join(",");
		document.getElementById('hack-id').setAttribute('style', style_f.join(';'));
		style_m['display'] = 'block';
		style_f = [];
		for (var key in style_m) {
			style_f.push(key+':'+style_m[key]);
		}

		ret = JSON.parse(ret);

		document.getElementById('display-id').innerHTML = ret.speech;
		document.getElementById('display-id').setAttribute('style', style_f.join(';'));

		// alert('Form submit request sent');
	}
	else
	{
		// alert('Please correct errors');
	}
	return false;
}

// var node = document.getElementById('hack-id');
// console.log(node);
// node.innerHTML('<form><input name="name" placeholder="Please enter your name"><input name="tel" placeholder="Please enter your phone number"><textarea name="feedback"></textarea><input type="submit"><br></form>');
