import { screen } from "@testing-library/react";
import Groups from "../components/groups/Groups";
import { renderWithProviders } from "./setups/setupRedux";
import {
  useGetGroupQuery,
  useGetGroupsQuery,
} from "../features/message-api/message-api-slice";
import { Mock } from "vitest";
import { testCat, testDog } from "../../util/globalValues";

vi.mock("../features/message-api/message-api-slice");

vi.mock("react-router-dom", () => {
  return {
    useNavigate: vi.fn(),
    NavLink: <div></div>,
  };
});

describe("User Groups", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });
  it("Renders Normal Page Properly", async () => {
    vi.mocked(useGetGroupsQuery).mockImplementation(
      vi.fn(() => {
        return {
          isLoading: false,
          error: false,
          groupsData: [],
          data: {
            user: {
              groups: [
                {
                  members: [testCat, testDog],
                  name: "new gang",
                  id: "76",
                },
              ],
            },
          },
        };
      }) as Mock,
    );
    renderWithProviders(<Groups />);
    expect(screen.getAllByText("cat")).toHaveLength(2);
    expect(screen.getAllByText("dog")).toHaveLength(2);
    expect(screen.getByText("i like rain")).toBeInTheDocument();
    expect(screen.getByText("(cat,dog)")).toBeInTheDocument();
    expect(screen.getByText("Create Group")).toBeInTheDocument();
    expect(screen.getByText("Members")).toBeInTheDocument();
    expect(screen.getByText("Admins")).toBeInTheDocument();
    expect(screen.getByText("Leave Group")).toBeInTheDocument();
    expect(screen.getByText("Send")).toBeInTheDocument();
    expect(screen.getByText("Delete Group")).toBeInTheDocument();
    expect(screen.getByText("Edit Name")).toBeInTheDocument();
    expect(screen.getByText("new gang")).toBeInTheDocument();
  });

  describe("Renders No Groups Message", () => {
    afterEach(() => {
      vi.resetAllMocks();
    });
    it("shows No Groups", () => {
      vi.mocked(useGetGroupQuery).mockImplementation(
        vi.fn(() => {
          return {
            isLoading: false,
            error: false,
            data: undefined,
          };
        }) as Mock,
      );
      vi.mocked(useGetGroupsQuery).mockImplementation(
        vi.fn(() => {
          return {
            isLoading: false,
            error: false,
            groupsData: [],
            data: {
              user: {
                groups: [],
              },
            },
          };
        }) as Mock,
      );
      renderWithProviders(<Groups />);
      expect(screen.getByText("No Groups Yet!")).toBeInTheDocument();
      expect(screen.getByText("Try Starting a Group!")).toBeInTheDocument();
    });
  });
});
