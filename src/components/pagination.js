import _ from 'lodash'
import actions from 'store/actions'
import hash from 'object-hash'
import { useSelector } from 'react-redux'

const DEFAULT_LIMIT = 99

const defaultState = {}

export const saveData = (path, { count, params = {}, data }) => {
  const { _start = 0, _limit = DEFAULT_LIMIT, ...query } = params
  actions.update(path, data.reduce((acc, item) => {
    acc[item.id] = item
    return acc
  }, {}))


  actions.set(`pagination.${path}.${hash(query)}.count`, count)
  actions.set(`pagination.${path}.${hash(query)}.ids.${_limit}.${_start}`, data.map(({ id }) => id))
}

export const usePagination = (path, params = {}) => {
  const { _start = 0, _limit = DEFAULT_LIMIT, ...query } = params
  const { ids, count } = useSelector(() => actions.get(`pagination.${path}.${hash(query)}`, defaultState))
  const data = useSelector(() => actions.get(path, defaultState))

  const list = _.uniq(
    Object.entries(_.get(ids, _limit, {}))
      .filter(([key]) => Number(key) <= _start)
      .map(([key, ids]) => ids)
      .flat()
  )
    .map((id) => _.get(data, id))
    .filter(Boolean)


  return {
    data,
    count,
    list
  }
}