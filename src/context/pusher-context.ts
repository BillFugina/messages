import Pusher from "pusher-js"
import React from "react"

const pusherApiKey: string = process.env.REACT_APP_PUSHER_KEY || ""
const pusherCluster: string = process.env.REACT_APP_PUSHER_CLUSTER || ""
const pusher = new Pusher(pusherApiKey, { cluster: pusherCluster })
const pusherContext = React.createContext(pusher)

export { pusherContext }
