import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "../redux/blockchain/blockchainActions";
import { fetchData } from "../redux/data/dataActions";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Benifit from "../components/Benifit";
import Roadmap from "../components/Roadmap";
import Footer from "../Footer";

function home(props) {

    const dispatch = useDispatch();
    const blockchain = useSelector((state) => state.blockchain);
    const data = useSelector((state) => state.data);
    const [claimingNft, setClaimingNft] = useState(false);
    const [feedback, setFeedback] = useState(`Click buy to mint your NFT.`);
    const [mintAmount, setMintAmount] = useState(1);
    const [CONFIG, SET_CONFIG] = useState({
      CONTRACT_ADDRESS: "0x92f6851d3699298b9ddea79aa6ba78a889015792",
      SCAN_LINK: "",
      NETWORK: {
        NAME: "Basketball Junkies",
        SYMBOL: "BBJ",
        ID: 4,
      },
      NFT_NAME: "Basketball Junkies",
      SYMBOL: "BBJ",
      MAX_SUPPLY: 10,
      WEI_COST: 100000000000000000,
      DISPLAY_COST: 0.1,
      GAS_LIMIT: 285000,
      MARKETPLACE: "Opensea",
      MARKETPLACE_LINK: "https://opensea.io/",
      SHOW_BACKGROUND: true,
    });
  
    const claimNFTs = () => {
      let cost = CONFIG.WEI_COST;
      let gasLimit = CONFIG.GAS_LIMIT;
      let totalCostWei = String(cost * mintAmount);
      let totalGasLimit = String(gasLimit * mintAmount);
      setFeedback(`Minting your ${CONFIG.NFT_NAME}...`);
      setClaimingNft(true);
      blockchain.smartContract.methods
        .mint(mintAmount)
        .send({
          gasLimit: String(totalGasLimit),
          to: CONFIG.CONTRACT_ADDRESS,
          from: blockchain.account,
          value: totalCostWei,
        })
        .once("error", (err) => {
          setFeedback("Sorry, something went wrong please try again later.");
          // setFeedback(err.toString())
          setClaimingNft(false);
        })
        .then((receipt) => {
          setFeedback(
            `WOW, the ${CONFIG.NFT_NAME} is yours! go visit Opensea.io to view it.`
          );
          setClaimingNft(false);
          dispatch(fetchData(blockchain.account));
        });
    };
  
    const decrementMintAmount = () => {
      let newMintAmount = mintAmount - 1;
      if (newMintAmount < 1) {
        newMintAmount = 1;
      }
      setMintAmount(newMintAmount);
    };
  
    const incrementMintAmount = () => {
      let newMintAmount = mintAmount + 1;
      if (newMintAmount > 10) {
        newMintAmount = 10;
      }
      setMintAmount(newMintAmount);
    };
  
    // counter function
    const [counter, setCounter] = useState(1);
    function decrementCounter() {
      if (counter <= 1) {
        setCounter(1);
      } else {
        setCounter(counter - 1);
      }
    }
    const getData = () => {
      if (blockchain.account !== "" && blockchain.smartContract !== null) {
        dispatch(fetchData(blockchain.account));
  
      }
    };
  
    const getConfig = async () => {
      const configResponse = await fetch("/config/config.json", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const config = await configResponse.json();
      SET_CONFIG(config);
    };
  
    useEffect(() => {
      getConfig();
    }, []);
  
    useEffect(() => {
      getData();
    }, [blockchain.account]);
  
  
    return (
      <><div className="page" id="top">
        <Navbar />
        <Banner />
        <div className="w2" >
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="full-img">
                  <img src="images/dapp_img.png" alt=""/>
                </div>
                <p>dsf{data.totalSupply}</p>
                <div className="option" id="MINTNOW">
                  {Number(data.totalSupply) >= CONFIG.MAX_SUPPLY ? (
                    <>
                      <div className="mintNowText">
                        The sale has ended.
                      </div>
                      <div className="mintNowText">
                        You can still find {CONFIG.NFT_NAME} on
                      </div>
                      <a target={"_blank"} href={CONFIG.MARKETPLACE_LINK} className="button">
                        {CONFIG.MARKETPLACE}
                      </a>
                    </>
                  ) : (
                    <>
                      {blockchain.account === "" ||
                        blockchain.smartContract === null ? (
                        <div>
                          <div className="mintNowText">
                            Connect to the {CONFIG.NETWORK.NAME} network
                          </div>
                          {(window.matchMedia("only screen and (max-width: 760px)").matches)?

                            <a href={CONFIG.DEEPLINK} className="button">
                                CONNECT
                            </a>
                            :
                            <a href="#" className="button"
                                onClick={(e) => {
                                e.preventDefault();
                                dispatch(connect());
                                getData();
                                }}
                            >
                              CONNECT
                            </a>
                        }
                          {blockchain.errorMsg !== "" ? (
                            <>
                              <div
                                className="mintNowText">
                                {blockchain.errorMsg}
                              </div>
                            </>
                          ) : null}
                        </div>
                      ) : (
                        <>
                          <div className="spinner clearfix">
                            <div className="banner-counter">
                              <button className="subtractOne"
                                // disabled={claimingNft ? 1 : 0}
                                onClick={(e) => {
                                  e.preventDefault();
                                  decrementMintAmount();
                                }}>
                                -
                              </button>
                              <div className="inputField">{mintAmount}</div>
                              <button
                                className="addOne"
                                // disabled={claimingNft ? 1 : 0}
                                onClick={(e) => {
                                  e.preventDefault();
                                  incrementMintAmount();
                                }}
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <a className="button"
                            disabled={claimingNft ? 1 : 0}
                            onClick={(e) => {
                              e.preventDefault();
                              claimNFTs();
                              getData();
                            }}
                          >
                            {claimingNft ? "BUSY" : "MINT NOW"}
                          </a>
                          <div className="mintNowText">
                          {feedback}
                            <p>1 {CONFIG.SYMBOL} costs {CONFIG.DISPLAY_COST}{" "}
                              {CONFIG.NETWORK.SYMBOL}.</p>
                          </div>
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
              <div className="col-lg-5 ml-auto align-self-end">
                <div className="pb-3">
                  <h4>The Biggest Social Media MARKETING Panel in the world has launched this NFT, with many benefits and many future hiding secrets. Limited Edition, 1 time only, are you in?</h4>
                </div>
                <div className="media">
                  <div className="media-body">
                    <h4>Download Metamask</h4>
                    <p>This is a pre-sale and you can only mint using a Metamask wallet, download Metamask on your phone or add it as an attachment on your PC via Google Chrome.</p>
                  </div>
                </div>
                <div className="media">
                  <div className="media-body">
                    <h4>Connect your wallet</h4>
                    <p>After downloading Metamask, simply connect it by pressing the CONNECT button.</p>
                  </div>
                </div>
                <div className="media">
                  <div className="media-body">
                    <h4>Get your NFT</h4>
                    <p>To get your NFT, you have to select how many NFTs you want and then press the MINT button, make sure you have 0.1ETH + minting fees (around 10$) to be able to mint 1 NFT.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <Benifit />
        <Roadmap />
        <Footer />
  
  
  
      </div>
  
      </>
  
    );
  }
  
  export default home;