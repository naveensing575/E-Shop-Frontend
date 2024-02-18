import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Register from '../../components/Register/Register';
import { MemoryRouter } from 'react-router-dom';

// Mock the registerUser function
jest.mock('../../services/registerService', () => ({
  registerUser: jest.fn(() => Promise.resolve({})),
}));

describe('Register component', () => {
  test('renders without errors', () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
  });

  test('allows user to fill out form, submit, and displays success modal message', async () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText('Phone Number:'), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByLabelText('First Name:'), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText('Last Name:'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText('Flat/House/Apartment:'), { target: { value: '123' } });
    fireEvent.change(screen.getByLabelText('Street:'), { target: { value: 'Main St' } });
    fireEvent.change(screen.getByLabelText('City:'), { target: { value: 'New York' } });
    fireEvent.change(screen.getByLabelText('Country:'), { target: { value: 'USA' } });
    fireEvent.change(screen.getByLabelText('Zipcode:'), { target: { value: '10001' } });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: 'Register' }));

    // Wait for the success modal message
    await waitFor(() => {
      expect(screen.getByText('Registration Successful')).toBeInTheDocument();
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(screen.getByText('You have successfully registered. Please login with your credentials.')).toBeInTheDocument();
    });
  });
});
