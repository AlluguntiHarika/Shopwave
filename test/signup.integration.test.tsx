// __tests__/signup.integration.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SignupPage from "@/app/signup/page";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

const server = setupServer(
  http.post("/api/signup", async ({ request }) => {
    const body = await request.json() as any;
    const { email } = body;
    if (email === "exists@example.com") {
      return HttpResponse.json({ error: "Email already registered" }, { status: 400 });
    }
    return HttpResponse.json({ success: true }, { status: 200 });
  })
);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  (global as any).mockToast.mockClear();
});
afterAll(() => server.close());

describe("Signup Integration Tests", () => {
  it("successfully registers a new user", async () => {
    render(<SignupPage />);

    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: "John" } });
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: "Doe" } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "password123" } });

    fireEvent.click(screen.getByRole("button", { name: /create an account/i }));

    await waitFor(() => {
      expect((global as any).mockToast).toHaveBeenCalledWith({
        title: "Account Created!",
        description: "Your account has been successfully created. Please login.",
      });
    });
  });

  it("shows error for existing email", async () => {
    render(<SignupPage />);

    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: "Test" } });
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: "User" } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "exists@example.com" } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "password123" } });

    fireEvent.click(screen.getByRole("button", { name: /create an account/i }));

    await waitFor(() => {
      expect((global as any).mockToast).toHaveBeenCalledWith({
        title: "Signup Failed",
        description: "Failed to sign up",
        variant: "destructive",
      });
    });
  });
});
