import { MenuNodes } from '../models/menu-nodes.model';

export class MenuStoreState {
  menu: MenuNodes = {
    label: '資料查詢系統',
    link: '/',
    // imageIcon: '/assets/batman.jpg',

    externalRedirect: false,
    items: [
      {
        label: '校公車查詢',
        link: '/bls',
        icon: 'view_list',
      },
      {
        label: '補考資料查詢',
        link: '/gsq/1yMOZv1Ff3fpTdVy5D3iol9FwcrC1fgrv0i21UMrNnrY',
        icon: 'view_list',
      },
      {
        label: '特招結果查詢',
        link: '/gsq/1Y1P8G8jz2XUoOskl5loywRBW8lmq0p2gxz92HzlEI7A',
        icon: 'view_list',
      },
      {
        label: '新生註冊費查詢',
        link: '/gsq/1gvBUoLlMXt1isTNI3pjRXttcHqtX-wl_E4NRXi2JsvI',
        icon: 'view_list',
      },
    ]
  };
}

