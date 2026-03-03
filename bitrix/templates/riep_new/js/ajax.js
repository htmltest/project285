$(document).ready(function() {

	$('#feedback').submit(function(e) {
	  e.preventDefault();
	  $.ajax({
		type: $(this).attr('method'),
		url: $(this).attr('action'),
		data: $(this).serialize(),
		async: true,
		dataType: "json",
		success: function(result){
			if (result['err'].length>0)
			{
			 $('.err-fb').html('<div class="form-error"><div class="form-error-title">Ошибка отправки формы</div><div class="form-error-text">'+result['err']+'</div></div>');
			}
			else
			{
			 $('.feedback-form').html('<div class="form-success"><div class="form-success-title">Спасибо, Ваше обращение принято!</div><div class="form-success-text">'+result['done']+'</div></div>');
			}
		}
	  });
	});

	$('body').on('submit', '#fbsearch', function(e) {
	  e.preventDefault();
	  $.ajax({
		type: $(this).attr('method'),
		url: $(this).attr('action'),
		data: $(this).serialize(),
		async: true,
		dataType: "html",
		success: function(result){
		  $('.feedback-results').html(result);
		}
	  });
	});


	$('body').on('submit', '#webinar-quest', function(e) {
	  e.preventDefault();
	  $.ajax({
		type: $(this).attr('method'),
		url: $(this).attr('action'),
		data: $(this).serialize(),
		async: true,
		dataType: "json",
		success: function(result){
			if (result['err'].length>0)
			{
			 $('.webinar-q-res').html('<div class="form-error"><div class="form-error-title">Ошибка отправки формы</div><div class="form-error-text">'+result['err']+'</div></div>');
			}
			else
			{
				var title = 'Спасибо, Ваше обращение принято!';
				if ( result['title'] )
				{
					title = result['title'];
				}
				
			 $('.webinar-q-res').html('<div class="form-success"><div class="form-success-title">' + title + '</div><div class="form-success-text">'+result['done']+'</div></div>');
			
				$( '#webinar-quest' ).remove();
			}
		},
		error: function(jqXHR, exception)
		{
		if (jqXHR.status === 0) {
		alert('НЕ подключен к интернету!');
		} else if (jqXHR.status == 404) {
		alert('НЕ найдена страница запроса [404])');
		} else if (jqXHR.status == 500) {
		alert('НЕ найден домен в запросе [500].');
		} else if (exception === 'parsererror') {
		alert("Ошибка в коде: \n"+jqXHR.responseText);
		} else if (exception === 'timeout') {
		alert('Не ответил на запрос.');
		} else if (exception === 'abort') {
		alert('Прерван запрос Ajax.');
		} else {
		alert('Неизвестная ошибка:\n' + jqXHR.responseText);
		}
		}
	  });
	});

	$('body').on('submit', '#webinar-record', function(e) {
	  e.preventDefault();
	  $.ajax({
		type: $(this).attr('method'),
		url: $(this).attr('action'),
		data: $(this).serialize(),
		async: true,
		dataType: "json",
		success: function(result){
			if (result['err'].length>0)
			{
			 $('.webinar-rec-res').html('<div class="form-error"><div class="form-error-title">Ошибка отправки формы</div><div class="form-error-text">'+result['err']+'</div></div>');
			}
			else
			{
			 $('.webinar-rec-res').html('<div class="form-success"><div class="form-success-title">Спасибо, Ваша заявка принята!</div><div class="form-success-text">'+result['done']+'</div></div>');
			}

		},
		error: function(jqXHR, exception)
		{
		if (jqXHR.status === 0) {
		alert('НЕ подключен к интернету!');
		} else if (jqXHR.status == 404) {
		alert('НЕ найдена страница запроса [404])');
		} else if (jqXHR.status == 500) {
		alert('НЕ найден домен в запросе [500].');
		} else if (exception === 'parsererror') {
		alert("Ошибка в коде: \n"+jqXHR.responseText);
		} else if (exception === 'timeout') {
		alert('Не ответил на запрос.');
		} else if (exception === 'abort') {
		alert('Прерван запрос Ajax.');
		} else {
		alert('Неизвестная ошибка:\n' + jqXHR.responseText);
		}
		}

	  });
	});

	$('.reloadCaptcha').on('click',function(e){
		e.preventDefault();
		$.ajax({
			type: "POST",
			url: "/reload_captcha.php",
			data: "",
			processData:  false,
			dataType: "json",
			async: true,
			success: function(result){
				$('.captchaImg').attr('src', '/bitrix/tools/captcha.php?captcha_sid='+result);
				$('.captchaSid').val(result);
			},
			error: function(jqXHR, exception)	{
				alert (jqXHR.status);
		}
		});
	});

});