import { screen } from "@testing-library/react";
import UserProfile from "../components/profiles/UserProfile";
import { renderWithProviders } from "./setups/setupRedux";
import { useGetUserQuery } from "../features/message-api/message-api-slice";
import { Mock } from "vitest";

vi.mock("../features/message-api/message-api-slice");

vi.mock("react-router-dom", () => {
  return {
    useNavigate: vi.fn(),
    NavLink: <div></div>,
  };
});

describe("User Profile", () => {
  it("Renders Normal Page Properly", () => {
    renderWithProviders(<UserProfile />);
    expect(screen.getByText("User ID: 1")).toBeInTheDocument();
    expect(screen.getByText("Name: john")).toBeInTheDocument();
    expect(screen.getByText("Username: cat")).toBeInTheDocument();
    expect(screen.getByText("hello")).toBeInTheDocument();
  });
});

///loading and error checking only here since its similar in the rest
describe("Loading Error", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });
  it("shows loading", () => {
    vi.mocked(useGetUserQuery).mockImplementation(
      vi.fn(() => {
        return {
          isLoading: true,
          error: false,
          data: [],
        };
      }) as Mock,
    );
    renderWithProviders(<UserProfile />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("shows error loading", () => {
    vi.mocked(useGetUserQuery).mockImplementation(
      vi.fn(() => {
        return {
          isLoading: false,
          error: true,
          data: [],
        };
      }) as Mock,
    );
    renderWithProviders(<UserProfile />);
    expect(screen.getByText("Error Loading!")).toBeInTheDocument();
  });
});
