import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

test("renders registration form header", () => {
  render(<App />);
  const headerElement = screen.getByText(/Registration form/i);
  expect(headerElement).toBeInTheDocument();
});

test("renders name input field", () => {
  render(<App />);
  const nameInput = screen.getByLabelText(/Name:/i);
  expect(nameInput).toBeInTheDocument();
});

test("renders email input field", () => {
  render(<App />);
  const emailInput = screen.getByLabelText(/EmailId:/i);
  expect(emailInput).toBeInTheDocument();
});

test("renders password input field", () => {
  render(<App />);
  const passwordInput = screen.getByLabelText(/Enter Password:/i);
  expect(passwordInput).toBeInTheDocument();
});

test("renders confirm password input field", () => {
  render(<App />);
  const confirmPasswordInput = screen.getByLabelText(/Confirm Password:/i);
  expect(confirmPasswordInput).toBeInTheDocument();
});

test("renders submit button", () => {
  render(<App />);
  const submitButton = screen.getByRole("button", { name: /Submit/i });
  expect(submitButton).toBeInTheDocument();
});

test("submit button should be disabled initially", () => {
  render(<App />);
  const submitButton = screen.getByRole("button", { name: /Submit/i });
  expect(submitButton).toBeDisabled();
});

test("displays error message for invalid email", async () => {
  render(<App />);
  const emailInput = screen.getByLabelText(/EmailId:/i);
  fireEvent.change(emailInput, {
    target: { value: "invalidemail" },
  });
  fireEvent.blur(emailInput);
  expect(await screen.findByText(/Email is invalid/i)).toBeInTheDocument();
});

test("enables submit button when form is valid", async () => {
  render(<App />);
  const nameInput = screen.getByLabelText(/Name:/i);
  fireEvent.change(nameInput, {
    target: { value: "John Doe" },
  });
  const emailInput = screen.getByLabelText(/EmailId:/i);
  fireEvent.change(emailInput, {
    target: { value: "abc@abc.com" },
  });
  const passwordInput = screen.getByLabelText(/Enter Password:/i);
  fireEvent.change(passwordInput, {
    target: { value: "123456" },
  });
  const confPasswordInput = screen.getByLabelText(/Confirm Password:/i);
  fireEvent.change(confPasswordInput, {
    target: { value: "123456" },
  });
  const submitButton = screen.getByRole("button", { name: /Submit/i });
  expect(submitButton).toBeEnabled();
});

test("displays error message for invalid password", async () => {
  render(<App />);

  const nameInput = screen.getByLabelText(/Name:/i);
  fireEvent.change(nameInput, {
    target: { value: "John Doe" },
  });
  const emailInput = screen.getByLabelText(/EmailId:/i);
  fireEvent.change(emailInput, {
    target: { value: "abc@abc.com" },
  });
  const passwordInput = screen.getByLabelText(/Enter Password:/i);
  fireEvent.change(passwordInput, {
    target: { value: "123" },
  });
  fireEvent.blur(passwordInput);

  const confPasswordInput = screen.getByLabelText(/Confirm Password:/i);
  fireEvent.change(confPasswordInput, {
    target: { value: "123" },
  });
  fireEvent.blur(confPasswordInput);

  const submitButton = screen.getByRole("button", { name: /Submit/i });
  fireEvent.click(submitButton);

  expect(
    await screen.findByText(/Password must be at least 6 characters long/i),
  ).toBeInTheDocument();
});
