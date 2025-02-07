import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SuperheroForm from '../../app/components/SuperheroForm';

// Mock next/navigation so that useRouter is available
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    refresh: jest.fn(),
  }),
}));

// mocks
jest.mock('../../app/components/ui/Input', () => ({
  Input: ({ label, showValue, ...props }) => {
    return (
      <div>
        <label htmlFor={props.name}>{label}</label>
        <input id={props.name} {...props} />
      </div>
    );
  },
}));

jest.mock('../../app/components/ui/Button', () => ({
  Button: ({ children, onClick, isLoading, ...props }) => (
    <button onClick={onClick} {...props}>
      {children}
    </button>
  ),
}));

jest.mock('../../app/components/ui/ErrorMessage', () => ({
  ErrorMessage: ({ message }) => <div role="alert">{message}</div>,
}));

jest.mock('../../app/components/ui/Card', () => ({
  Card: ({ children }) => <div>{children}</div>,
}));

// suit
describe('SuperheroForm', () => {
  test('renders initial Add New Superhero button and displays form on click', () => {
    render(<SuperheroForm />);

    // Initially, the button to open the form should be in the document.
    const openFormButton = screen.getByText(/Add New Superhero/i);
    expect(openFormButton).toBeInTheDocument();

    // Click the button to expand the form.
    fireEvent.click(openFormButton);

    // Now the form should render. Check for the presence of the header.
    const header = screen.getByRole('heading', { name: /Add New Superhero/i });
    expect(header).toBeInTheDocument();

    // Check that the form fields (inputs) are rendered by verifying their labels.
    const nameInput = screen.getByLabelText(/Name/i);
    expect(nameInput).toBeInTheDocument();

    const superpowerInput = screen.getByLabelText(/Superpower/i);
    expect(superpowerInput).toBeInTheDocument();

    const humilityScoreInput = screen.getByLabelText(/Humility Score/i);
    expect(humilityScoreInput).toBeInTheDocument();
  });
});
