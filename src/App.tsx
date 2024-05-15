import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from './theme/theme-provider';
import { browserRouter } from '@/router';
import store from '@/store';
import { Toaster } from '@/components/ui/toaster';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// 创建一个 client
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme={'light'} storageKey={'vite-ui-theme'}>
        <Provider store={store}>
          <RouterProvider router={browserRouter} />
          <Toaster />
        </Provider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
