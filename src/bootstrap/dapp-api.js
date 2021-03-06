import Web3 from 'web3'
import multipleArbitrableTransaction from 'kleros-interaction/build/contracts/MultipleArbitrableTransaction.json'

const env = process.env.NODE_ENV === 'production' ? 'PROD' : 'DEV'
const ETHEREUM_PROVIDER = process.env[`REACT_APP_${env}_ETHEREUM_PROVIDER`]

let web3
if (process.env.NODE_ENV === 'test')
  web3 = new Web3(require('ganache-cli').provider())
else if (window.ethereum) web3 = new Web3(window.ethereum)
else if (window.web3 && window.web3.currentProvider)
  web3 = new Web3(window.web3.currentProvider)
else web3 = new Web3(new Web3.providers.HttpProvider(ETHEREUM_PROVIDER))

let ARBITRATOR_ADDRESS
let ARBITRABLE_ADDRESS
let multipleArbitrableTransactionEth

const network =
  web3.eth &&
  web3.eth.net
    .getId()
    .then(networkID => {
    switch (networkID) {
        case 1:
        return 'MAINNET'
        case 3:
        return 'ROPSTEN'
        case 4:
        return 'RINKEBY'
        case 42:
        return 'KOVAN'
        default:
        return null
    }
    })
    .catch(() => null)

ARBITRATOR_ADDRESS =
  process.env[`REACT_APP_${env}_ARBITRATOR_ADDRESS`]

ARBITRABLE_ADDRESS =
  process.env[`REACT_APP_${env}_ARBITRABLE_ADDRESS`]

multipleArbitrableTransactionEth = new web3.eth.Contract(
  multipleArbitrableTransaction.abi,
  ARBITRABLE_ADDRESS
)

const ETHAddressRegExpCaptureGroup = '(0x[a-fA-F0-9]{40})'
const ETHAddressRegExp = /0x[a-fA-F0-9]{40}/
const strictETHAddressRegExp = /^0x[a-fA-F0-9]{40}$/

export {
  web3,
  ARBITRATOR_ADDRESS,
  ARBITRABLE_ADDRESS,
  ETHAddressRegExpCaptureGroup,
  ETHAddressRegExp,
  strictETHAddressRegExp,
  multipleArbitrableTransactionEth
}

setTimeout(
  () =>
    console.log(
      'Arbitrator Address: ',
      ARBITRATOR_ADDRESS,
      'Arbitrable Address: ',
      ARBITRABLE_ADDRESS,
      'Web3: ',
      window.web3,
      'ARBITRBLE CONTRACT',
      multipleArbitrableTransactionEth,
      'NETWORK',
      network
    ),
  1000
)