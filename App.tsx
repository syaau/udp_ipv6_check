/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useImperativeHandle, useRef, useState } from 'react';

import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import udp from 'react-native-udp';

const MessageBox = React.forwardRef((props, ref) => {
  const [msg, setMessage] = useState('Debug Log\r\n');

  useImperativeHandle(ref, () => {
    let count = 0;
    return {
      addLine: (line: string) => {
        count += 1;
        setMessage((prev) => prev + new Date().toLocaleTimeString() + '::' + line + '\r\n');
      }
    }
  });

  return (
    <View style={{flex: 1, width: '100%', borderColor: '#aaa', borderWidth: 1, padding: 8, overflow: 'scroll', justifyContent: 'flex-end'}}>
      <Text>{msg}</Text>
    </View>
  )
});


function App(): JSX.Element {
  const [ip, setIp] = useState('13.126.248.48');
  const [port, setPort] = useState('3000');
  const msgRef = useRef<{ addLine: (line: string) => void }>();

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  function sendData() {
    const sock = udp.createSocket({
      type: 'udp4'
    });

    msgRef.current?.addLine(`Sending ... ${ip}:${port}`);
    sock.bind(() => {
      sock.send('Hello World', 0, undefined, parseInt(port), ip, (err) => {
        if (err) {
          console.error(err);
          msgRef.current?.addLine('ERR::' + err.message);
        } else {
          msgRef.current?.addLine('Data Sent');
        }
        sock.close();
      });
    });
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <View style={{padding: 10, backgroundColor: 'white', flexDirection: 'column', flex: 1}}>
        <Text>Hermes: {!!global.HermesInternal ? 'enabled' : 'disabled'}</Text>
        <Text>IP</Text>
        <TextInput style={styles.input} value={ip} onChangeText={setIp} />
        <Text>Port</Text>
        <TextInput style={styles.input} value={port} onChangeText={setPort} />
        <Button onPress={sendData} title="Send UDP Data" />
        <MessageBox ref={msgRef} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    padding: 4,
    borderWidth: 1,
    borderColor: 'black',
  },
});

export default App;
