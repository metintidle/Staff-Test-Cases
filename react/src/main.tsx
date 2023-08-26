import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from "./App";

// const MyComponent = lazy(() => import('./MyComponent'));


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App/>
  </StrictMode>
)

