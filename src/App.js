import logo from "./logo.svg";
import "./App.css";
import Portal from "./components/Portal";
import Dashboard from "./components/Dashboard";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes,
} from "react-router-dom";
import Questions from "./components/Questions";
// import Subjects from "./components/Subjects";
import sub from "./components/sub";
import Topics from "./components/Topics";
import AddQuestions from "./components/AddQuestions";
import ADD from "./components/ADD";
import Subjects from "./components/Subjects";
import EditQues from "./components/EditQues";

function App() {
  return (
    <div className="App">
      {/* <Portal /> */}
      {/* <Dashboard /> */}

      <Router>
        <Routes>
          <Route path="/" element={<Portal />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/questions" element={<Questions />}></Route>
          <Route path="/addques" element={<AddQuestions />}></Route>
          <Route path="/text" element={<ADD />}></Route>
          <Route path="/Subjects" element={<Subjects />}></Route>
          <Route path="/Topics" element={<Topics />}></Route>
          <Route path="/Edit/:id" element={<EditQues />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
