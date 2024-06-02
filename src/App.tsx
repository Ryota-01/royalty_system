import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import PublishersListPage from './pages/PublishersListPage';
import RegisterPublisherPage from './pages/RegisterPublisherPage';
import RegisterWriterPage from './pages/RegisterWriterPage';
import WritersListPage from './pages/WritersListPage';
import CreateRoyaltyStatementPage from './pages/CreateRoyaltyStatementPage';
import RoyaltyStatementsLists from './pages/RoyaltyStatementsLists';
import PeriodStatementPage from './pages/PeriodStatementPage';
import DetailAuthorStatementPage from './pages/DetailAuthorStatementPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/publishers" element={<PublishersListPage />} />
        <Route path="/publisherregister" element={<RegisterPublisherPage />} />
        <Route path="/writerregister" element={<RegisterWriterPage />} />
        <Route path="/writers" element={<WritersListPage />} />
        <Route path="/royaltystatementinput" element={<CreateRoyaltyStatementPage />} />
        <Route path="/royaltystatementlists" element={<RoyaltyStatementsLists />} />
        <Route path="/royaltystatementlists/:period" element={<PeriodStatementPage />} />
        <Route path="/royaltystatementlists/:period/:period" element={<DetailAuthorStatementPage />} />
      </Routes>
    </div>
  );
}

export default App;
