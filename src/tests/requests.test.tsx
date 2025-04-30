import { screen } from "@testing-library/react";
import AllRequests from "../components/requests/AllRequests";
import { renderWithProviders } from "./setups/setupRedux";
import { useGetRequestsQuery, useGetSentRequestsQuery } from "../features/message-api/message-api-slice";
import { Mock } from "vitest";
import userEvent from "@testing-library/user-event";

vi.mock("../features/message-api/message-api-slice");

vi.mock("react-router-dom", () => {
  return {
    useNavigate: vi.fn(),
    NavLink: <div></div>
  };
});

describe("User Profile", () => {
    it("Renders Normal Page Properly", async () => {
        const user = userEvent.setup();
        renderWithProviders(<AllRequests />);
        expect(screen.getByText("Accept")).toBeInTheDocument();
        expect(screen.getByText("Reject")).toBeInTheDocument();
        expect(screen.getByText("dog sent you a Friend Request")).toBeInTheDocument();
        expect(screen.getByText("Sent")).toBeInTheDocument();
        expect(screen.getByText("Received")).toBeInTheDocument();

        const sentDiv = screen.getByText("Sent");

        await user.click(sentDiv);

        expect(screen.getByText("Cancel")).toBeInTheDocument();
        expect(screen.getByText("You invited dog to new group")).toBeInTheDocument();
    });

    describe("Renders No Results Message", () => {
        afterEach(() => {
            vi.resetAllMocks();
        });
        it("shows No Results", () => {
              vi.mocked(useGetRequestsQuery).mockImplementation(
                vi.fn(() => {
                  return {
                    isLoading: false,
                    error: false,
                    data: {
                        user: {
                            receivedRequest: []
                        }
                    }
                  };
                }) as Mock,
              );
              renderWithProviders(<AllRequests />);
              expect(screen.getByText("No Requests Yet!")).toBeInTheDocument();
        });

        it("shows No Sent Requests", async () => {
            vi.mocked(useGetSentRequestsQuery).mockImplementation(
              vi.fn(() => {
                return {
                  isLoading: false,
                  error: false,
                  data: {
                      user: {
                          sentRequest: []
                      }
                  }
                };
              }) as Mock,
            );

            const user = userEvent.setup();
            renderWithProviders(<AllRequests />);
            const sentDiv = screen.getByText("Sent");

            await user.click(sentDiv);
            expect(screen.getByText("No Sent Requests Yet!")).toBeInTheDocument();
        });

    })
});
