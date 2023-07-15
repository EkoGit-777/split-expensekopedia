export default {
  path: '/',
  component: () => import(/* webpackChunkName: "auth" */ '../layouts/auth/index-layout.vue'),
  children: [
    {
      path: '/login',
      name: 'login',
      meta: { title: 'Login - Split Bill' },
      component: () => import(/* webpackChunkName: "auth" */ '../views/auth/index-page.vue'),
    },
    // {
    //   path: '/password/forgot',
    //   name: 'ForgotPassword',
    //   meta: { title: 'Rain Admin - Lupa Password' },
    //   component: () => import(/* webpackChunkName: "auth-forgot" */ '../views/Auth/PasswordRequest.vue'),
    // },
    // {
    //   path: '/reset-password/:token',
    //   name: 'ResetPassword',
    //   meta: { title: 'Rain Admin - Reset Password' },
    //   component: () => import(/* webpackChunkName: "auth-reset" */ '../views/Auth/PasswordReset.vue'),
    // },
  ],
}