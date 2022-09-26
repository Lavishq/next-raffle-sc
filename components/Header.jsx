import { ConnectButton } from "web3uikit";

export default function Header() {
    return (
        <sdiv className="p-3 border-b-2 flex flex-row">
            <h1 className="py-4 px-4 font-bold text-3xl">Decentralised Raffle</h1>
            <div className="ml-auto py-4 px-4">
            <ConnectButton moralisAuth={false} />
            </div>
        </sdiv>
    )
}