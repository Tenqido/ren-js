import * as React from "react";

import { TokenIcon } from "@renproject/react-components";

import { ReactComponent as Brave } from "../../images/brave.svg";
import { ReactComponent as Coinbase } from "../../images/coinbase.svg";
import { ReactComponent as Imtoken } from "../../images/imtoken.svg";
import { ReactComponent as Metamask } from "../../images/metamask.svg";
import { ReactComponent as Status } from "../../images/status.svg";
import { ReactComponent as Trust } from "../../images/trust.svg";
import { Token } from "../../state/generalTypes";
import { Popup } from "../views/Popup";

export const LogIn = ({ token, paused, wrongNetwork, correctNetwork }: { token: Token, paused: boolean, wrongNetwork: number | undefined, correctNetwork: string }) => {
    return <Popup mini={paused}>
        {paused ? <>
            <div className="side-strip"><TokenIcon token={token} /></div>
            <div className="popup--body--details">
                Connect Web3
                            </div>
        </> : <>
                <div className="popup--body popup--loading connect-web3">
                    <div className="connect-web3--browsers">
                        {/* tslint:disable: react-a11y-anchors */}
                        <a target="_blank" rel="noopener noreferrer" title="Metamask Web3 Browser" href="https://metamask.io/"><Metamask /></a>
                        <a target="_blank" rel="noopener noreferrer" title="Coinbase Web3 Browser" href="https://wallet.coinbase.com/"><Coinbase /></a>
                        <a target="_blank" rel="noopener noreferrer" title="Trust Web3 Browser" href="https://trustwallet.com/"><Trust /></a>
                        <a target="_blank" rel="noopener noreferrer" title="Imtoken Web3 Browser" href="https://www.token.im/"><Imtoken /></a>
                        <a target="_blank" rel="noopener noreferrer" title="Brave Web3 Browser" href="https://brave.com/"><Brave /></a>
                        <a target="_blank" rel="noopener noreferrer" title="Status Web3 Browser" href="https://status.im"><Status /></a>
                        {/* tslint:enable: react-a11y-anchors */}
                    </div>
                    {wrongNetwork ? <>Please switch to the {correctNetwork} Ethereum network.</> : <>Connect your Ethereum Web3 wallet to continue</>}
                </div>
            </>}
    </Popup>;
};
