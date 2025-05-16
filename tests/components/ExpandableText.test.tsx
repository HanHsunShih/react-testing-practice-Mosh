import { render, screen } from "@testing-library/react";
import ExpandableText from "../../src/components/ExpandableText";
describe("group", () => {
  it("shouldnt render full text if text is less than limit", () => {
    const text = "Short Text";

    render(<ExpandableText text={text} />);

    expect(screen.getByText(text)).toBeInTheDocument();
  });
});
