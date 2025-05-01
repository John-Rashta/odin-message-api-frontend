import { RouterProvider, createMemoryRouter } from "react-router";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "./setups/setupRedux";
import routes from "../routes";
import {
  useGetSelfQuery,
  useLazySearchUsersQuery,
} from "../features/message-api/message-api-slice";
import { Mock } from "vitest";

vi.mock("../features/message-api/message-api-slice");

describe("Layout", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });
  it("App matches snapshot", () => {
    const router = createMemoryRouter(routes, { initialEntries: ["/"] });
    const { container } = renderWithProviders(
      <RouterProvider router={router} />,
    );
    expect(container).toMatchSnapshot();
  });
  it("renders default layout with header and footer", () => {
    vi.mocked(useGetSelfQuery).mockImplementation(
      vi.fn(() => {
        return {
          isLoading: false,
          error: true,
          data: undefined,
        };
      }) as Mock,
    );
    const router = createMemoryRouter(routes, { initialEntries: ["/"] });
    renderWithProviders(<RouterProvider router={router} />);

    expect(screen.getByText("2025")).toBeInTheDocument();
    expect(
      screen.getByText("Project for The Odin Project"),
    ).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("Sign Up")).toBeInTheDocument();
    expect(screen.getByText("here")).toBeInTheDocument();
  });

  it("renders basic layout when logged in", () => {
    vi.mocked(useLazySearchUsersQuery).mockImplementation(
      vi.fn(() => {
        return [
          vi.fn,
          {
            usersData: [
              {
                id: "67",
                name: null,
                username: "lama",
                icon: {
                  id: 3,
                  source: "string",
                },
                customIcon: null,
                aboutMe: null,
                joinedAt: "1995-12-17T03:24:00",
              },
            ],
          },
        ];
      }) as Mock,
    );
    const router = createMemoryRouter(routes, { initialEntries: ["/"] });
    renderWithProviders(<RouterProvider router={router} />);

    expect(screen.getByText("2025")).toBeInTheDocument();
    expect(
      screen.getByText("Project for The Odin Project"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Welcome to Odin Message App!"),
    ).toBeInTheDocument();
    expect(screen.getByText("Requests")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Conversations")).toBeInTheDocument();
    expect(screen.getByText("Groups")).toBeInTheDocument();
    expect(screen.getByText("Friends")).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });
});
