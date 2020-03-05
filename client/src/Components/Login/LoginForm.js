import React, { useState } from 'react';
import Logo from '../../Images/GoFarlogo.png';
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from 'semantic-ui-react';

const LoginForm = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          <Image src={Logo} style={{ width: '30%', height: '10%' }} />
        </Header>
        <Form size="large">
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="E-mail address"
              value={email}
              onChange={e => {
                setEmail(e.target.value);
              }}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              onChange={e => setPassword(e.target.value)}
            />

            <Button
              onClick={e => {
                props.handleLogin(email, password);
                e.preventDefault();
              }}
              color="blue"
              fluid
              size="large"
            >
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          New to us? <a href="/#">Sign Up</a>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default LoginForm;
