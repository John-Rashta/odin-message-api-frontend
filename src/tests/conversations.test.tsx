import { screen } from "@testing-library/react";
import Conversations from "../components/conversations/Conversations";
import { renderWithProviders } from "./setups/setupRedux";
import {
  useGetConversationQuery,
  useGetConversationsQuery,
} from "../features/message-api/message-api-slice";
import { Mock } from "vitest";

vi.mock("../features/message-api/message-api-slice");

vi.mock("react-router-dom", () => {
  return {
    useNavigate: vi.fn(),
    NavLink: <div></div>,
  };
});

describe("User Conversations", () => {
  it("Renders Normal Page Properly", async () => {
    renderWithProviders(<Conversations />);
    expect(screen.getAllByText("cat")).toHaveLength(2);
    expect(screen.getByText("Edited")).toBeInTheDocument();
    expect(screen.getByText("i like clouds")).toBeInTheDocument();
  });

  describe("Renders No Conversations Message", () => {
    afterEach(() => {
      vi.resetAllMocks();
    });
    it("shows No Conversations", () => {
      vi.mocked(useGetConversationQuery).mockImplementation(
        vi.fn(() => {
          return {
            isLoading: false,
            error: false,
            data: undefined,
          };
        }) as Mock,
      );
      vi.mocked(useGetConversationsQuery).mockImplementation(
        vi.fn(() => {
          return {
            isLoading: false,
            error: false,
            data: {
              user: {
                id: "3",
                username: "dog",
                convos: [],
              },
            },
          };
        }) as Mock,
      );
      renderWithProviders(<Conversations />);
      expect(screen.getByText("No Conversations Yet!")).toBeInTheDocument();
      expect(
        screen.getByText("Try Starting a Conversation!"),
      ).toBeInTheDocument();
    });
  });
});
