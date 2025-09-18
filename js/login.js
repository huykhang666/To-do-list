function login(event) {
  event.preventDefault();
  let username = document.getElementById("login-username").value;
  let password = document.getElementById("login-password").value;

  let savedUser = localStorage.getItem("user");
  if (!savedUser) {
    alert("Chưa có tài khoản, vui lòng đăng ký!");
    return;
  }
  savedUser = JSON.parse(savedUser);

  if (username === savedUser.username && password === savedUser.password) {
    localStorage.setItem("loggedIn", "true"); 
    alert("Đăng nhập thành công!");
    window.location.href = "index.html"; 
  } else {
    alert("Sai tên đăng nhập hoặc mật khẩu!");
  }
}

window.onload = function() {
  if (localStorage.getItem("loggedIn") === "true") {
    window.location.href = "index.html";
  }
}
