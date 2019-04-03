import HomePage from 'container/HomePage'
import TagsPage from 'container/tags/TagsPage' // 客户

export default [
  {
    name: 'homePage',
    path: '/',
    exact: false,
    component: HomePage,
    routes: [
      {
        name: 'tagsPage',
        path: '/tags/home',
        exact: true,
        component: TagsPage
      },
    ]
  },
]
