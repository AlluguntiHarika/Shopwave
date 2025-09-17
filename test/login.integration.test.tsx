// __tests__/login.integration.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginPage from "@/app/login/page";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

// Mock server for API calls
const server = setupServer(
  http.post("/api/login", async ({ request }) => {
    const body = await request.json() as any;
    const { email, password } = body;

    if (email === "john@example.com" && password === "password123") {
      return HttpResponse.json({ user: { firstName: "John" } }, { status: 200 });
    } else {
      return HttpResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
  })
);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  (global as any).mockToast.mockClear();
});
afterAll(() => server.close());

describe("Login Integration Tests", () => {

  it("renders the login form", () => {
    render(<LoginPage />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("successfully logs in with correct credentials", async () => {
    render(<LoginPage />);

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "password123" } });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect((global as any).mockToast).toHaveBeenCalledWith({
        title: "Login Successful",
        description: "Welcome back, John!",
      });
    });
  });

  it("shows error for invalid credentials", async () => {
    render(<LoginPage />);

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "wrong@example.com" } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "wrongpass" } });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect((global as any).mockToast).toHaveBeenCalledWith({
        title: "Login Failed",
        description: "Invalid credentials",
        variant: "destructive",
      });
    });
  });

});
