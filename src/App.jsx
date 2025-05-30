import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import GlobalStyles from "./styles/GlobalStyles";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar/Navbar";
import HomePage from "./pages/Home/HomePage";
import RollingPaperListPage from "./pages/RollingPaperList/RollingPaperListPage";
import CreateRollingPaperPage from "./pages/CreateRollingPaper/CreateRollingPaperPage";
import RollingPaperPage from "./pages/RollingPaper/RollingPaperPage";
import MessagePage from "./pages/Message/MessagePage";
import EditRollingPaperPage from "./pages/EditRollingPaperPage/EditRollingPaperPage";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/list" element={<RollingPaperListPage />} />
        <Route path="/post" element={<CreateRollingPaperPage />} />
        <Route path="/post/:id" element={<RollingPaperPage />} />
        <Route path="/post/:id/message" element={<MessagePage />} />
        <Route path="/post/:id/edit" element={<EditRollingPaperPage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
