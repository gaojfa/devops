import PageNotFoundComp from '../views/PageNotFound.vue'
import PageUnauthorizedComp from '../views/PageUnauthorized.vue'

export default function appendErrorPage (children) {
  const pathPrefix = children[0].path.substr(0, children[0].path.lastIndexOf('/'))
  const routeNamePrefix = pathPrefix.substr(1)
  children.push(
    {
      path: `${pathPrefix}/pageunauthorized`,
      name: routeNamePrefix + 'EmbedPageUnauthorized',
      component: PageUnauthorizedComp
    },
    {
      path: `${pathPrefix}/*`,
      name: routeNamePrefix + 'EmbedPageNotFound',
      component: PageNotFoundComp
    }
  )
  children.forEach((child) => { if (child.children && child.children.length > 0) appendErrorPage(child.children) })
  return children
}
