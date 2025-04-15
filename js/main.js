document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registration-form');
    
    registrationForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Lấy giá trị từ form
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const confirmPassword = document.getElementById('confirm-password').value.trim();
        const agreeTerms = document.getElementById('agree-terms').checked;
        const regMessage = document.getElementById('regMessage');
        
        // Reset messages
        resetErrorMessages();
        regMessage.className = 'message';
        regMessage.textContent = '';
        
        // Validate form
        if (!validateForm(email, password, confirmPassword, agreeTerms)) {
            return;
        }
        
        // Save user
        const user = {
            email: email,
            password: password
        };
        
        let users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : {};
        
        if (users[email]) {
            showMessage(regMessage, 'Email đã tồn tại!', 'error');
        } else {
            users[email] = user;
            localStorage.setItem('users', JSON.stringify(users));
            showMessage(regMessage, 'Đăng ký thành công!', 'success');
            registrationForm.reset();
            
            // Có thể chuyển hướng sau khi đăng ký thành công
            // setTimeout(() => window.location.href = 'login.html', 2000);
        }
    });
    
    function validateForm(email, password, confirmPassword, agreeTerms) {
        let isValid = true;
        
        // Validate email
        if (!email) {
            showError('email-error', 'Email không được bỏ trống');
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showError('email-error', 'Email không hợp lệ');
            isValid = false;
        }
        
        // Validate password
        if (!password) {
            showError('password-error', 'Vui lòng nhập mật khẩu');
            isValid = false;
        } else if (password.length < 6) {
            showError('password-error', 'Mật khẩu phải có ít nhất 6 ký tự');
            isValid = false;
        } else if (!/[a-z]/.test(password)) {
            showError('password-error', 'Mật khẩu phải có ít nhất 1 chữ thường');
            isValid = false;
        } else if (!/[A-Z]/.test(password)) {
            showError('password-error', 'Mật khẩu phải có ít nhất 1 chữ hoa');
            isValid = false;
        } else if (!/[0-9]/.test(password)) {
            showError('password-error', 'Mật khẩu phải có ít nhất 1 chữ số');
            isValid = false;
        }
        
        // Validate confirm password
        if (!confirmPassword) {
            showError('confirm-password-error', 'Vui lòng nhập lại mật khẩu');
            isValid = false;
        } else if (password !== confirmPassword) {
            showError('confirm-password-error', 'Mật khẩu không khớp');
            isValid = false;
        }
        
        // Validate terms
        if (!agreeTerms) {
            showError('terms-error', 'Bạn phải đồng ý với điều khoản');
            isValid = false;
        }
        
        return isValid;
    }
    
    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    
    function resetErrorMessages() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(element => {
            element.textContent = '';
            element.style.display = 'none';
        });
    }
    
    function showMessage(element, message, type) {
        element.textContent = message;
        element.classList.add(type);
    }
});

// Phần đăng nhập
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();
            const loginMessage = document.getElementById('login-message');
            
            // Reset messages
            resetErrorMessages();
            loginMessage.className = 'message';
            loginMessage.textContent = '';
            
            // Validate form
            if (!email) {
                showError('email-error', 'Email không được bỏ trống');
                return;
            }
            
            if (!password) {
                showError('password-error', 'Vui lòng nhập mật khẩu');
                return;
            }
            
            // Check user credentials
            const users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : {};
            const user = users[email];
            
            if (!user) {
                showMessage(loginMessage, 'Email không tồn tại', 'error');
            } else if (user.password !== password) {
                showMessage(loginMessage, 'Mật khẩu không chính xác', 'error');
            } else {
                showMessage(loginMessage, 'Đăng nhập thành công!', 'success');
                
                // Lưu thông tin đăng nhập vào sessionStorage
                sessionStorage.setItem('loggedInUser', JSON.stringify({
                    email: email,
                    timestamp: new Date().getTime()
                }));
                
                // Chuyển hướng sau 1 giây
                setTimeout(() => {
                    window.location.href = 'home.html';
                }, 1000);
            }
        });
    }
    
    // Các hàm helper từ phần đăng ký
    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    
    function resetErrorMessages() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(element => {
            element.textContent = '';
            element.style.display = 'none';
        });
    }
    
    function showMessage(element, message, type) {
        element.textContent = message;
        element.classList.add(type);
    }

    
    
    // Phần đăng ký (giữ nguyên như trước)
    const registrationForm = document.getElementById('registration-form');
    if (registrationForm) {
        document.addEventListener('DOMContentLoaded', function() {
            const registrationForm = document.getElementById('registration-form');
            
            registrationForm.addEventListener('submit', function(event) {
                event.preventDefault();
                
                // Lấy giá trị từ form
                const email = document.getElementById('email').value.trim();
                const password = document.getElementById('password').value.trim();
                const confirmPassword = document.getElementById('confirm-password').value.trim();
                const agreeTerms = document.getElementById('agree-terms').checked;
                const regMessage = document.getElementById('regMessage');
                
                // Reset messages
                resetErrorMessages();
                regMessage.className = 'message';
                regMessage.textContent = '';
                
                // Validate form
                if (!validateForm(email, password, confirmPassword, agreeTerms)) {
                    return;
                }
                
                // Save user
                const user = {
                    email: email,
                    password: password
                };
                
                let users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : {};
                
                if (users[email]) {
                    showMessage(regMessage, 'Email đã tồn tại!', 'error');
                } else {
                    users[email] = user;
                    localStorage.setItem('users', JSON.stringify(users));
                    showMessage(regMessage, 'Đăng ký thành công!', 'success');
                    registrationForm.reset();
                    
                    // Có thể chuyển hướng sau khi đăng ký thành công
                    // setTimeout(() => window.location.href = 'login.html', 2000);
                }
            });
            
            function validateForm(email, password, confirmPassword, agreeTerms) {
                let isValid = true;
                
                // Validate email
                if (!email) {
                    showError('email-error', 'Email không được bỏ trống');
                    isValid = false;
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                    showError('email-error', 'Email không hợp lệ');
                    isValid = false;
                }
                
                // Validate password
                if (!password) {
                    showError('password-error', 'Vui lòng nhập mật khẩu');
                    isValid = false;
                } else if (password.length < 6) {
                    showError('password-error', 'Mật khẩu phải có ít nhất 6 ký tự');
                    isValid = false;
                } else if (!/[a-z]/.test(password)) {
                    showError('password-error', 'Mật khẩu phải có ít nhất 1 chữ thường');
                    isValid = false;
                } else if (!/[A-Z]/.test(password)) {
                    showError('password-error', 'Mật khẩu phải có ít nhất 1 chữ hoa');
                    isValid = false;
                } else if (!/[0-9]/.test(password)) {
                    showError('password-error', 'Mật khẩu phải có ít nhất 1 chữ số');
                    isValid = false;
                }
                
                // Validate confirm password
                if (!confirmPassword) {
                    showError('confirm-password-error', 'Vui lòng nhập lại mật khẩu');
                    isValid = false;
                } else if (password !== confirmPassword) {
                    showError('confirm-password-error', 'Mật khẩu không khớp');
                    isValid = false;
                }
                
                // Validate terms
                if (!agreeTerms) {
                    showError('terms-error', 'Bạn phải đồng ý với điều khoản');
                    isValid = false;
                }
                
                return isValid;
            }
            
            function showError(elementId, message) {
                const errorElement = document.getElementById(elementId);
                errorElement.textContent = message;
                errorElement.style.display = 'block';
            }
            
            function resetErrorMessages() {
                const errorMessages = document.querySelectorAll('.error-message');
                errorMessages.forEach(element => {
                    element.textContent = '';
                    element.style.display = 'none';
                });
            }
            
            function showMessage(element, message, type) {
                element.textContent = message;
                element.classList.add(type);
            }
        });
    }

    
});

// function logout(){
//     window.location.href='dangNhap.html';
//     let name = document.getElementById('name');
//     name.innerHTML = localStorage.getItem();
// }