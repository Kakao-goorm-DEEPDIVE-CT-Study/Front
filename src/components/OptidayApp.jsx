import { Route, Routes, useLocation } from "react-router-dom";
import Sidebar from "./bars/Sidebar";
import "../styles/OptidayApp.css";
import Headerbar from "./bars/Headerbar";
import Feedback from "./Feedback";
import Main from "./Main";
import Todo from "./todo/Todo";
import Login from "../page/Login";
import Signup from "../page/Signup"; // Signup 컴포넌트 추가

function OptidayApp() {
  const location = useLocation();

  // 로그인 및 회원가입 페이지에서 Sidebar와 Headerbar 렌더링하지 않음
  const isLoginPage = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div className="OptidayApp">
      {!isLoginPage&&<Headerbar/>}
      <div className="center">
      {!isLoginPage&&<Sidebar/>}

        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} /> {/* Signup 경로 추가 */}
        </Routes>
      </div>
    </div>
  );
}

export default OptidayApp;
