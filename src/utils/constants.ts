import { createThirdwebClient, defineChain } from "thirdweb";

export const client = createThirdwebClient({
    clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID as string,
});

export const CHAIN = defineChain(11155111);

export const ACCOUNT_FACTORY_ADDRESS = "0x1c53EAE1d3b95eC81F569d055734BB8ce142C761";
export const USERS_DIRECTORY_ADDRESS = "0x90edf770B49fF1D581093DAD8737200ac3df702C";
//export const PROCESS_MANAGEMENT_ADDRESS = "0xb84f3214E3b0f4d593E55efA379b8A68a6E8E9E7"; //Anterior
export const PROCESS_MANAGEMENT_ADDRESS = "0xF5Fa3079bbD0eAbe482e02F805575639390ca047";
