import { screen } from "@testing-library/react";
import MyProfile from "../components/profiles/MyProfile";
import { renderWithProviders } from "./setups/setupRedux";

vi.mock("../features/message-api/message-api-slice");

vi.mock("react-router-dom", () => {
  return {
    useNavigate: vi.fn(),
    NavLink: <div></div>
  };
});

describe("My Profile", () => {
    it("Renders Normal Page Properly", () => {
      renderWithProviders(<MyProfile />);
      expect(screen.getByText("User ID: 3")).toBeInTheDocument();
      expect(screen.getByText("jean")).toBeInTheDocument();
      expect(screen.getByText("sloth")).toBeInTheDocument();
      expect(screen.getByText("goodbye")).toBeInTheDocument();
      expect(screen.getByText("Icons")).toBeInTheDocument();
      expect(screen.getByText("Submit")).toBeInTheDocument();
    });
});
