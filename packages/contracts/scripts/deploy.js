async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with", deployer.address);

  const K = await ethers.getContractFactory("KwelichainCert");
  const contract = await K.deploy(deployer.address);
  await contract.deployed();
  console.log("KwelichainCert deployed to:", contract.address);
}

main()
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
