import { lazy } from 'react';
import { createBrowserRouter, type RouteObject } from 'react-router-dom';

import { route_full_path } from '@/consts/routes';

// 首屏加载的不要懒加载
import Layout from '@/pages/layout';
import Home from '@/pages/home';

// 非首屏组件，一定要懒加载
const Login = lazy(() => import(/* webpackChunkName: "login" */ '@/pages/login'));
const Register = lazy(() => import(/* webpackChunkName: "register" */ '@/pages/register'));
const Chat = lazy(() => import(/* webpackChunkName: "chat" */ '@/pages/chat'));
const NotFound = lazy(() => import(/* webpackChunkName: "notFound" */ '@/pages/notFound'));

// 路由列表
const routes: RouteObject[] = [
  {
    path: route_full_path.home,
    element: <Layout />,
    children: [
      {
        path: route_full_path.home,
        element: <Home />,
      },
      {
        path: route_full_path.login,
        element: <Login />,
      },
      {
        path: route_full_path.register,
        element: <Register />,
      },
      {
        path: route_full_path.chat,
        element: <Chat />,
      },
      {
        path: route_full_path.chatTag,
        element: <Chat />,
      },
      {
        path: '*', // 这里的*要放在最后，表示匹配不到的路由，都来这里。
        element: <NotFound />,
      },
    ],
  },
];

// 导出路由
export const browserRouter = createBrowserRouter(routes);
