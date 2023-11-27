const VND = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});
let total;
let idCheckOut = localStorage.getItem("idUserLogin");
function checkOutCart() {
  let userBuy = JSON.parse(localStorage.getItem("userList")) || [];
  for (let i = 0; i < userBuy.length; i++) {
    if (userBuy[i].id == idCheckOut) {
      let moneyTotal = 0;
      let textOut = "";
      for (let j = 0; j < userBuy[i].cart.length; j++) {
        textOut += `
            <tr >
                <td class="hiddenTd">${j + 1}</td>
                <td class="hiddenTd">${userBuy[i].cart[j].name}</td>
                <td class="hiddenTd"><img class="imgOut" src=${
                  userBuy[i].cart[j].img
                }></td>
                <td class="hiddenTd">${VND.format(
                  userBuy[i].cart[j].price
                )}</td>
                <td class="hiddenTd">
                  <div class="quantityOut">
                    <span class="quantityBtn" onclick="decrease(${
                      userBuy[i].cart[j].id
                    })"> - </span>
                    <p class="quantityNumber">${
                      userBuy[i].cart[j].quantity
                    } </p>
                    <span class="quantityBtn" onclick="increase(${
                      userBuy[i].cart[j].id
                    })">+</span></td>
                  </div>
                <td class="hiddenTd money">${VND.format(
                  userBuy[i].cart[j].price * userBuy[i].cart[j].quantity
                )}</td>
                <td class="boderHidden">
                  <span onclick="deletePro(${
                    userBuy[i].cart[j].id
                  })" class="material-symbols-outlined deleteProduct">remove_shopping_cart</span>
                </td>
            </tr>
            `;
        moneyTotal += userBuy[i].cart[j].price * userBuy[i].cart[j].quantity;
      }
      document.getElementById("buyTableTotal").innerHTML = textOut;
      document.getElementById("total").innerHTML = `${VND.format(moneyTotal)}`;
      total = moneyTotal;
      break;
    }
  }
}
checkOutCart();

function increase(idProduct) {
  let userIn = JSON.parse(localStorage.getItem("userList")) || [];
  for (let i = 0; i < userIn.length; i++) {
    if (userIn[i].id == idCheckOut) {
      for (let j = 0; j < userIn[i].cart.length; j++) {
        if (userIn[i].cart[j].id == idProduct) {
          userIn[i].cart[j].quantity = ++userIn[i].cart[j].quantity;
          localStorage.setItem("userList", JSON.stringify(userIn));
          checkOutCart();
          break;
        }
      }
    }
  }
}

function decrease(idProduct) {
  let userDe = JSON.parse(localStorage.getItem("userList")) || [];
  for (let i = 0; i < userDe.length; i++) {
    if (userDe[i].id == idCheckOut) {
      for (let j = 0; j < userDe[i].cart.length; j++) {
        if (userDe[i].cart[j].id == idProduct) {
          userDe[i].cart[j].quantity = --userDe[i].cart[j].quantity;
          localStorage.setItem("userList", JSON.stringify(userDe));
          checkOutCart();
          if (userDe[i].cart[j].quantity < 2) {
            userDe[i].cart[j].quantity = 1;
            localStorage.setItem("userList", JSON.stringify(userDe));
            checkOutCart();
          }
        }
      }
    }
  }
}

function deletePro(idProduct) {
  let proDelete = JSON.parse(localStorage.getItem("userList")) || [];
  for (let i = 0; i < proDelete.length; i++) {
    if (proDelete[i].id == idCheckOut) {
      for (let j = 0; j < proDelete[i].cart.length; j++) {
        if (proDelete[i].cart[j].id == idProduct) {
          let confirmOk = confirm("Bạn có muốn xóa sản phẩm không");
          if (confirmOk) {
            proDelete[i].cart.splice(j, 1);
            localStorage.setItem("userList", JSON.stringify(proDelete));
            checkOutCart();
          }
        }
      }
    }
  }
}
function homeBack() {
  window.location.href = "../index/index.html";
}

function payMoney() {
  let user = JSON.parse(localStorage.getItem("userList")) || [];
  let id = localStorage.getItem("idUserLogin");
  for (let i = 0; i < user.length; i++) {
    if (user[i].id == id) {
      if (user[i].cart == "") {
        document.getElementById("showNotice").textContent =
          "Bạn chưa có sản phẩm trong giỏ hàng";
        showPayNotice();
        return;
      }
    }
  }
  document.getElementById("userPay").style.display = "block";
}

function closeClick() {
  document.getElementById("userPay").style.display = "none";
  document.getElementById("nameNotice").textContent = "";
  document.getElementById("emailNotice").textContent = "";
  document.getElementById("phoneNotice").textContent = "";
  document.getElementById("addressNotice").textContent = "";
}

function payProduct() {
  let userList = JSON.parse(localStorage.getItem("userList")) || [];
  let userPayList = JSON.parse(localStorage.getItem("userOrderList")) || [];
  let idPay = localStorage.getItem("idUserLogin");
  let nameValue = document.getElementById("nameInput").value;
  let emailValue = document.getElementById("emailInput").value;
  let phoneValue = document.getElementById("phoneInput").value;
  let addressValue = document.getElementById("address").value || "";
  let noteValue = document.getElementById("note").value;
  let name = false;
  let email = false;
  let phone = false;
  let address = false;

  for (let i = 0; i < userList.length; i++) {
    // xem là thằng nào đang mua
    if (userList[i].id == idPay) {
      var idBuyIndex = i;
      break;
    }
  }

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

  if (!addressValue) {
    document.getElementById("addressNotice").textContent =
      "Bạn chưa nhập địa chỉ";
  } else {
    document.getElementById("addressNotice").textContent = "";
    address = true;
  }

  if (name && email && phone && address) {
    let arrTime = timeBuy();
    let objUser = {
      id: idCheckOut,
      name: nameValue,
      email: emailValue,
      sdt: phoneValue,
      address: addressValue,
      note: noteValue,
      total: total,
      cart: userList[idBuyIndex].cart,
      time: arrTime[0],
      timeSort: arrTime[1],
      status: 1,
    };

    userPayList.push(objUser);
    userList[idBuyIndex].cart = [];
    localStorage.setItem("userList", JSON.stringify(userList));
    localStorage.setItem("userOrderList", JSON.stringify(userPayList));

    document.getElementById("nameInput").value = "";
    document.getElementById("emailInput").value = "";
    document.getElementById("phoneInput").value = "";
    document.getElementById("address").value = "";
    document.getElementById("note").value = "";
    checkOutCart(userList);
    showPayNotice();
  }
}

function timeBuy() {
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
  return [time, timeSort];
}

function showPayNotice() {
  let x = document.getElementById("showNotice");
  x.className = "show";
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 3000);
}
