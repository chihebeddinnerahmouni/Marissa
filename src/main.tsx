import './index.css';
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from './routes/routes.tsx';
import { i18n_init } from './functions/init_i18n.ts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import store from './redux/store';


// Initialize i18n
i18n_init();


// Create a QueryClient instance
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </Provider>
);