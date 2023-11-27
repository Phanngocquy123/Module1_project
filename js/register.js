function signUpClick() {
  let userList = JSON.parse(localStorage.getItem("userList")) || [];
  let nameValue = document.getElementById("nameInput").value;
  let emailValue = document.getElementById("emailInput").value;
  let phoneValue = document.getElementById("sdtInput").value;
  let passwordValue = document.getElementById("passwordInput").value;
  let confirmPasswordValue = document.getElementById(
    "confirmPasswordInput"
  ).value;

  let name = false;
  let email = false;
  let phone = false;
  let pass = false;
  let confirmPass = false;

  if (!nameValue) {
    document.getElementById("nameNotice").textContent = "Bạn chưa nhập tên";
  } else {
    document.getElementById("nameNotice").textContent = "";
    name = true;
  }

  if (!emailValue) {
    document.getElementById("emailNotice").textContent = "Bạn chưa nhập email";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
    document.getElementById("emailNotice").textContent =
      "Email bạn nhập chưa đúng";
  } else {
    document.getElementById("emailNotice").textContent = "";
    email = true;
  }

  if (!phoneValue) {
    document.getElementById("phoneNotice").textContent =
      "Bạn chưa nhập số điện thoại";
  } else if (!/^\d{10}$/.test(phoneValue)) {
    document.getElementById("phoneNotice").textContent =
      "Số điện thoại bạn nhập chưa đúng";
  } else {
    document.getElementById("phoneNotice").textContent = "";
    phone = true;
  }

  if (!passwordValue) {
    document.getElementById("passNotice").textContent =
      "Bạn chưa nhập mật khẩu";
  } else if (passwordValue != confirmPasswordValue) {
    document.getElementById("passNotice").textContent = "Mật khẩu không khớp";
  } else {
    document.getElementById("passNotice").textContent = "";
    pass = true;
  }

  if (!confirmPasswordValue) {
    document.getElementById("confirmPassNotice").textContent =
      "Bạn chưa xác nhận mật khẩu";
  } else if (passwordValue != confirmPasswordValue) {
    document.getElementById("confirmPassNotice").textContent =
      "Mật khẩu không khớp";
  } else {
    document.getElementById("confirmPassNotice").textContent = "";
    confirmPass = true;
  }

  if (name && email && phone && pass && confirmPass) {
    let day = new Date();
    let date = day.getDate();
    let month = day.getMonth() + 1;
    let year = day.getFullYear();
    let hours = day.getHours();
    let minutes = day.getMinutes();
    let seconds = day.getSeconds();
    let time = `${date}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
    if (hours == 0) {
      hours = 12;
    }
    month = month < 10 ? "0" + month : month;
    date = date < 10 ? "0" + date : date;
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    let timeSort = `${year}${month}${date}${hours}${minutes}${seconds}`;
    let objUser = {
      name: nameValue,
      email: emailValue,
      sdt: phoneValue,
      password: passwordValue,
      cart: [],
      status: 1,
      time: time,
      timeSort: timeSort,
      id: Math.floor(Math.random() * 6562) + new Date().getMilliseconds(),
    };

    let findUserEmail = userList.findIndex((UserElement) => {
      return UserElement.email == emailValue;
    });
    if (findUserEmail != -1) {
      alert("Email đã được đăng ký");
      return;
    }
    userList.push(objUser);
    localStorage.setItem("userList", JSON.stringify(userList));

    document.getElementById("nameInput").value = "";
    document.getElementById("emailInput").value = "";
    document.getElementById("passwordInput").value = "";
    document.getElementById("confirmPasswordInput").value = "";
    alert("Bạn đã đăng ký thành công");
    signInClick();
  }
}

function signInClick() {
  window.location.href = "../index/index.html";
}

function homeClick() {
  window.location.href = "../index/index.html";
}
