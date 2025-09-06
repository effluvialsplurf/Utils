import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Utils from './Utils.tsx'
import RaylibColorGen from './components/RaylibColorGen.tsx'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

const Navbar = () => {

    return (
        <nav className='w-1/3 h-full text-fuchsia-700 underline bg-blue-400'>
            <ul>
                <li>
                    <a href="/"><p>Main Site</p></a>
                </li>
                <li>
                    <Link to="/utils">Home</Link>
                </li>
                <li>
                    <Link to="/raylib-colorpicker">Raylib Color Generator</Link>
                </li>
            </ul>
        </nav>
    );
};

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <div className='flex flex-row w-screen h-screen'>
                <Routes>
                    <Route path="/utils" element={<Utils />} />
                    <Route path="/raylib-colorpicker" element={<RaylibColorGen />} />
                </Routes>
                <Navbar />
            </div>
        </BrowserRouter>
    </StrictMode>,
);
