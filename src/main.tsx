import {StrictMode, Suspense} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import {BrowserRouter} from "react-router-dom";

createRoot(document.getElementById('root')!).render(
  <>
    <BrowserRouter>
      <Suspense fallback={<div>Loading</div>}>
        <App/>
      </Suspense>
    </BrowserRouter>
  </>
)
