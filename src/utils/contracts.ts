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
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "assigned",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "multisignContract",
          "type": "address"
        }
      ],
      "name": "AssignmentCreated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "process",
          "type": "address"
        }
      ],
      "name": "CurrentProcessAdded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "process",
          "type": "address"
        }
      ],
      "name": "CurrentProcessDeleted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "creator",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "documentProcess",
          "type": "address"
        }
      ],
      "name": "DocumentProcessCreated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "string",
          "name": "id",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "process",
          "type": "string"
        }
      ],
      "name": "ProcessAdded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "processAddress",
          "type": "address"
        }
      ],
      "name": "ProcessAssigned",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "string",
          "name": "id",
          "type": "string"
        }
      ],
      "name": "ProcessDeleted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "string",
          "name": "id",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "process",
          "type": "string"
        }
      ],
      "name": "ProcessUpdated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "processAddress",
          "type": "address"
        }
      ],
      "name": "processToAssign",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_processAddress",
          "type": "address"
        }
      ],
      "name": "addCurrentProcess",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "id",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "process",
          "type": "string"
        }
      ],
      "name": "addProcess",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_processAddress",
          "type": "address"
        }
      ],
      "name": "addProcessToAssign",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_contract",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_mainContract",
          "type": "address"
        },
        {
          "internalType": "address[]",
          "name": "_owners",
          "type": "address[]"
        },
        {
          "internalType": "uint256",
          "name": "_numConfirmationsRequired",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_state",
          "type": "string"
        }
      ],
      "name": "createAssignmentRequest",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
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
      "name": "createDocumentProcess",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_processAddress",
          "type": "address"
        }
      ],
      "name": "deleteCurrentProcess",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "id",
          "type": "string"
        }
      ],
      "name": "deleteProcess",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_processAddress",
          "type": "address"
        }
      ],
      "name": "deleteProcessToAssign",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "getAllPendingEvaluations",
      "outputs": [
        {
          "internalType": "address[]",
          "name": "",
          "type": "address[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAllProcesses",
      "outputs": [
        {
          "internalType": "string[]",
          "name": "",
          "type": "string[]"
        },
        {
          "internalType": "string[]",
          "name": "",
          "type": "string[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAllProcessesToAssign",
      "outputs": [
        {
          "internalType": "address[]",
          "name": "",
          "type": "address[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "getCurrentProcesses",
      "outputs": [
        {
          "internalType": "address[]",
          "name": "",
          "type": "address[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "process",
          "type": "address"
        }
      ],
      "name": "getPendingEvaluations",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "id",
          "type": "string"
        }
      ],
      "name": "getProcess",
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
          "internalType": "address",
          "name": "_contract",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_owner",
          "type": "address"
        }
      ],
      "name": "removeEvaluatorFromPending",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "id",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "process",
          "type": "string"
        }
      ],
      "name": "updateProcess",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
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
            "name": "comments",
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
            "name": "_comments",
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
        "name": "getContractProcessId",
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
        "name": "getContractState",
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
            "internalType": "address",
            "name": "_participant",
            "type": "address"
          }
        ],
        "name": "getParticipant",
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
            "name": "comments",
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
        "inputs": [
          {
            "internalType": "address",
            "name": "_mainContract",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "_contract",
            "type": "address"
          },
          {
            "internalType": "address[]",
            "name": "_owners",
            "type": "address[]"
          },
          {
            "internalType": "uint256",
            "name": "_numConfirmationsRequired",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "_state",
            "type": "string"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "sender",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "string",
            "name": "state",
            "type": "string"
          }
        ],
        "name": "Confirmation",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "nuevoEstado",
            "type": "string"
          }
        ],
        "name": "callChangeState",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "confirmTransaction",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "contratoObjetivo",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
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
        "name": "isConfirmed",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
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
        "name": "isOwner",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "mainContract",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "numConfirmationsRequired",
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
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "owners",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_contractAddress",
            "type": "address"
          }
        ],
        "name": "setContratoObjetivo",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ],
  });
};