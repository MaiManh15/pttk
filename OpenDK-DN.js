// Lấy 2 nút đăng nhập, đăng ký
const loginBtn = document.querySelector('.login-btn-js');
const registerBtn = document.querySelector('.register-btn-js');
// Nút close
const closeModalBtns = document.querySelectorAll('.login__header-close-icon')
// modal
const takeModal = document.querySelector('.modal-js');
// Overlay
const overLay = document.querySelector('.modal__overlay');
// Form đăng nhập
const loginForm = document.querySelector('.login-wrap');
// Form đăng ký
const registerForm = document.querySelector('.register-wrap');



// Hàm show form đăng nhập
function showModalDN (){
    takeModal.classList.add('open');
    loginForm.classList.add('open');
}
// Tắt form đăng nhập
function hideModalDN (){
    loginForm.classList.remove('open');
}
// Hàm show form đăng ký
function showModalDK (){
    takeModal.classList.add('open');
    registerForm.classList.add('open');
}
// Tắt form đăng ký
function hideModalDK (){
    registerForm.classList.remove('open');
}
// Tắt tất cả 
function hideAll (){
    takeModal.classList.remove('open');
    loginForm.classList.remove('open');
    registerForm.classList.remove('open');
}



// Nhấn chữ Đăng nhập mở form đăng nhập và tắt đăng ký
loginBtn.addEventListener('click', showModalDN, hideModalDK);

// Nhấn chữ Đăng ký mở form đăng ký và tắt đăng nhập
registerBtn.addEventListener('click', showModalDK, hideModalDN);

// Nhấn nút close đóng form (có 2 nút nên phải dùng vòng lặp)
for (const closeModalBtn of closeModalBtns ) {
    closeModalBtn.addEventListener('click', hideAll)
}

// Nhấn vào overlay tắt form
overLay.addEventListener('click', hideAll);