import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function LoginPage({ handleChangePage }) {
  // ** this variable is only for navigating to cart page if has logged in successfully  and before that, user has
  // pressed add to cart button (want to buy some products but have not logged in yet)
  const navigate = useNavigate();
  const passwordRef = useRef();
  // import slice
  // state for managing show warning and button disabled
  const [emailInput, setEmailInput] = useState({
    value: 1, // first go to sign in page => not show the warning
    isFocused: false,
  });
  const [passwordInput, setPasswordInput] = useState({
    value: 1,
    isFocused: false,
  });
  const [error, setError] = useState("");
  const inputClass = "block border-2 border-neutral-300 p-[15px] ";
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  // These two onChange events to let the button disabled or not due to user's typing immediately
  // and change placeholder
  const emailValidation =
    emailInput.value !== "" && regex.test(emailInput.value);
  const pswValidation = passwordInput.value !== "";
  const warningEmailClass = "text-red-700 italic absolute top-[40px]";
  const warningPasswordClass = "text-red-700 italic absolute top-[190px]";
  function handleCheckValidateEmail(event) {
    setEmailInput({
      value: event.target.value,
      isFocused: true,
    });
  }
  function handleCheckValidatePsw(event) {
    setPasswordInput({
      value: event.target.value,
      isFocused: true,
    });
  }
  // These two blur events to show the warning to user
  function handleBlurEmailInput(event) {
    setEmailInput({
      value: event.target.value,
      isFocused: false,
    });
  }
  function handleBlurPasswordInput(event) {
    setPasswordInput({
      value: event.target.value,
      isFocused: false,
    });
  }
  // after type in valid email and password and submit, check if exist in local storage
  async function handleSignIn() {
    try {
      const dataInput = {
        email: emailInput.value,
        password: passwordInput.value,
      };
      const response = await fetch(
        "https://PhoneShopBackEnd.onrender.com/auth/sign-in",
        {
          method: "POST",
          body: JSON.stringify(dataInput),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        window.alert("Sai tài khoản hoặc mật khẩu");
        return;
      }

      const data = await response.json();
      const token = data.token;

      // Kiểm tra role
      if (!response.ok) {
        // Hiển thị message từ back-end
        window.alert(data.message || "Đăng nhập thất bại");
        return;
      }

      localStorage.setItem("admin-token", token);
      window.location.href = "/"; // Chuyển hướng đến trang admin
    } catch (err) {
      throw json({ message: err.message }, { status: err.status });
    }
  }

  // this function is to change the modal when click
  function handleChange() {
    handleChangePage("Sign Up");
  }
  return (
    <>
      <div>
        tài khoản và mật khẩu của admin là: <p>tk: admin@gmail.com</p> <p></p>
        mk: 123456789
      </div>
      <form className="absolute top-[10%] left-[35%] p-[20px] w-[400px] text-center border-2 border-neutral-300 shadow shadow-indigo-500/40 rounded-xl bg-white">
        <h1 className="italic mb-[30px]">Sign In</h1>
        <div className="grid grid-rows-2">
          <div className="grid grid-rows-2 mb-[20px]">
            {!emailValidation &&
              !emailInput.isFocused &&
              emailInput.value === "" && (
                <span className={warningEmailClass}>
                  Please type in your email address!
                </span>
              )}

            {!emailValidation &&
              !emailInput.isFocused &&
              emailInput.value !== "" &&
              emailInput.value !== 1 && (
                <span className={warningEmailClass}>
                  Please type in correct email!
                </span>
              )}

            <input
              type="text"
              placeholder={`${!emailValidation.isFocused ? "Email" : ""}`}
              className={`${inputClass} border-b-white`}
              onChange={handleCheckValidateEmail}
              onBlur={handleBlurEmailInput}
            />
            <input
              ref={passwordRef}
              type="text"
              placeholder={`${!pswValidation.isFocused ? "Password" : ""}`}
              className={`${inputClass}`}
              onChange={handleCheckValidatePsw}
              onBlur={handleBlurPasswordInput}
            />
            {!pswValidation &&
              !passwordInput.isFocused &&
              passwordInput.value === "" && (
                <span className={warningPasswordClass}>
                  Please type in your password!
                </span>
              )}
          </div>
          {error && <div className="error-message">{error}</div>}
          <button
            type="button"
            className={`bg-neutral-700 text-xs text-white uppercase max-h-[50px] mt-[20px] ${
              // Not valid => add opacity
              !emailValidation || !pswValidation ? "opacity-20" : ""
            }`}
            onClick={handleSignIn}
            // Not valid => disabled
            disabled={!emailValidation || !pswValidation ? true : false}
          >
            Sign in
          </button>
          <span className="italic text-slate-300">
            Create an account?{" "}
            <span
              className="text-cyan-600 cursor-pointer"
              onClick={handleChange}
            >
              Sign up
            </span>
          </span>
        </div>
      </form>
    </>
  );
}
