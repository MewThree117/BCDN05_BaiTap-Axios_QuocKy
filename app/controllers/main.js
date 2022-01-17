var userSevices = new UserSevices();
var validation = new Validation();
// var mangND = userSevices.layDS().then(function (result) {let mangND = result.data;}).catch(function(error){console.log(error);});

function layDSND() {
    userSevices.layDS()
    .then(function (result) {
        // thành công
        // console.log(result.data);
        hienthDS(result.data)
        // let mangND = result.data;
        // console.log(mangND);
    })
    .catch(function(error){
        //thất bại
        console.log(error);
    });
}

layDSND();


function hienthDS(mangUser) {
    // console.log(mangUser);
    var content = "";
    mangUser.map(function(user, index){
        content += `
            <tr>
                <td>${user.id}</td>
                <td>${user.taiKhoan}</td>
                <td>${user.matKhau}</td>
                <td>${user.hoTen}</td>
                <td>${user.email}</td>
                <td>${user.ngonNgu}</td>
                <td>${user.loaiND}</td>
                <td>
                    <button class="btn btn-danger" onclick="xoaUser('${user.id}')">Xóa</button>
                    <button class="btn btn-success" data-toggle="modal" data-target="#myModal" onclick="xemChiTiet('${user.id}')">Xem</button>
                </td>
            </tr>`;
    });
    document.getElementById("tblDanhSachNguoiDung").innerHTML = content;
}

document.getElementById("btnThemNguoiDung").addEventListener("click", function(){
    document.querySelector("#myModal .modal-footer").innerHTML = 
    `<button class="btn btn-success" onclick="themUser()">Thêm</button>`
})

// thêm user
function themUser() {
    var account = document.getElementById("TaiKhoan").value;
    var hoten = document.getElementById("HoTen").value;
    var pass = document.getElementById("MatKhau").value;
    var email = document.getElementById("Email").value;
    var loaind = document.getElementById("loaiNguoiDung").value;
    var ngonngu = document.getElementById("loaiNgonNgu").value;
    var mota = document.getElementById("MoTa").value;
    var hinh = document.getElementById("HinhAnh").value;

    // Kiểm tra dữ liệu
    var isValid = true;
    isValid = validation.checkEmpty(account, "spanTK", "Tài khoản không được để trống");
    // && validation.checkID(account, "spanTK", "Tài khoản không được trùng",mangND);

    isValid &= validation.checkEmpty(hoten, "spanName", "Họ tên không được để trống")
    && validation.checkName(hoten, "spanName", "Họ tên không được chứa kí tự đặc biệt");

    isValid &= validation.checkEmpty(pass, "spanPass", "Mật khẩu không được để trống")
    && validation.checkPass(pass, "spanPass", "Mật khẩu có ít nhất 1 ký tự hoa, 1 ký tự đặc biệt, 1 ký tự số, độ dài 6-8");

    isValid &= validation.checkEmpty(email, "spanEmail", "Email không được để trống")
    && validation.checkEmail(email, "spanEmail", "Email không đúng");

    isValid &= validation.checkSelect("loaiNguoiDung", "spanLoaiND", "Chưa chọn loại người dùng");
    isValid &= validation.checkSelect("loaiNgonNgu", "spanLoaiNN", "Chưa chọn loại ngôn ngữ");
    isValid &= validation.checkEmpty(hinh, "spanHinh", "Hình Ảnh không được để trống");
    
    isValid &= validation.checkEmpty(mota, "spanMoTa", "Mô tả không được để trống")
    && validation.checkLength(mota, "spanMoTa", "Mô tả không được vượt quá 60 ký tự");

    if(isValid) {
        var user = new Users(account,hoten,pass,email,loaind,ngonngu,mota,hinh);
        // console.log(user);
        userSevices.themND(user)
        .then(function(result){
            layDSND();
            document.querySelector("#myModal .close").click();
        })
        .catch(function(error){
            console.log(error);
        })
    }
}

// xóa user
function xoaUser(id) {
    userSevices.xoaND(id)
    .then(function(result){
        layDSND();
    })
    .catch(function(error){
        console.log(error);
    })
}

// xem chi tiết
function xemChiTiet(id) {

    userSevices.layChiTiet(id)
    .then(function(result){
        document.getElementById("TaiKhoan").value = result.data.taiKhoan;
        document.getElementById("HoTen").value = result.data.hoTen;
        document.getElementById("MatKhau").value = result.data.matKhau;
        document.getElementById("Email").value = result.data.email;
        document.getElementById("loaiNguoiDung").value = result.data.loaiND;
        document.getElementById("loaiNgonNgu").value = result.data.ngonNgu;
        document.getElementById("MoTa").value = result.data.moTa;
        document.getElementById("HinhAnh").value = result.data.hinhAnh;
        document.querySelector("#myModal .modal-footer").innerHTML = 
        `<button class="btn btn-success" onclick="capNhatUser('${result.data.id}')">Cập nhật</button>`
    })
}

// cập nhật user
function capNhatUser(id) {
    var account = document.getElementById("TaiKhoan").value;
    var hoten = document.getElementById("HoTen").value;
    var pass = document.getElementById("MatKhau").value;
    var email = document.getElementById("Email").value;
    var loaind = document.getElementById("loaiNguoiDung").value;
    var ngonngu = document.getElementById("loaiNgonNgu").value;
    var mota = document.getElementById("MoTa").value;
    var hinh = document.getElementById("HinhAnh").value;

    var isValid = true;
    isValid = validation.checkEmpty(account, "spanTK", "Tài khoản không được để trống");
    // && validation.checkID(account, "spanTK", "Tài khoản không được trùng",mangND);

    isValid &= validation.checkEmpty(hoten, "spanName", "Họ tên không được để trống")
    && validation.checkName(hoten, "spanName", "Họ tên không được chứa kí tự đặc biệt");

    isValid &= validation.checkEmpty(pass, "spanPass", "Mật khẩu không được để trống")
    && validation.checkPass(pass, "spanPass", "Mật khẩu có ít nhất 1 ký tự hoa, 1 ký tự đặc biệt, 1 ký tự số, độ dài 6-8");

    isValid &= validation.checkEmpty(email, "spanEmail", "Email không được để trống")
    && validation.checkEmail(email, "spanEmail", "Email không đúng");

    isValid &= validation.checkSelect("loaiNguoiDung", "spanLoaiND", "Chưa chọn loại người dùng");
    isValid &= validation.checkSelect("loaiNgonNgu", "spanLoaiNN", "Chưa chọn loại ngôn ngữ");
    isValid &= validation.checkEmpty(hinh, "spanHinh", "Hình Ảnh không được để trống");
    
    isValid &= validation.checkEmpty(mota, "spanMoTa", "Mô tả không được để trống")
    && validation.checkLength(mota, "spanMoTa", "Mô tả không được vượt quá 60 ký tự");

    if(isValid) { 
        var user = new Users(account,hoten,pass,email,loaind,ngonngu,mota,hinh);
        userSevices.capnhat(id, user)
        .then(function(result){
            layDSND();
            document.querySelector("#myModal .close").click();
        })
        .catch(function(error){
            console.log(error);
        });
    }
}