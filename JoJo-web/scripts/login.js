$().ready(function(){
	$("#login_form").validate({
		rules:{
			username:{
				required: true,
				minlength: 11,
				maxlength: 11,
				digits: true
			},
			password:{
				required: true,
				minlength: 6
			},
		},
		messages:{
			username: "请输入您的11位手机号登录",
			password: "请输入您的登录密码,至少6位"
		}
	});
	$("#register_form").validate({
		rules:{
			username: {
				required: true,
				minlength: 11,
				maxlength: 11,
				digits: true
			},
			password: {
				required: true,
				minlength: 6
			},
			rpassword:{
				equalTo: "#register_password"
			},
		},
		messages: {
			username: "请输入11位手机号作为用户名",
			password: "请输入至少6位密码",
			rpassword: "请重复您刚才输入的密码"
		}
	})
});

$(function(){
	$("#register_btn").click(function(){
		$("#register_form").css("display","block");
		$("#login_form").css("display","none");
	});
	$("#back_btn").click(function(){
		$("#register_form").css("display","none");
		$("#login_form").css("display","block");
	})
});

$("#login_submit").click(function(){
	var loginname = $("#loginname").val();
	var loginpassword = $("#loginpassword").val();
	console.log(loginname+loginpassword);

	$.ajax({
		type: "post",
		url: "https://localhost:8080/login",
		dataType:'json',
		data:{
			username: loginname,
			password: loginpassword
		},
		success:function(data){
			if(data.message=="false"){
				alert('密码不正确，请重新输入');
				window.location.href = "login.html";
			}else{
				alert("登录成功");
				window.location.href="index.html";
			}
		}
	});

})