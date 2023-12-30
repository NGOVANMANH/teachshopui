import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DefaultLayout } from "../layouts";
import { publicRoutes, privateRoutes } from '../routes';
import Page404 from '../pages/Page404';
import { useContextData } from '../hooks';


function App() {

  const { user } = useContextData();

  return (
    <Router>
      <div className='App'>
        <Routes>
          {
            user && user.auth
              ?
              privateRoutes.map((route, index) => {
                const Page = route.component;
                return <Route key={index} path={route.path} element={<DefaultLayout><Page /></DefaultLayout>} />
              })
              :
              publicRoutes.map((route, index) => {
                const Page = route.component;
                return <Route key={index} path={route.path} element={<DefaultLayout><Page /></DefaultLayout>} />
              })
          }
          <Route path='*' element={<Page404 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
