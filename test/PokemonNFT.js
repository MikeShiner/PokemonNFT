const { ethers } = require("hardhat");
const { expect } = require("chai");
// Constants
const baseUri = 'https://mybaseuri.com/';

describe("NFT Contract Deployment", function () {
  it("Deployment should correctly assign address as owner", async function () {
    const [owner] = await ethers.getSigners();

    const NFT = await ethers.getContractFactory("PokemonNFT");

    const pokemonNFT = await NFT.deploy('');

    // const ownerBalance = await hardhatToken.balanceOf(owner.address);
    expect(await pokemonNFT.owner()).to.equal(owner.address);
  });
});

describe("NFT Minting", function () {

    it("Minting Pokemon should return itemId", async function () {
      const [owner] = await ethers.getSigners();
  
      const NFT = await ethers.getContractFactory("PokemonNFT");
  
      const pokemonNFT = await NFT.deploy('');
      let itemId = await pokemonNFT.callStatic.mintPokemon()
      expect(itemId).to.equal('1');
    });

    it("Minting Pokemon should increment totalSupply", async function () {
      const [owner] = await ethers.getSigners();
  
      const NFT = await ethers.getContractFactory("PokemonNFT");
  
      const pokemonNFT = await NFT.deploy('');
      await pokemonNFT.mintPokemon()
      await pokemonNFT.mintPokemon()

      expect(await pokemonNFT.totalSupply()).to.equal(2);
    });

    it("Minting Pokemon should return valid tokenURI", async function () {
      const [owner] = await ethers.getSigners();
  
      const NFT = await ethers.getContractFactory("PokemonNFT");
      const pokemonNFT = await NFT.deploy(baseUri);

      // Mint NFT
      let tokenId = await pokemonNFT.callStatic.mintPokemon() /* simulate execution to get result */
      await pokemonNFT.mintPokemon() /* state-change minting */

      let tokenUri = await pokemonNFT.tokenURI(tokenId)
      expect(tokenUri).to.equal(baseUri + tokenId);
    });

    it("tokensOfOwner returns array of tokens owned by address", async function () {
      const [owner] = await ethers.getSigners();
  
      const NFT = await ethers.getContractFactory("PokemonNFT");
      const pokemonNFT = await NFT.deploy(baseUri);

      // Mint NFT
      await pokemonNFT.mintPokemon()
      await pokemonNFT.mintPokemon()

      let tokens = await pokemonNFT.tokensOfOwner(owner.address)
      expect(tokens.length).to.equal(2);
    });

  });

  describe("Upgradability", function () {
    it("Updating BaseUri should reflect updated tokenURI for existing tokens", async function () {
      const [owner] = await ethers.getSigners();
  
      const NFT = await ethers.getContractFactory("PokemonNFT");
  
      const pokemonNFT = await NFT.deploy('');
      await pokemonNFT.mintPokemon()
      await pokemonNFT.mintPokemon()
  
      expect(await pokemonNFT.tokenURI(1)).to.equal('1');
      await pokemonNFT.setBaseURI(baseUri)
      expect(await pokemonNFT.tokenURI(1)).to.equal(baseUri + '1');
    });

    it("Updating BaseUri should be denied for non-owners", async function () {
      const [owner, user] = await ethers.getSigners();
  
      const NFT = await ethers.getContractFactory("PokemonNFT");
  
      const pokemonNFT = await NFT.deploy('');
  
      expect(pokemonNFT.connect(user).setBaseURI('test')).to.be.reverted;
    });
  });