
import './index.css'
import './locales/i18n.js'
import App from './App.jsx'
import ReactDOM from 'react-dom/client'
import { SettingsProvider } from './context/SettingsContext.jsx'
import { store } from './app/store.js'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <SettingsProvider>
        <App />
      </SettingsProvider>
    </QueryClientProvider>
  </Provider>
)
