import { useEffect, useState } from 'react'
import './App.css';
import img1 from './assets/tf_1.png';
import img2 from './assets/tf_2.png';
import img3 from './assets/tf_3.png';
import cell from './assets/cell.png';

function App() {
  const [state, setState] = useState('-');

  useEffect(() => {
    const client = window.mqtt.connect("ws://broker.emqx.io:8083/mqtt");

    client.on('connect', function () {
      console.log('Connected')
      client.subscribe('main/#', function (err) {
      })
    })

    client.on('message', function (topic, message) {
      console.log(topic, message.toString())
      setState(message.toString())
    })
  }, [state]);

  const handleCell = (e) => {
    const client = window.mqtt.connect("ws://broker.emqx.io:8083/mqtt");
    client.publish('main', 'red')
    setTimeout(() => {
      client.publish('main', 'yellow')
      setTimeout(() => {
        client.publish('main', 'green')
      }, 2000);
    }, 4000);
  }

  return (
    <div className="container">
      <div className='row'>
        <div className='col-sm-6'>
          <div className='tf'>
            {
              state === 'red' ? <img src={img1} alt='img' /> : state === 'green' ? <img src={img2} alt='img' /> : <img src={img3} alt='img' />
            }
          </div>
        </div>
        <div className='col-sm-6'>
          <img src={cell} onClick={handleCell} alt='alt' />
        </div>
      </div>
    </div>
  )
}

export default App