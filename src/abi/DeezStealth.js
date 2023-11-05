export default [{ "inputs": [], "name": "InvalidInput", "type": "error" }, { "inputs": [], "name": "InvalidValue", "type": "error" }, { "inputs": [], "name": "NotSender", "type": "error" }, { "inputs": [], "name": "PubKeyNotProvided", "type": "error" }, { "inputs": [], "name": "PubKeyProvided", "type": "error" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "sender", "type": "address" }, { "indexed": true, "internalType": "address", "name": "receiver", "type": "address" }, { "indexed": true, "internalType": "address", "name": "token", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "gasPassAmount", "type": "uint256" }], "name": "Distributed", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "sender", "type": "address" }, { "indexed": false, "internalType": "bytes", "name": "key", "type": "bytes" }], "name": "NewPubKey", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "sender", "type": "address" }], "name": "PubKeyRemoved", "type": "event" }, { "inputs": [{ "internalType": "address[]", "name": "receivers", "type": "address[]" }, { "internalType": "address[]", "name": "tokens", "type": "address[]" }, { "internalType": "uint256[]", "name": "amounts", "type": "uint256[]" }, { "internalType": "uint256[]", "name": "gasPassAmounts", "type": "uint256[]" }], "name": "distribute", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "address[]", "name": "a", "type": "address[]" }], "name": "getPubKeys", "outputs": [{ "internalType": "bytes[]", "name": "", "type": "bytes[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "pubKey", "outputs": [{ "internalType": "bytes", "name": "", "type": "bytes" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "removePubKey", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes", "name": "key", "type": "bytes" }], "name": "setPubKey", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]