import 'src/App.css'
import { PusherReducer } from 'src/types/pusher'
import { usePusher } from 'src/hooks/pusher-hook'
import logo from 'src/logo.svg'
import React from 'react'

type IMessageFormat = {
  type: 'text'
  body: string
}

type IMessageState = {
  messageText: string
}

const reducer: PusherReducer<IMessageState, IMessageFormat> = (state, message) => {
  return { ...state, messageText: message.body }
}

const initialState: IMessageState = {
  messageText: 'hello world'
}

const App: React.SFC = () => {
  const [messageState] = usePusher('messages', 'text', reducer, initialState)

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>{messageState.messageText}</p>
        <a className='App-link' href='https://reactjs.org' target='_blank' rel='noopener noreferrer'>
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
