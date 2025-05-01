import { screen } from "@testing-library/react";
import ChangePassword from "../components/partials/ChangePassword";
import { renderWithProviders } from "./setups/setupRedux";

vi.mock("../features/message-api/message-api-slice");

vi.mock("react-router-dom", () => {
  return {
    useNavigate: vi.fn(),
    NavLink: <div></div>,
  };
});

describe("Loads Change Password Page", () => {
  it("shows basic display", () => {
    renderWithProviders(<ChangePassword />);
    expect(screen.getByText("Current Password:")).toBeInTheDocument();
    expect(screen.getByText("Password:")).toBeInTheDocument();
    expect(screen.getByText("Confirm Password:")).toBeInTheDocument();
    expect(screen.getByText("Change Password")).toBeInTheDocument();
  });
});
