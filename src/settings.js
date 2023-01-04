/*
 * @Description:
 * @Author: kun.xu
 * @Date: 2022-12-12 16:55:01
 * @LastEditTime: 2022-12-21 13:12:30
 * @LastEditors: kun.xu
 */
const setting = {
  title: 'X',
  logo: '',

  /**
   * @type {boolean} true | false
   * @description Whether fix the header
   */
  fixedHeader: true,
  /**
   * @type {boolean} true | false
   * @description Whether show the logo in sidebar
   */
  sidebarLogo: true,
  /**
   * @type {boolean} true | false
   * @description Whether show the title in Navbar
   */
  showTitle: false,
  /**
   * @type {boolean} true | false
   * @description Whether show the settings right-panel
   */
  showLeftMenu: true,
  /**
   * @type {boolean} true | false
   * @description Whether show the drop-down
   */
  ShowDropDown: true,
  showHamburger: true,
  /**
   * @type {boolean} true | false
   * @description Whether need login
   */
  isNeedLogin: true,
  /**
   * @type {boolean} true | false
   * @description Whether need nprogress
   */
  isNeedNprogress: true,
  /**
   * @type {boolean} true | false
   * @description Whether  open prod mock
   * in react openProdMock can't use
   */
  openProdMock: false,
  /**
   * @type {string | array} 'serve' | ['build', 'serve']
   * @description Need show err logs component.
   * The default is only used in the production env
   * If you want to also use it in dev, you can pass ['build', 'serve']
   */
  errorLog: ['build'],

  /*
   * vite.config.js base config
   * such as
   * */
  // viteBasePath: '/react-admin-template/'
  viteBasePath: '/'
}

export default setting
