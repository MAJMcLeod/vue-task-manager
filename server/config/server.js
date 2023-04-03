export default{
    // Values taken from rdacc
    cookiesDomain: 'localhost',
    cookiesSecure: true,
    cookiesExpiryDate: () => new Date(Date.now() + 24 * 60 * 60 * 1000),
    accessTokenDuration: 900,
    refreshTokenDuration: '1 day',
    port: 3000,
}