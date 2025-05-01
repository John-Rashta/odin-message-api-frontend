import { screen } from "@testing-library/react";
import Friends from "../components/friends/Friends";
import { renderWithProviders } from "./setups/setupRedux";
import { useGetFriendsQuery } from "../features/message-api/message-api-slice";
import { Mock } from "vitest";
import userEvent from "@testing-library/user-event";

vi.mock("../features/message-api/message-api-slice");

vi.mock("react-router-dom", () => {
  return {
    useNavigate: vi.fn(),
    NavLink: <div></div>,
  };
});

describe("User Friends", () => {
  it("Renders Normal Page Properly", async () => {
    ///Testing clicking for options aswell
    const user = userEvent.setup();
    const { container } = renderWithProviders(<Friends />);
    expect(screen.getByText("hamster")).toBeInTheDocument();
    expect(screen.getByText("Online")).toBeInTheDocument();

    const imgDiv = container.getElementsByTagName("img")[0];

    await user.click(imgDiv);

    const optionsDiv = container.getElementsByClassName(
      "userOptions",
    )[0] as HTMLElement;

    expect(optionsDiv).toBeInTheDocument();
    expect(screen.getByText("Options")).toBeInTheDocument();
  });

  describe("Renders No Friends Message", () => {
    afterEach(() => {
      vi.resetAllMocks();
    });
    it("shows No Friends", () => {
      vi.mocked(useGetFriendsQuery).mockImplementation(
        vi.fn(() => {
          return {
            isLoading: false,
            error: false,
            data: {
              friends: {
                friendlist: [],
              },
            },
          };
        }) as Mock,
      );
      renderWithProviders(<Friends />);
      expect(screen.getByText("No Friends Yet!")).toBeInTheDocument();
    });
  });
});
