import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { login } from './api';  // Import the API function

const LoginForm = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Use the imported login function to call the API
      const data = await login(values.username, values.password);
      const { token } = data;

      if (token) {
        // Log the access token to the console
        console.log('Access Token:', token);

        localStorage.setItem('authToken', token);
        onLogin(token);
        navigate('/pricing');
      } else {
        message.error('Login failed. Please try again.');
      }
    } catch (error) {
      message.error('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form name="login" onFinish={onFinish} style={{ maxWidth: 300, margin: 'auto', padding: '20px' }}>
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password placeholder="Password" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%' }}>
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
