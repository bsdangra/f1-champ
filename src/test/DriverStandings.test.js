import { render, screen } from "@testing-library/react";
import { DriverStandings } from "../components/DriverStandings";

test("renders learn react link", () => {
  const driver = {
    season: 2005,
    givenName: "Fernando",
    familyName: "Alonso",
    driverId: "alonso",
  };
  render(
    <DriverStandings
      driver={driver}
      getWinnerInfo={() => {
        console.log("GetWinnerInfo");
      }}
    />
  );
  const driverName = screen.getByText("Fernando Alonso");
  expect(driverName).toBeInTheDocument();
  const seasonYear = screen.getByText("2005");
  expect(seasonYear).toBeInTheDocument();
});
