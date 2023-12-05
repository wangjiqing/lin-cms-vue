const contentRouter = {
  route: null,
  name: null,
  title: '期刊管理',
  type: 'folder', // 类型: folder, tab, view
  icon: 'iconfont icon-tushuguanli',
  order: null,
  inNav: true,
  children: [
    {
      title: '内容管理',
      type: 'view',
      name: 'content',
      route: '/content/list',
      filePath: 'views/content/List',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    },
    {
      title: '最新期刊',
      type: 'view',
      name: 'flow',
      route: '/content/flow',
      filePath: 'views/content/Flow',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    }

  ],
}

export default contentRouter
