function userAdmin() {
  let userList = JSON.parse(localStorage.getItem("userList")) || [];
  let text = "";
  for (let i = 0; i < userList.length; i++) {
    text += `
                  <tr>
                    <td class="deleteTr">
                      <span class="material-symbols-outlined deleteUser" onclick="deleteUser(${userList[i].id})">
                        delete
                      </span></td>
                    <td>${i + 1}</td>
                    <td>${userList[i].id}</td>
                    <td>${userList[i].name}</td>
                    <td>${userList[i].email}</td>
                    <td>${userList[i].sdt}</td>
                    <td>
                      <div class="status">
                        <div class="statusLock">
                          <p class="statusLock-p">Lock</p>
                          <span class="material-symbols-outlined statusLock-icon" onclick="statusUserClick(${userList[i].id})">person_off</span>
                        </div>
                        <div class="statusUnlock">
                          <p class="statusUnlock-p">Unlock</p>
                          <span class="material-symbols-outlined statusUnlock-icon" onclick="statusUserClick(${userList[i].id})">person</span>
                        </div>
                      </div>
                    </td>
                    <td>${userList[i].time}</td>
                </tr>
    `;
  }
  document.getElementById("userControl").innerHTML = text;
  for (let j = 0; j < userList.length; j++) {
    if (userList[j].status == 1) {
      document.getElementsByClassName("statusLock")[j].style.display = "none";
    } else {
      document.getElementsByClassName("statusUnlock")[j].style.display = "none";
      document.getElementsByClassName("statusLock")[j].style.display = "block";
    }
  }
}
userAdmin();

function statusUserClick(id) {
  let userStatus = JSON.parse(localStorage.getItem("userList")) || [];
  for (let i = 0; i < userStatus.length; i++) {
    if (userStatus[i].id == id) {
      if (userStatus[i].status == 1) {
        userStatus[i].status = 0;
        localStorage.setItem("userList", JSON.stringify(userStatus));
        userAdmin();
      } else {
        userStatus[i].status = 1;
        localStorage.setItem("userList", JSON.stringify(userStatus));
        userAdmin();
      }
      break;
    }
  }
}
function deleteUser(id) {
  let userDelete = JSON.parse(localStorage.getItem("userList")) || [];
  for (let i = 0; i < userDelete.length; i++) {
    if (userDelete[i].id == id) {
      let confirmDelete = confirm("Bạn có muốn xóa người dùng không");
      if (confirmDelete) {
        userDelete.splice(i, 1);
        localStorage.setItem("userList", JSON.stringify(userDelete));
        userAdmin();
      }
      break;
    }
  }
}
let userSort = JSON.parse(localStorage.getItem("userList")) || [];
function dropUp() {
  userSort.sort(function (a, b) {
    return a.timeSort - b.timeSort;
  });
  localStorage.setItem("userList", JSON.stringify(userSort));
  userAdmin();
}

function dropDown() {
  userSort.sort(function (a, b) {
    return b.timeSort - a.timeSort;
  });
  localStorage.setItem("userList", JSON.stringify(userSort));
  userAdmin();
}
function home() {
  window.location.href="../index/index.html"
}
function orderC() {
  window.location.href="../pages/admin_orderform.html"
}
function productC() {
  window.location.href="../pages/admin_product.html"
}