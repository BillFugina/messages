import { Channel } from 'pusher-js'
import { pusherContext } from 'src/context/pusher-context'
import { PusherReducer } from 'src/types/pusher'
import { useCallback, useContext, useEffect, useRef, useState } from 'react'

const usePusher = <TState, TMessageFormat>(
  channelName: string,
  eventName: string,
  reducer: PusherReducer<TState, TMessageFormat>,
  initialState: TState
): [TState] => {
  const channel = useRef<Channel>()
  const pusher = useContext(pusherContext)
  const [state, setState] = useState(initialState)

  const messageHandler = useCallback(
    (message: TMessageFormat) => {
      const newState = reducer(state, message)
      setState(newState)
    },
    [state]
  )

  useEffect(() => {
    channel.current = pusher.subscribe(channelName)
    channel.current.bind(eventName, messageHandler)

    return () => {
      if (channel.current) {
        channel.current.unbind(eventName, messageHandler)
      }
    }
  }, [])

  return [state]
}

export { usePusher }
