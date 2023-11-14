import { BrowserRouter } from 'react-router-dom'

import { AppProvider } from './hooks'
import { Router } from './routes/Router'

export function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Router />
      </AppProvider>
    </BrowserRouter>
  )
}
