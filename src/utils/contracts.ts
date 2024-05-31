import {
  ACCOUNT_FACTORY_ADDRESS, USERS_DIRECTORY_ADDRESS,
  PROCESS_MANAGEMENT_ADDRESS, CHAIN, client
} from "./constants";
import { getContract } from "thirdweb";

export const mainContract = getContract({
  client,
  chain: CHAIN,
  address: PROCESS_MANAGEMENT_ADDRESS,
  abi: [
    {
      "type": "constructor",
      "name": "",
      "inputs": [],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "event",
      "name": "AsignationCreated",
      "inputs": [
        {
          "type": "address",
          "name": "asigned",
          "indexed": true,
          "internalType": "address"
        },
        {
          "type": "address",
          "name": "multisignContract",
          "indexed": false,
          "internalType": "address"
        }
      ],
      "outputs": [],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "CurrentProcessAdded",
      "inputs": [
        {
          "type": "address",
          "name": "owner",
          "indexed": true,
          "internalType": "address"
        },
        {
          "type": "address",
          "name": "process",
          "indexed": true,
          "internalType": "address"
        }
      ],
      "outputs": [],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "DocumentProcessCreated",
      "inputs": [
        {
          "type": "address",
          "name": "creator",
          "indexed": true,
          "internalType": "address"
        },
        {
          "type": "address",
          "name": "documentProcess",
          "indexed": false,
          "internalType": "address"
        }
      ],
      "outputs": [],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "ProcessAdded",
      "inputs": [
        {
          "type": "string",
          "name": "id",
          "indexed": true,
          "internalType": "string"
        },
        {
          "type": "string",
          "name": "process",
          "indexed": false,
          "internalType": "string"
        }
      ],
      "outputs": [],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "ProcessAsigned",
      "inputs": [
        {
          "type": "address",
          "name": "_direccion",
          "indexed": true,
          "internalType": "address"
        }
      ],
      "outputs": [],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "ProcessDeleted",
      "inputs": [
        {
          "type": "string",
          "name": "id",
          "indexed": true,
          "internalType": "string"
        }
      ],
      "outputs": [],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "ProcessUpdated",
      "inputs": [
        {
          "type": "string",
          "name": "id",
          "indexed": true,
          "internalType": "string"
        },
        {
          "type": "string",
          "name": "process",
          "indexed": false,
          "internalType": "string"
        }
      ],
      "outputs": [],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "processToAsign",
      "inputs": [
        {
          "type": "address",
          "name": "_direccion",
          "indexed": true,
          "internalType": "address"
        }
      ],
      "outputs": [],
      "anonymous": false
    },
    {
      "type": "function",
      "name": "addCurrentProcess",
      "inputs": [
        {
          "type": "address",
          "name": "_owner",
          "internalType": "address"
        },
        {
          "type": "address",
          "name": "_contract",
          "internalType": "address"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "addProcess",
      "inputs": [
        {
          "type": "string",
          "name": "id",
          "internalType": "string"
        },
        {
          "type": "string",
          "name": "process",
          "internalType": "string"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "addProcessToAsign",
      "inputs": [
        {
          "type": "address",
          "name": "_direccion",
          "internalType": "address"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "createAsignationRequest",
      "inputs": [
        {
          "type": "address",
          "name": "_contract",
          "internalType": "address"
        },
        {
          "type": "address",
          "name": "_mainContract",
          "internalType": "address"
        },
        {
          "type": "address[]",
          "name": "_owners",
          "internalType": "address[]"
        },
        {
          "type": "uint256",
          "name": "_numConfirmationsRequired",
          "internalType": "uint256"
        },
        {
          "type": "string",
          "name": "_state",
          "internalType": "string"
        }
      ],
      "outputs": [
        {
          "type": "address",
          "name": "",
          "internalType": "address"
        }
      ],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "createDocumentProcess",
      "inputs": [
        {
          "type": "string",
          "name": "_initialState",
          "internalType": "string"
        },
        {
          "type": "string",
          "name": "_contractProcessId",
          "internalType": "string"
        },
        {
          "type": "address",
          "name": "_mainContract",
          "internalType": "address"
        },
        {
          "type": "address[]",
          "name": "_students",
          "internalType": "address[]"
        },
        {
          "type": "address[]",
          "name": "_director",
          "internalType": "address[]"
        },
        {
          "type": "address[]",
          "name": "_codirector",
          "internalType": "address[]"
        }
      ],
      "outputs": [
        {
          "type": "address",
          "name": "",
          "internalType": "address"
        }
      ],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "deleteProcess",
      "inputs": [
        {
          "type": "string",
          "name": "id",
          "internalType": "string"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "deleteProcessToAsign",
      "inputs": [
        {
          "type": "address",
          "name": "_direccion",
          "internalType": "address"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "getAllPendingEvaluations",
      "inputs": [
        {
          "type": "address",
          "name": "user",
          "internalType": "address"
        }
      ],
      "outputs": [
        {
          "type": "address[]",
          "name": "",
          "internalType": "address[]"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "getAllPendingProcesses",
      "inputs": [],
      "outputs": [
        {
          "type": "address[]",
          "name": "",
          "internalType": "address[]"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "getAllProcesses",
      "inputs": [],
      "outputs": [
        {
          "type": "string[]",
          "name": "",
          "internalType": "string[]"
        },
        {
          "type": "string[]",
          "name": "",
          "internalType": "string[]"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "getCurrentProcesses",
      "inputs": [
        {
          "type": "address",
          "name": "user",
          "internalType": "address"
        }
      ],
      "outputs": [
        {
          "type": "address[]",
          "name": "",
          "internalType": "address[]"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "getPendingEvaluations",
      "inputs": [
        {
          "type": "address",
          "name": "user",
          "internalType": "address"
        },
        {
          "type": "address",
          "name": "process",
          "internalType": "address"
        }
      ],
      "outputs": [
        {
          "type": "address",
          "name": "",
          "internalType": "address"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "getProcess",
      "inputs": [
        {
          "type": "string",
          "name": "id",
          "internalType": "string"
        }
      ],
      "outputs": [
        {
          "type": "string",
          "name": "",
          "internalType": "string"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "removeEvaluatorFromPending",
      "inputs": [
        {
          "type": "address",
          "name": "_contract",
          "internalType": "address"
        },
        {
          "type": "address",
          "name": "_owner",
          "internalType": "address"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "updateProcess",
      "inputs": [
        {
          "type": "string",
          "name": "id",
          "internalType": "string"
        },
        {
          "type": "string",
          "name": "process",
          "internalType": "string"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    }
  ]
});

export const usersContract = getContract({
  client,
  chain: CHAIN,
  address: USERS_DIRECTORY_ADDRESS,
  abi: [
    {
      "type": "event",
      "name": "UserAdded",
      "inputs": [
        {
          "type": "address",
          "name": "walletAddress",
          "indexed": true,
          "internalType": "address"
        },
        {
          "type": "string",
          "name": "email",
          "indexed": false,
          "internalType": "string"
        }
      ],
      "outputs": [],
      "anonymous": false
    },
    {
      "type": "function",
      "name": "addUser",
      "inputs": [
        {
          "type": "address",
          "name": "_walletAddress",
          "internalType": "address"
        },
        {
          "type": "string",
          "name": "_email",
          "internalType": "string"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "getUserByEmail",
      "inputs": [
        {
          "type": "string",
          "name": "_email",
          "internalType": "string"
        }
      ],
      "outputs": [
        {
          "type": "address",
          "name": "",
          "internalType": "address"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "getUserByWallet",
      "inputs": [
        {
          "type": "address",
          "name": "_walletAddress",
          "internalType": "address"
        }
      ],
      "outputs": [
        {
          "type": "string",
          "name": "",
          "internalType": "string"
        }
      ],
      "stateMutability": "view"
    }
  ]
});

export const getDocumentContract = (address: string) => {
  return getContract({
    client,
    chain: CHAIN,
    address,
    abi: [
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "_initialState",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_contractProcessId",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "_mainContract",
            "type": "address"
          },
          {
            "internalType": "address[]",
            "name": "_students",
            "type": "address[]"
          },
          {
            "internalType": "address[]",
            "name": "_director",
            "type": "address[]"
          },
          {
            "internalType": "address[]",
            "name": "_codirector",
            "type": "address[]"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "address",
            "name": "participant",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "string",
            "name": "name",
            "type": "string"
          }
        ],
        "name": "ParticipantAdded",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "address",
            "name": "signer",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "string",
            "name": "state",
            "type": "string"
          }
        ],
        "name": "StateChanged",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "string",
            "name": "phase",
            "type": "string"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "signer",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "string",
            "name": "state",
            "type": "string"
          },
          {
            "indexed": false,
            "internalType": "string",
            "name": "associatedLink",
            "type": "string"
          },
          {
            "indexed": false,
            "internalType": "string",
            "name": "date",
            "type": "string"
          }
        ],
        "name": "TransactionAdded",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_participant",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "_name",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "_mainContract",
            "type": "address"
          }
        ],
        "name": "addParticipant",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "_phase",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_state",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_associatedLink",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_date",
            "type": "string"
          }
        ],
        "name": "addTransaction",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "contractProcessId",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "contractState",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "index",
            "type": "uint256"
          }
        ],
        "name": "getTransaction",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getTransactionCount",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "participants",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "_newState",
            "type": "string"
          }
        ],
        "name": "setContractState",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "transactions",
        "outputs": [
          {
            "internalType": "string",
            "name": "phase",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "signer",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "state",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "associatedLink",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "date",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }
    ],
  });
};

export const getMultisignContract = (address: string) => {
  return getContract({
    client,
    chain: CHAIN,
    address,
    abi: [
      {
        "type": "constructor",
        "name": "",
        "inputs": [
          {
            "type": "address",
            "name": "_mainContract",
            "internalType": "address"
          },
          {
            "type": "address",
            "name": "_contract",
            "internalType": "address"
          },
          {
            "type": "address[]",
            "name": "_owners",
            "internalType": "address[]"
          },
          {
            "type": "uint256",
            "name": "_numConfirmationsRequired",
            "internalType": "uint256"
          },
          {
            "type": "string",
            "name": "_state",
            "internalType": "string"
          }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
      },
      {
        "type": "event",
        "name": "Confirmation",
        "inputs": [
          {
            "type": "address",
            "name": "sender",
            "indexed": true,
            "internalType": "address"
          },
          {
            "type": "string",
            "name": "state",
            "indexed": false,
            "internalType": "string"
          }
        ],
        "outputs": [],
        "anonymous": false
      },
      {
        "type": "function",
        "name": "callChangeState",
        "inputs": [
          {
            "type": "string",
            "name": "nuevoEstado",
            "internalType": "string"
          }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
      },
      {
        "type": "function",
        "name": "confirmTransaction",
        "inputs": [],
        "outputs": [],
        "stateMutability": "nonpayable"
      },
      {
        "type": "function",
        "name": "contratoObjetivo",
        "inputs": [],
        "outputs": [
          {
            "type": "address",
            "name": "",
            "internalType": "address"
          }
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "isConfirmed",
        "inputs": [
          {
            "type": "address",
            "name": "",
            "internalType": "address"
          }
        ],
        "outputs": [
          {
            "type": "bool",
            "name": "",
            "internalType": "bool"
          }
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "isOwner",
        "inputs": [
          {
            "type": "address",
            "name": "",
            "internalType": "address"
          }
        ],
        "outputs": [
          {
            "type": "bool",
            "name": "",
            "internalType": "bool"
          }
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "mainContract",
        "inputs": [],
        "outputs": [
          {
            "type": "address",
            "name": "",
            "internalType": "address"
          }
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "numConfirmationsRequired",
        "inputs": [],
        "outputs": [
          {
            "type": "uint256",
            "name": "",
            "internalType": "uint256"
          }
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "owners",
        "inputs": [
          {
            "type": "uint256",
            "name": "",
            "internalType": "uint256"
          }
        ],
        "outputs": [
          {
            "type": "address",
            "name": "",
            "internalType": "address"
          }
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "setContratoObjetivo",
        "inputs": [
          {
            "type": "address",
            "name": "_direccionContrato",
            "internalType": "address"
          }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
      }
    ],
  });
};