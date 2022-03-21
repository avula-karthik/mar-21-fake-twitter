import ProductComponent from './ProductComponent';
import './App.css';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import ForumComponent from './ForumComponent';
import Twitter from './Twitter';

function App() {
    return (
        <div className='App'>
            <BrowserRouter>
                <Link to='/product' className='col-lg-4 btn btn-primary'>
                    <h5>
                        <b>Product Component</b>
                    </h5>
                </Link>
                <Link to='/forum' className='col-lg-4 btn btn-primary'>
                    <h5>
                        <b> Forum Component</b>
                    </h5>
                </Link>
                <Link to='/twitter' className='col-lg-4 btn btn-primary'>
                    <h5>
                        <b>Twitter Component</b>
                    </h5>
                </Link>
                <Routes>
                    <Route path='/product' element={<ProductComponent />} />
                    <Route path='/forum' element={<ForumComponent />} />
                    <Route path='/twitter' element={<Twitter />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
