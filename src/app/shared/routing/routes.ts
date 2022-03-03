import { AuthGuard } from '../guards/auth.guard';
import LoginForm from '../../auth/login/login.component';
import RegisterForm from '../../auth/register/register.component';
import FormTable from '../../form-builder/form-table/form-table.component';
import Home from '../../form-builder/form-builder.component';
import { ProtectRouteGuardGuard } from '../guards/protect-route-guard.guard';

const routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home, canActivate: [AuthGuard] },
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
  {
    path: 'forms',
    component: FormTable,
    canActivate: [AuthGuard],
  },
];

export default routes;
