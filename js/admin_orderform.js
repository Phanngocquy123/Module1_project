const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
function showOrderForm() {
    let Orders=JSON.parse(localStorage.getItem("userOrderList"))||[]
    let text=""
    for (let i = 0; i < Orders.length; i++) {
        text+=
`
            <tr class="color">
                <td>${i+1}</td>
                <td>${Orders[i].id}</td>
                <td>${Orders[i].name}</td>
                <td>${Orders[i].address}</td>
                <td>${Orders[i].sdt}</td>
                <td>${Orders[i].time}</td>
                <td>
                    <span class="proDetail" onclick="orderDetail(${Orders[i].timeSort},${Orders[i].id})">${VND.format(Orders[i].total)}</span>
                </td>
                <td>${Orders[i].note}</td>
                <td>
                    <button class="btnConfirm" onclick="confirmOrder(${Orders[i].timeSort},${Orders[i].id})">Xác nhận</button>
                    <button class="btnCancel" onclick="cancelOrder(${Orders[i].timeSort},${Orders[i].id})">Hủy Đơn</button>
                </td>
                <td>
                    <span onclick="deleteClick(${Orders[i].timeSort},${Orders[i].id})" class="material-symbols-outlined deleteBtn">close</span>
                </td>
            </tr>
`
    }
    document.getElementById("showOrders").innerHTML=text
    for (let j = 0; j < Orders.length; j++) {
        if (Orders[j].status==1) {
            document.getElementsByClassName("btnCancel")[j].style.opacity=0.1
        }else{
            document.getElementsByClassName("btnConfirm")[j].style.opacity=0.1
            document.getElementsByClassName("btnCancel")[j].style.opacity=1
        }
    }
}
showOrderForm()


function orderDetail(time,id) {
    document.getElementById("orderDetail").style.display="block"
    let detailList=JSON.parse(localStorage.getItem("userOrderList"))||[]
    let colorBgr=document.getElementsByClassName("color")
    for (let i = 0; i < detailList.length; i++) {
        if (detailList[i].id==id&&detailList[i].timeSort==time) {
            iColor=i
            let detailText=""
            for (let j = 0; j < detailList[i].cart.length; j++) {
                detailText+=
                `
                <tr >
                    <td class="hiddenTd">${j + 1}</td>
                    <td class="hiddenTd">${detailList[i].cart[j].name}</td>
                    <td class="hiddenTd"><img class="imgDetail" src=${detailList[i].cart[j].img}></td>
                    <td class="hiddenTd">${VND.format(detailList[i].cart[j].price)}</td>
                    <td class="hiddenTd">${detailList[i].cart[j].quantity}</td>
                    <td class="hiddenTd">${VND.format(detailList[i].cart[j].price * detailList[i].cart[j].quantity)}</td>
                 </tr>
                `
            }
        document.getElementById("detailTotal").innerHTML=detailText
        document.getElementById("total").innerHTML=VND.format(detailList[i].total)
            for (let j = 0; j < colorBgr.length; j++) {
                colorBgr[j].classList.remove("colorActived")
            }
            colorBgr[i].classList.add("colorActived")
            colorAc(iColor)
        break;
        }
    }
}


function closeClick() {
    document.getElementById("orderDetail").style.display="none"
    let colorClose=document.getElementsByClassName("color")
    for (let j = 0; j < colorClose.length; j++) {
        colorClose[j].classList.remove("colorActived")
    }
}
function confirmOrder(time,id) {
    let userConfirm=JSON.parse(localStorage.getItem("userOrderList"))||[]
    for (let i = 0; i < userConfirm.length; i++) {
        if (userConfirm[i].id==id&&userConfirm[i].timeSort==time) {
                userConfirm[i].status=1
                localStorage.setItem("userOrderList",JSON.stringify(userConfirm))
                document.getElementsByClassName("btnCancel")[i].style.opacity=0.1
                document.getElementsByClassName("btnConfirm")[i].style.opacity=1
                break
        } 
    }
}

function cancelOrder(time,id) {
    let userCancel=JSON.parse(localStorage.getItem("userOrderList"))||[]
    for (let i = 0; i < userCancel.length; i++) {
        if (userCancel[i].id==id&&userCancel[i].timeSort==time) {
                userCancel[i].status=0
                localStorage.setItem("userOrderList",JSON.stringify(userCancel))
                document.getElementsByClassName("btnCancel")[i].style.opacity=1
                document.getElementsByClassName("btnConfirm")[i].style.opacity=0.1
                break
        } 
    }
}

function deleteClick(time,id) {
    let userD=JSON.parse(localStorage.getItem("userOrderList"))||[]
    for (let i = 0; i < userD.length; i++) {
        if (userD[i].id==id&&userD[i].timeSort==time) {
            let isDelete = confirm("Bạn có muốn xóa người dùng không");
            console.log("dd");
            if (isDelete) {
                userD.splice(i,1)
                localStorage.setItem("userOrderList",JSON.stringify(userD))
                showOrderForm()
            }
            break;
        } 
    }
}

function home() {
    window.location.href="../index/index.html"
}
function productC() {
    window.location.href="../pages/admin_product.html"
}
function userC() {
    window.location.href="../pages/admin_user.html"
}
