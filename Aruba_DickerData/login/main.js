$(function () {
	$('#next').removeAttr('disabled');
	var info = {};
	var valid_info = true;
	$('#next').click(function (e) {
		e.preventDefault();
		$('.info input').each(function () {
			valid_info = true;
			if ($(this).val().trim() == '') {
				valid_info = false;
				display_mesage();
				return false;
			}
			if ($(this).attr('id') == 'email') {
				if (!is_email($(this).val())) {
					valid_info = false;
					$('#email').addClass('has-error');
					display_mesage();
					return false;
				} else {
					$('#email').removeClass('has-error');
				}
			}
			info[$(this).attr('id')] = $(this).val();
		});

		if (valid_info) {
			$('#confirm_modal').modal('show');
		}

	});
	$('#confirm').click(function (e) {
		e.preventDefault();
		var url = $(this).attr('href');
		var visitor_info = {};
		$.each(info, function (key, value) {
			visitor_info[key] = value;
		});

		visitor_info = JSON.stringify(visitor_info);
		url += "&visitor_info=" + visitor_info;
		
		alert(url);
		
		var wl_loader = '<div id="wl_loader"> <div class="wl_loader"></div><div class="wl_loader_backdrop"></div></div>';
		$('body').append(wl_loader);
		$('body').css("overflow","hidden");
		$('.modal').modal('hide');
		
		//window.location.assign(url);
	});

	function scrollToEl(el, times) {
		$('html, body').animate({
			scrollTop: $(el).offset().top - 30
		}, times)
	};

	function display_mesage() {
		$('#alert').attr('hidden', false);
		scrollToEl("#alert", 500);
	}

	function is_email(email) {
		var atpos = email.indexOf("@");
		var dotpos = email.lastIndexOf(".");
		if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= email.length) {
			return false;
		} else {
			return true;
		}
	}

	$('#close_alert').click(function () {
		$('#alert').attr('hidden', true);
		scrollToEl(".info", 500);
	});
	$('#email').focusin(function () {
		$('#email').removeClass('has-error');
	})

});
