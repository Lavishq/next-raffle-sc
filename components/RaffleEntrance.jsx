import { useWeb3Contract } from "react-moralis"
import { abi, contractAddress } from "../constants"
import { useMoralis } from "react-moralis"
import { useEffect, useState } from "react"
import { ethers } from "ethers"
import { useNotification } from "web3uikit"

export default function RaffleEntrance() {
    const { chainId: chainIdHex, isWeb3Enabled } = useMoralis()
    // console.log(parseInt(chainIdHex))
    // console.log(chainId)
    const chainId = parseInt(chainIdHex)
    const raffleAddress = chainId in contractAddress ? contractAddress[chainId][0] : null
    // maybe I can use this too as I had some error of exporting as contractAddresses so found `"Hello World".includes("Hello");` on mozilla docs

    const [entranceFee, setEntrancefee] = useState("0")
    const [numPlayers, setNumPlayers] = useState("0")
    const [recentWinner, setRecentWinner] = useState("0")

    const dispatch = useNotification()

    const {
        runContractFunction: enterRaffle,
        isLoading,
        isFetching,
    } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "enterRaffle",
        params: {},
        msgValue: entranceFee,
    })

    const { runContractFunction: getEntranceFee } = useWeb3Contract(
        {
            abi: abi,
            contractAddress: raffleAddress,
            functionName: "getEntranceFee",
            params: {},
        },
        [entranceFee]
    )

    const { runContractFunction: getNumberOfPlayers } = useWeb3Contract(
        {
            abi: abi,
            contractAddress: raffleAddress,
            functionName: "getNumberOfPlayers",
            params: {},
        },
        [entranceFee]
    )

    const { runContractFunction: getRecentWinner } = useWeb3Contract(
        {
            abi: abi,
            contractAddress: raffleAddress,
            functionName: "getRecentWinner",
            params: {},
        },
        [entranceFee]
    )

    async function updateUI() {
        const entranceFeeFromCall = (await getEntranceFee()).toString()
        const numPlayersFromCall = (await getNumberOfPlayers()).toString()
        const recentWinnerFromCall = await getRecentWinner()
        setEntrancefee(entranceFeeFromCall)
        setNumPlayers(numPlayersFromCall)
        setRecentWinner(recentWinnerFromCall)
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUI()
        }
    }, [isWeb3Enabled])

    const handleSuccess = async (tx) => {
        await tx.wait(1)
        handleNewNotification(tx)
        updateUI()
    }
    const handleNewNotification = () => {
        dispatch({
            type: "info",
            message: "transaction complete",
            title: "tx notification",
            position: "topR",
            // icon: "bell",
        })
    }

    return (
        <div className="p-5">
            Hi from Raffle Entrance!
            {raffleAddress ? (
                <div>
                    <button
                        className="hover:bg-blue-500 bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto"
                        onClick={async () =>
                            await enterRaffle({
                                onSuccess: handleSuccess,
                                onError: (error) => console.log(error),
                            })
                        }
                        disabled={isLoading || isFetching}
                    >
                        {isLoading || isFetching ? (
                            <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
                        ) : (
                            <div>Enter Raffle</div>
                        )}
                    </button>

                    <div>Entrance Fee : {ethers.utils.formatUnits(entranceFee, "ether")} ETH</div>
                    <div>Number Of Players : {numPlayers}</div>
                    <div>Recent Winner : {recentWinner}</div>
                </div>
            ) : (
                "Raffle Address 404"
            )}
        </div>
    )
}
