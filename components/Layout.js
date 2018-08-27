import React from 'react';
import { Container, Message } from 'semantic-ui-react';
import Header from './Header';
// import Footer from './Footer';
import Head from 'next/head'; // to move Head tag to top of html doc


export default (props) => {
  return (
    <Container>
      <Head>
        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.3/semantic.min.css"/>
      </Head>

      <Header />
      { props.children }
      <Message
        icon='warning circle'
        color='red'
        header='WARNING'
        content="This is an experimental Ethereum project currently on the Rinkeby testnet.
        DO NOT SEND REAL ETHER TO THIS CONTRACT YOU WILL LOSE IT."
      />
    </Container>
  );
};
