import { AuthGuard } from './auth.guard';
import LoginForm from './Auth/Login/login.component';
import RegisterForm from './Auth/Register/register.component';
import Home from './Home/home.component';
import { ProtectRouteGuardGuard } from './protect-route-guard.guard';

const routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: Home,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginForm,
    canActivate: [ProtectRouteGuardGuard],
  },
  {
    path: 'register',
    component: RegisterForm,
    canActivate: [ProtectRouteGuardGuard],
  },
];

export default routes;
