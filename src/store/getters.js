const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  shop_id: state => state.user.shop_id,
  role_id: state => state.user.role_id,
  permission_routes: state => state.permission.routes,
}
export default getters
