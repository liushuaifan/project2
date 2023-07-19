import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import SignIn from "./components/signIn";
import Registration from "./components/registration";
import Onboard from "./components/onboard";
import Navbar from "./components/navbar";
import OnboardPending from "./components/onboardPending";
import OnboardReject from "./components/onboardReject";
import Profile from "./components/profile";
import EmployeeStatus from "./components/employeeStatus";
import HrStatus from "./components/hrStatus";
import EmployeeList from "./components/employeeList";
import EmployeeDetail from "./components/EmployeeDetail";
import Hiring from "./components/Hiring";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
        <Navbar />
        <Routes>
            {/* <Route path="*" element={<NotFound />} /> */}
   
            <Route path="/SignIn" element={<SignIn />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/employee/onboard" element={<Onboard />} />
            <Route path="/employee/onboard/pending" element={<OnboardPending />} />
            <Route path="/employee/onboard/reject" element={<OnboardReject />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/employee/visaStatus" element={<EmployeeStatus />} />


            <Route path="/hr/visaStatus" element={<HrStatus />} />
            <Route path="/hr/employeeList" element={<EmployeeList />} />
            <Route path="/hr/employeeList/:employeeId" element={<EmployeeDetail />} />

            <Route path="/hr/hiring" element={<Hiring />} />

   
          

        </Routes>

        </BrowserRouter>
    </div>
  );
}

export default App;
