export default{
    // Gives the module a local namespace rather than a global allowing the store to be less bloated
    namespaced: true,
    // Declaring state
    state:{
        userDetails: null,
        isAuthenticated: false
    },
    // Declaring getters to access state
    getters: {
        getUserDetails: state => {
            return state.userDetails;
        },
        getIsAuthenticated: state => {
            return state.isAuthenticated;
        }
    },
    // Declaring mutators to update state
    mutations: {
        setUserDetails(state, data){
            state.userDetails = data;
        },
        setIsAuthenticated(state, data){
            state.isAuthenticated = data;
        },
    },
}