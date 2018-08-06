import axios from 'axios'

const Simulation = () => {
  const url = 'http://localhost:8081'
  axios.post(`${url}/project`, {
    name: 'TestProject',
  })

  axios.post(`${url}/project`, {
    name: 'TestProject2',
  })

  const arr = ['A', 'B', 'C', 'D']
  let count = 1
  arr.forEach((arrItem) => {
    axios.post(`${url}/project/1/item`, {
      itemNumber: count,
      name: arrItem,
      product_id: 1,
      user_id: 1,
    })
    count += 1
  })
  const arr2 = ['Ab', 'Bc', 'Cd', 'De']
  count = 1
  arr2.forEach((arrItem) => {
    axios.post(`${url}/project/1/item`, {
      itemNumber: (count + 4),
      name: arrItem,
      user_id: 2,
      product_id: 1,
    })
    count += 1
  })
  return true
}

export default Simulation
