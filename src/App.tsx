import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from './theme/theme-provider';
import { browserRouter } from '@/router';
import store from '@/store';
import { Toaster } from '@/components/ui/toaster';

const App = () => {
  return (
    <ThemeProvider defaultTheme={'light'} storageKey={'vite-ui-theme'}>
      <Provider store={store}>
        <RouterProvider router={browserRouter} />
        <Toaster />
      </Provider>
    </ThemeProvider>
  );
};

export default App;
