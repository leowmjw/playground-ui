/**
 * Created by leow on 6/3/17.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import ApolloClient, {createNetworkInterface} from 'apollo-client';
import {ApolloProvider} from 'react-apollo'
import {gql, graphql} from 'react-apollo'

import './index.css'

const networkInterface = createNetworkInterface(
    {
        "uri": "https://api.github.com/graphql",
    }
)

const util = require('util')

networkInterface.use([{

    applyMiddleware(req, next) {

        if (!req.options.headers) {
            req.options.headers = {}
        }
        // Token needs to be loaded from .env.local
        // GITHUB_TOKEN
        const token = "xxx"
        req.options.headers.authorization = token ? `Bearer ${token}` : null

        // req.request.variables = {}
        req.request.operationName = null

        console.error(util.inspect(req.request))
        next()
    }

}])

const apollo_client = new ApolloClient({
    networkInterface,
})

apollo_client.query({

    query: gql`{
        viewer {
            avatarUrl
        }
    }`,

}).then(data => console.log(data)).catch(error => console.error(error))


const sayHi = (name) => `Hello my name is ${name}`

const multiplyby10 = (number) => {
    return (
        <div>
            <h1>{ sayHi('Ming Yu') }</h1>
        </div>
    )
}

const whatIsMyRepos = () => {
    return graphql(gql`{ 
        user(login:"leowmjw") {
            avatarUrl
        }
}`)
}

const PeopleOfMeetup = ({data: {loading, error, ...channels}}) => {

    const util = require('util')


    if (loading) {
        return <p>Loading ...</p>
    }

    if (error) {
        return <p>{error.message}</p>
    }

    return (
        <p>
            {util.inspect(channels)}
        </p>
    )
}
const PeopleOfMeetupWithData = whatIsMyRepos()(PeopleOfMeetup)

class App extends React.Component {

    render() {
        return (
            <div>
                <PeopleOfMeetupWithData/>
                { multiplyby10(10) }
            </div>
        )
    }
}

ReactDOM.render(
    <ApolloProvider client={apollo_client}>
        <App />
    </ApolloProvider>,
    document.getElementById('root')
)