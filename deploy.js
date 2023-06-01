const ethers = require("ethers");
const fs = require("fs-extra");

async function main() {
  // Compile them in our code
  //  or
  // compile them seperately
  // http://127.0.0.1:7545
  // goto Ethereum JSON-RPC Specification and find different methods you can call
  const provider = new ethers.JsonRpcProvider("http://192.168.43.214:8545");
  // To get our Wallet
  const wallet = new ethers.Wallet(
    "0x34e9842707ef34cc26c8bf0c6e87ce2fcb44e80f54d50ef9b6e934e412735514",
    provider
  );
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying! Please wait........");
  const contract = await contractFactory.deploy();
  console.log(contract);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
