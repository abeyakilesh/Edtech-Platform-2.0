// importing the function that connects React to the HTML page
import { createRoot } from 'react-dom/client'

// importing the main App component
import App from './App'

// importing the global CSS file
import './index.css'

// finding the div with id="root" in index.html
// and rendering the App component inside it
createRoot(document.getElementById('root')).render(
  <App />
)
