import { Channel } from 'pusher-js'
import { IPusherSendMessage, PusherReducer } from 'src/types/pusher'
import { pusherContext } from 'src/context/pusher-context'
import { useCallback, useContext, useEffect, useRef, useState } from 'react'

const usePusher = <TState, TMessageFormat>(
  channelName: string,
  eventName: string,
  reducer: PusherReducer<TState, TMessageFormat>,
  initialState: TState
): [TState, IPusherSendMessage<TMessageFormat>] => {
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

  const sendMessage: IPusherSendMessage<TMessageFormat> = (message: TMessageFormat, selfProcess?: boolean) => {
    if (channel.current) {
      channel.current.trigger(eventName, message)
    }
    if (selfProcess) {
      messageHandler(message)
    }
  }

  return [state, sendMessage]
}

export { usePusher }
