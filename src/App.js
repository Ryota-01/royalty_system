import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import PublishersList from './pages/PublishersList';
import RegisterPublisher from './pages/RegisterPublisher';
import RegisterWriter from './pages/RegisterWriter';
import WritersList from './pages/WritersList';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/publishers" element={<PublishersList />} />
        <Route path="/publisherregister" element={<RegisterPublisher />} />
        <Route path="/writerregister" element={<RegisterWriter />} />
        <Route path="/writers" element={<WritersList />} />
      </Routes>
    </div>
  );
}

export default App;
