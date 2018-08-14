import axios from 'axios'

const Creator = () => {
  const url = 'http://localhost:8081'
  axios.post(`${url}/product`, {
    name: 'PV',
  })
  axios.post(`${url}/product`, {
    name: 'PFV',
  })
  axios.post(`${url}/product`, {
    name: 'FPGA',
  })
  axios.post(`${url}/product`, {
    name: 'Mech',
  })
  axios.post(`${url}/subfunction`, {
    name: 'DVM',
  })
  axios.post(`${url}/subfunction`, {
    name: 'TMU',
  })
  axios.post(`${url}/subfunction`, {
    name: 'VS',
  })
  axios.post(`${url}/subfunction`, {
    name: 'VI',
  })
  axios.post(`${url}/subfunction`, {
    name: 'TMU',
  })

  return true
}

// const Associate = () => {
//   const url = 'http://localhost:8081'
//   axios.post(`${url}/sub/1/item/1`)
//   axios.post(`${url}/sub/2/item/1`)
//   axios.post(`${url}/sub/1/item/2`)
//   axios.post(`${url}/sub/3/item/3`)
//   axios.post(`${url}/sub/4/item/4`)
//   axios.post(`${url}/sub/1/item/5`)
//   axios.post(`${url}/sub/2/item/5`)
//   axios.post(`${url}/sub/3/item/5`)
//   axios.post(`${url}/sub/4/item/5`)
//   axios.post(`${url}/sub/2/item/6`)
//   axios.post(`${url}/sub/3/item/7`)
//   axios.post(`${url}/sub/4/item/8`)

//   return true
// }

const Simulation = () => {
  Creator()
  const url = 'http://localhost:8081'
  axios.post(`${url}/project`, {
    name: 'TestProject',
  })

  axios.post(`${url}/project`, {
    name: 'TestProject2',
  })

  const arr = ['First', 'Second', 'Third', 'Fourth']
  let count = 1
  arr.forEach((arrItem) => {
    axios.post(`${url}/project/1/item`, {
      itemNumber: count,
      name: arrItem,
      product_id: 1,
      user_id: 1,
      status: 1,
    })
    count += 1
  })
  const arr2 = ['Regression', 'On/off', 'Sound', 'Visual']
  count = 1
  arr2.forEach((arrItem) => {
    axios.post(`${url}/project/1/item`, {
      itemNumber: (count + 4),
      name: arrItem,
      user_id: 1,
      product_id: 1,
      status: 6,
    })
    count += 1
  })

  // Associate()

  return true
}

export default Simulation
