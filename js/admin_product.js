function showProductControl() {
  let productControl = JSON.parse(localStorage.getItem("products"));
  let text = "";
  for (let i = 0; i < productControl.length; i++) {
    text += `
              <tr class="colorEdit">
                  <td>${i + 1}</td>
                  <td>${productControl[i].name}</td>
                  <td>${productControl[i].id}</td>
                  <td><img id="imgBolt" src="${
                    productControl[i].img
                  }" alt=""> </td>
                  <td>${productControl[i].price}</td>
                  <td>
                    <div class="status">               
                      <div class="onOffStatus onStatus">
                          <span>On</span>
                          <div class="onStatus-cover" onclick="statusClick(${productControl[i].id})">
                            <div class="onStatus-circl"></div>
                          </div>
                      </div>

                      <div class="onOffStatus offStatus" onclick="statusClick(${productControl[i].id})">
                          <span>Off</span>
                          <div class="offStatus-cover">
                            <div class="offStatus-circl"></div>
                          </div>
                      </div>
                    </div>  
                  </td>
                  <td><button class="editDelete" onclick="editClick(${productControl[i].id})">Sửa</button></td>
                  <td><button class="editDelete" onclick="deleteClick(${productControl[i].id})">Xóa</button></td>
              </tr>
              `;
  }
  document.getElementById("productsCtl").innerHTML = text;
  for (let j = 0; j < productControl.length; j++) {
    if (productControl[j].status == true) {
      document.getElementsByClassName("offStatus")[j].style.display = "none";
    } else {
      document.getElementsByClassName("onStatus")[j].style.display = "none";
      document.getElementsByClassName("offStatus")[j].style.display = "block";
    }
  }
}
showProductControl();

function statusClick(idOnOff) {
  let productStatus = JSON.parse(localStorage.getItem("products"));
  for (let i = 0; i < productStatus.length; i++) {
    if (productStatus[i].id == idOnOff) {
      if (productStatus[i].status == true) {
        productStatus[i].status = false;
        localStorage.setItem("products", JSON.stringify(productStatus));
        document.getElementsByClassName("onStatus")[i].style.display = "none"; /* Không gọi lại hàm show */
        document.getElementsByClassName("offStatus")[i].style.display = "block";
      } else {
        productStatus[i].status = true;
        localStorage.setItem("products", JSON.stringify(productStatus));
        document.getElementsByClassName("onStatus")[i].style.display = "block"; /* Không gọi lại hàm show */
        document.getElementsByClassName("offStatus")[i].style.display = "none";
      }
    }
  }
}

function deleteClick(id) {
  let productDelete = JSON.parse(localStorage.getItem("products"));
  for (let i = 0; i < productDelete.length; i++) {
    if (productDelete[i].id == id) {
      let confirmDelete = confirm("Bạn có muốn xóa không");
      if (confirmDelete) {
        productDelete.splice(i, 1);
        localStorage.setItem("products", JSON.stringify(productDelete));
        showProductControl();
      }
    }
  }
}
let idEdit = "";
function editClick(id) {
  document.getElementsByClassName("contentP")[0].textContent = "Sửa sản phẩm";
  document.getElementsByClassName("cancelBtn")[0].style.display = "block";
  let productEdit = JSON.parse(localStorage.getItem("products"));
  idEdit = id;
  for (let i = 0; i < productEdit.length; i++) {
    if (productEdit[i].id == id) {
      let imgEdit = `
                    <img id="imgEdit"  src="${productEdit[i].img}">
                    `;
      document.getElementById("spaceImg").innerHTML = imgEdit;
      document.getElementById("addNameProduct").value = productEdit[i].name;
      document.getElementById("addPriceProduct").value = productEdit[i].price;
      document.getElementsByClassName("addBtn")[0].textContent = "Sửa";

      let color = document.getElementsByClassName("colorEdit");
      for (let j = 0; j < color.length; j++) {
        color[j].classList.remove("bgrActived");
      }
      color[i].classList.add("bgrActived");
      break;
    }
  }
}

function cancelEdit() {
  document.getElementsByClassName("addBtn")[0].textContent = "Thêm";
  document.getElementsByClassName("contentP")[0].textContent = "Thêm sản phẩm";
  document.getElementById("addNameProduct").value = "";
  document.getElementById("addPriceProduct").value = "";
  document.getElementById("spaceImg").innerHTML = "";
  document.getElementsByClassName("cancelBtn")[0].style.display = "none";
  let colorC = document.getElementsByClassName("colorEdit");
  for (let j = 0; j < colorC.length; j++) {
        colorC[j].classList.remove("bgrActived");
      }
}

let imgBase64 = "";
function changeImage(a) {
  /* console.log(a); */
  var fileImg = a.files[0];
  /* console.log("aaaa",fileImg); */
  var khoiTao = new FileReader();
  khoiTao.onloadend = function name(params) {
    /* console.log(khoiTao.result); */
    imgBase64 = khoiTao.result;
    imgInput(imgBase64);
  };
  khoiTao.readAsDataURL(fileImg);
}

function imgInput(image) {
  console.log("aa");
  let textImg = `
  <img id="spaceImg-img"  src="${image}">
  `;
  document.getElementById("spaceImg").innerHTML = textImg;
}

function addProduct() {
  let productSave = JSON.parse(localStorage.getItem("products")) || [];
  let nameValue = document.getElementById("addNameProduct").value;
  let priceValue = document.getElementById("addPriceProduct").value;

  if (idEdit) {
    for (let i = 0; i < productSave.length; i++) {
      if (productSave[i].id == idEdit) {
        productSave[i].name = nameValue;
        productSave[i].price = priceValue;
        if (imgBase64) {
          productSave[i].img = imgBase64;
        }
        localStorage.setItem("products", JSON.stringify(productSave));
        showProductControl();
        cancelEdit()
        idEdit=""
        imgBase64=""
        return;
      }
    }
  } else {
    let addObj = {
      name: nameValue,
      price: priceValue,
      img: imgBase64,
      status: true,
      id: Math.floor(Math.random() * 84898) + new Date().getMilliseconds(),
    };
    productSave.push(addObj);
    localStorage.setItem("products", JSON.stringify(productSave));
    showProductControl();
    cancelEdit();
    imgBase64="";
  }
}

function home() {
  window.location.href="../index/index.html"
}
function orderC() {
  window.location.href="../pages/admin_orderform.html"
}
function userC() {
  window.location.href="../pages/admin_user.html"
}