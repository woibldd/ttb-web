/** When your routing table is too long, you can split it into small modules**/

import layout from '../../layout'

const currencyUnitRouter = {
  path: '/currency-unit',
  component: layout,
  name: 'currency-unit',
  redirect: '/currency-unit/index',
  meta: {
    title: '合约交易'
  },
  children: [
    {
      path: '/currency-unit/index',
      component: () => import('../../views/currency-unit')
    }
  ]
}

export default currencyUnitRouter
