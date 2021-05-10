$("#phonenew").intlTelInput();

$(document).ready(function(){
	$('#submit').click(function(){

		if($('#main-form').valid()){
			var dataToPost = {
				firstname: $('#firstName').val(),
				lastname:$('#lastName').val(),
				email:$('#email').val(),
				phone:$('#telephone').val().replace('+'+ $("#telephone").intlTelInput("getSelectedCountryData").dialCode, ''),
				prefix:$("#telephone").intlTelInput("getSelectedCountryData").dialCode
			}
			
			$.ajax({
				type:"POST",
				url:"https://leadcaptureapi.herokuapp.com/api/leads",
				data: JSON.stringify(dataToPost),
				dataType: 'JSON',
				success: function(data) {
					console.log(data);
					if(data.status){
						$('#firstName').val('');
						$('#lastName').val('');
						$('#email').val('');
						$('#telephone').val('');
					}
				},
				error: function (jqXHR, exception) {
					var msg = '';
					if (jqXHR.status === 0) {
						msg = 'Not connect.\n Verify Network.';
					} else if (jqXHR.status == 404) {
						msg = 'Requested page not found. [404]';
					} else if (jqXHR.status == 500) {
						msg = 'Internal Server Error [500].';
					} else if (exception === 'parsererror') {
						msg = 'Requested JSON parse failed.';
					} else if (exception === 'timeout') {
						msg = 'Time out error.';
					} else if (exception === 'abort') {
						msg = 'Ajax request aborted.';
					} else {
						msg = 'Uncaught Error.\n' + jqXHR.responseText;
					}
					console.log(exception);
				},
			});
		}



	});
	$(function() {
		$("#main-form").validate({
			rules: {
				firstname: "required",
				lastname: "required",
				email: {
					required: true,
					email: true
				},
				telephone: {
					required: true,
				}
			},
			messages: {
				firstname: "Please enter your firstname",
				lastname: "Please enter your lastname",
				email: "Please enter a valid email address",
				telephone: {
					required: "Please provide a Phone Number",
				},

			},
		});
	});
});
