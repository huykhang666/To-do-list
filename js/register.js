function register(event) {
  event.preventDefault();
  let username = document.getElementById("reg-username").value;
  let password = document.getElementById("reg-password").value;
  let confirm = document.getElementById("reg-confirm").value;

  if (password !== confirm) {
    alert("Mật khẩu nhập lại không khớp!");
    return;
  }

  let user = { username, password };
  localStorage.setItem("user", JSON.stringify(user));
  alert("Đăng ký thành công!");
  window.location.href = "login.html"; 
}
