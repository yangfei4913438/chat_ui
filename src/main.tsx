import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Loader } from 'lucide-react';
import App from './App';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Suspense
    fallback={
      <div className={'flex h-screen w-screen items-center justify-center'}>
        <Loader size={48} />
      </div>
    }
  >
    <App />
  </Suspense>
);
