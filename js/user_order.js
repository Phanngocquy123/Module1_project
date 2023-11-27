const VND = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});
let userOrders = [];
function showUserOrder() {
  let Orders = JSON.parse(localStorage.getItem("userOrderList")) || [];
  let userId = localStorage.getItem("idUserLogin");
  for (let i = 0; i < Orders.length; i++) {
    if (Orders[i].id == userId) {
      userOrders.push(Orders[i]);
    }
  }
  let text = "";
  let statusOrder = "";
  for (let j = 0; j < userOrders.length; j++) {
    statusOrder =
      userOrders[j].status == 1 ? "Đang xử lý" : "Đơn hàng đã bị hủy";
    text += `
            <tr class="color">
                <td>${j + 1}</td>
                <td>${userOrders[j].name}</td>
                <td>${userOrders[j].address}</td>
                <td>${userOrders[j].sdt}</td>
                <td>${userOrders[j].time}</td>
                <td>
                    <span class="proDetail" onclick="orderDetail(${
                      userOrders[j].timeSort
                    },${userOrders[j].id})">
                    ${VND.format(userOrders[j].total)}</span>
                </td>
                <td>${userOrders[j].note}</td>
                <td>
                    <span>${statusOrder}</span>
                </td>
            </tr>
            `;
  }
  document.getElementById("showOrders").innerHTML = text;
}
showUserOrder();

function orderDetail(time, id) {
  document.getElementById("orderDetail").style.display = "block";

  let colorBgr = document.getElementsByClassName("color");
  for (let i = 0; i < userOrders.length; i++) {
    if (userOrders[i].id == id && userOrders[i].timeSort == time) {
      iColor = i;
      let detailText = "";
      for (let j = 0; j < userOrders[i].cart.length; j++) {
        detailText += `
                <tr >
                    <td class="hiddenTd">${j + 1}</td>
                    <td class="hiddenTd">${userOrders[i].cart[j].name}</td>
                    <td class="hiddenTd"><img class="imgDetail" src=${
                      userOrders[i].cart[j].img
                    }></td>
                    <td class="hiddenTd">${VND.format(
                      userOrders[i].cart[j].price
                    )}</td>
                    <td class="hiddenTd">${userOrders[i].cart[j].quantity}</td>
                    <td class="hiddenTd">${VND.format(
                      userOrders[i].cart[j].price *
                        userOrders[i].cart[j].quantity
                    )}</td>
                 </tr>
                `;
      }
      document.getElementById("detailTotal").innerHTML = detailText;
      document.getElementById("total").innerHTML = VND.format(
        userOrders[i].total
      );
      for (let j = 0; j < colorBgr.length; j++) {
        colorBgr[j].classList.remove("colorActived");
      }
      colorBgr[i].classList.add("colorActived");
      colorAc(iColor);
      break;
    }
  }
}

function closeClick() {
  document.getElementById("orderDetail").style.display = "none";
  let colorClose = document.getElementsByClassName("color");
  for (let j = 0; j < colorClose.length; j++) {
    colorClose[j].classList.remove("colorActived");
  }
}

function home() {
  window.location.href = "../index/index.html";
}
