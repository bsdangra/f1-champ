import { render, screen } from "@testing-library/react";
import { SeasonsWinner } from "../components/SeasonsWinner";

test("renders learn react link", () => {
  const winnerInfo = {
    givenName: "Fernando",
    familyName: "Alonso",
    driverId: "alonso",
    constructorName: 'Renault',
    raceName: 'Malaysian Grand Prix',
  };
  render(
    <SeasonsWinner
      driver={winnerInfo}
      selectedDriverId={'alonso'}
    />
  );
  const driverName = screen.getByText("Fernando Alonso");
  expect(driverName).toBeInTheDocument();
  
  const race = screen.getByText("Malaysian Grand Prix");
  expect(race).toBeInTheDocument();
});
