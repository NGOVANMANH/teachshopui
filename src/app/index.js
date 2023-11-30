import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DefaultLayout } from "../layouts";
import { publicRoutes } from '../routes';
import Page404 from '../pages/Page404';

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            return <Route key={index} path={route.path} element={<DefaultLayout><Page /></DefaultLayout>} />
          })}
          <Route path='*' element={<Page404 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
