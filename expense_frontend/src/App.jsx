// Routing in simple words is, When URL changes, show a different page without reloading the browser.
// Without Routing, React can show only one component and changing pages requires page reloads
// With Routing, URLs behave like real website pages.

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Router>  
      <Routes>
        {/* Routes is like a container, which holds all route definitions. */}
        <Route path="/login" element={<Login />} />
            {/* Here element is a prop for Route component. later <Login /> */}
        <Route path="/register" element={<Register />} />
        {/* Route is like a single rule, which says if url matches this path - show this component. */}
      </Routes>
    </Router>
  );  
}


export default App;


// Without Routing, for example in Django templates.
// Every time you click a link, Browser sens request to server, server sends a full HTML page, Browser reloads completely.

// With React Routing (SPA)
// React loads one html file, after that
// URL changes, react swaps component, no page reload, This makes the app feel instant.