export const contractAddress = '0x1365EE640F86a328BBfae294881d833a78Dd9557'
export const marketcontractAddress = '0xA71808F4591D5430f0b325cc95d4c2A6E327faA8'
export const erc20tokenAddress = '0x244F8514DD74A8c223F181a118BEE001F0c2465B'
export const marketcontractAddresses: { [k: string]: string } = {
    'NETFLIX': '0x1365EE640F86a328BBfae294881d833a78Dd9557'
}

export const URL = "http://localhost:8000"

export const NFTs =
    [
        "https://i.seadn.io/gae/0fG_xmFr3za03DGXa3IOWVhsC9L_1nNbNc_clKEl0ijbCzw2S50Rf6oZ2K_tuMqSvO-h_haTLbqGc-1o6lR-7K2C5HnX8Xcqs04sww?auto=format&dpr=1&w=1000",
        "https://i.seadn.io/gae/6op1zkBNk6qWIFcnDk4Sup9TpFIkRviLsP-R8b_hIvLZloHTdaRuGXg8mGB-UY1nAcxrFGoeQK5ro-sg7dCdxsAmoV4w7aceG1e6NQ?auto=format&dpr=1&w=1000",
        "https://i.seadn.io/gae/4I18u69A5IDGOcGkKSyPo1kmPhT3_yZVg6c4383jPsWZxKxRONdmXMUHJN4A7a4IM-bEcHK9GMlEO1T90f1q_oEd2iMbAT04SmSs?auto=format&dpr=1&w=1000",
        "https://i.seadn.io/gae/4YqVbJyRn_sXqetbVIJFBAmVTbsQGy0AFY7T7F1VaHw-PAP3tAfls3ZvMhwG9wEgARB1_itX-YEaijCAeSBJwo2hL8At5c_TMeqoXg?auto=format&dpr=1&w=1000",
        "https://i.seadn.io/gae/JKJV4UbgEXmF7aWQCww0HO0qzmCITDKdqiHC1EmK0rT0BdUjb0b0eeKjFqqxJp0Bqg2YvX3NzHvcUAOyPoML20lvVbxLRMH0Qegbn0U?auto=format&dpr=1&w=1000",
        "https://i.seadn.io/gae/TvP5PCzwtIBHqWzivkl5-aU4uX3EeJ2PrQVYIUYC3MPDCztaJgTJP3gwLgC3Lq8LMULPPZuVtNKhp0XtXUfPaMApev2IBu4212naIg?auto=format&dpr=1&w=1000",
        "https://i.seadn.io/gae/KzI6Yl7DZpQw0Xspd7syhTKAI_GhPcBI0ys36FYq_yak_LBVR8pI5jx2y2GLHMVwRN3Txy8zOZd6h2PK1bGefFLujvf6PN9PjQ24?auto=format&dpr=1&w=1000",
    ]
export const nftGenerator = () => {
    const randomIndex = Math.floor(Math.random() * NFTs.length);

    // Now you can access the element at the random index in the array
    const nft = NFTs[randomIndex];
    return {
        nft,
        name: `Netflix NFT ${randomIndex}`
    }
}