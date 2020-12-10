export const fetchPortfolio = (portfolioId) => {
    return $.ajax({
        url: `/api/portfolios/${portfolioId}`,
        method: 'GET'
    })
}

export const postPortfolio = (portfolio) => {
    return $.ajax({
        url: `/api/portfolios`,
        method: 'POST',
        data: { portfolio }
    })
}